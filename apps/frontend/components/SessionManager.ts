import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

import useUserStore from "@/stores/userStore";

export default function SessionManager() {
  const { data: session, status } = useSession();

  const { setCurrentUser, clearUser } = useUserStore();

  useEffect(() => {
    if (session) {
      setCurrentUser({
        id: parseInt(session.user.id),
        firstName: session.user.firstName,
        uuid: session.user.id,
        lastName: session.user.lastName,
        name: `${session.user.firstName} ${session.user.lastName}`,
        email: session.user.email ?? "",
        phone: session.user.phone,
        createdAt: session.user.createdAt ?? "",
        role: session.user.role,
        profileImage: session.user.image ?? "",
      });
    } else {
      clearUser();
    }
  }, [session, setCurrentUser, clearUser]);
  useEffect(() => {
    if (status === "authenticated" && session?.expires) {
      const expirationTime = new Date(session.expires).getTime();
      const currentTime = Date.now();
      const timeRemaining = expirationTime - currentTime;

      if (timeRemaining > 1000) {
        // Ensures it's not logging out immediately
        const timer = setTimeout(() => {
          signOut();
        }, timeRemaining);

        return () => clearTimeout(timer);
      }
    }
  }, [session, status]);

  return null;
}
