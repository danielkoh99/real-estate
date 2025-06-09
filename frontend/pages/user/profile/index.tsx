import { Button, Skeleton, Tab, Tabs, useDisclosure } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { signOut } from "next-auth/react";
import { useWindowSize } from "react-use";

import PasswordChange from "./components/PasswordChange";
import PersonalData from "./components/PersonalData";
import DeleteModal from "./components/DeleteModal";
import useUserMutations from "./profileMutations";

import DefaultLayout from "@/layouts/default";
import { User, UserInfoResponse } from "@/types";
import Error from "@/components/global/Error";
import { apiRequest } from "@/utils";
import LayoutTransition from "@/layouts/transition";
type TabDefinition = {
  title: string;
  content: React.FC<any>;
  props: Record<string, any>;
};

const fetchUserProfile = async () => {
  try {
    const response = await apiRequest<UserInfoResponse>({
      url: "/user/profile",
      method: "GET",
    });

    return response as User;
  } catch (error: any) {
    throw error.message;
  }
};

export default function UserProfilePage() {
  const { width } = useWindowSize();
  const { data, error, isLoading } = useQuery<User>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    refetchOnMount: true,
    staleTime: 0,
  });

  const { deleteMutation } = useUserMutations();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const tabs = useMemo<TabDefinition[]>(() => {
    if (!data) return [];

    return [
      {
        title: "Profile",
        content: PersonalData,
        props: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          createdAt: data.createdAt,
          profileImage: data.profileImage,
          onOpen: onOpen,
        },
      },
      {
        title: "Change password",
        content: PasswordChange,
        props: {
          id: data.id,
        },
      },
    ];
  }, [data]);

  if (error) return <Error error_message={error.message} />;
  if (!data)
    return (
      <div>
        No user found sign out{" "}
        <Button color="primary" onPress={() => signOut()}>
          here
        </Button>
      </div>
    );
  const onDelete = async () => {
    await deleteMutation.mutateAsync(data.id.toString());
    await signOut();
  };

  return (
    <DefaultLayout>
      <div className="flex w-full">
        <Tabs
          aria-label="Settings"
          className="flex"
          classNames={{
            tabList: "flex gap-2",
            tab: "flex w-full",
            tabContent: "w-full",
            tabWrapper: "flex flex-col md:flex-row w-full",
          }}
          isVertical={width > 768}
        >
          {tabs.map((tab) => {
            const TabContent = tab.content;

            return (
              <Tab key={tab.title} className="flex w-full" title={tab.title}>
                <LayoutTransition className="w-full" transitionKey={tab.title}>
                  <Skeleton isLoaded={!isLoading}>
                    <TabContent {...tab.props} />
                  </Skeleton>
                </LayoutTransition>
              </Tab>
            );
          })}
        </Tabs>
      </div>
      <DeleteModal
        isOpen={isOpen}
        onConfirm={onDelete}
        onOpenChange={onOpenChange}
      />
    </DefaultLayout>
  );
}
