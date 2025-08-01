import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import PublicProfile from "../profile/components/Profile";

import { UserInfoResponse } from "@/types";
import PropertiesView from "@/components/property/PropertiesView";

const UserProfile: React.FC<{ user: UserInfoResponse }> = ({ user }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col  gap-10 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="w-full">
        <PublicProfile user={user} />
      </div>

      <main className="w-full">
        <div className="rounded-xl bg-white shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Listed Properties</h2>
          <div className="flex-1 min-h-0 overflow-hidden">
            <PropertiesView
              canEdit={true}
              error={false}
              loading={false}
              properties={user.listedProperties}
              showMap={false}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uuid, name } = context.params as { uuid: string; name: string };

  const user = await fetchUserById(uuid);

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default UserProfile;

async function fetchUserById(id: string) {
  const userResponse = await fetch(`${process.env.API_URL}/user/public/${id}`);
  const user: UserInfoResponse = await userResponse.json();

  return user;
}
