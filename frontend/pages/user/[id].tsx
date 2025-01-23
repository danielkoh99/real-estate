import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    username: string;
    bio: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1>{user.name}</h1>
      <p>@{user.username}</p>
      <p>{user.bio}</p>
    </div>
  );
};

// Fetch user data based on ID
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  // Simulate fetching user data by ID
  const user = await fetchUserById(id); // Replace with actual API call

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

// Mock API function (replace with your backend call)
async function fetchUserById(id: string) {
  const users = [
    {
      id: "1",
      name: "John Doe",
      username: "johndoe",
      bio: "Software Developer",
    },
    { id: "2", name: "Jane Smith", username: "janesmith", bio: "Designer" },
  ];

  return users.find((user) => user.id === id) || null;
}
