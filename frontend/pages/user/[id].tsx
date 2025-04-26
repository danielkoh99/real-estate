import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { User } from "@/types";

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1>{user.firstName}</h1>
      <p>@{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const user = await fetchUserById(id);

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
  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
  );
  const user: User = await userResponse.json();

  console.log(user);

  return user;
}
