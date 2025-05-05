import { Skeleton, Tab, Tabs } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import PasswordChange from "./components/PasswordChange";
import PersonalData from "./components/PersonalData";

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
  const { data, error, isLoading } = useQuery<User>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    refetchOnMount: true,
    staleTime: 0,
  });
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
  if (!data) return <div>No data found</div>;

  return (
    <DefaultLayout>
      <div className="flex w-full">
        <Tabs
          isVertical
          aria-label="Options"
          className="flex"
          classNames={{
            tabList: "flex gap-2",
            tab: "flex w-full",
            tabContent: "w-full",
            tabWrapper: "flex w-full",
          }}
          placement="start"
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
    </DefaultLayout>
  );
}
