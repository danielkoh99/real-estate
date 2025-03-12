import { useEffect } from "react";
import { useSession } from "next-auth/react";

import useUserStore from "@/stores/userStore";

export default function SessionManager() {
  const { data: session, status } = useSession();

  const { setCurrentUser, clearUser } = useUserStore();

  useEffect(() => {
    if (session) {
      setCurrentUser({
        id: session.user.id,
        name: `${session.user.firstName} ${session.user.lastName}`,
        email: session.user.email,
        createdAt: session.user.createdAt ?? "",
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

      console.log("Session expires in:", timeRemaining / 1000, "seconds");

      if (timeRemaining > 1000) {
        // Ensures it's not logging out immediately
        const timer = setTimeout(() => {
          console.log("Session expired, logging out...");
          // signOut();
        }, timeRemaining);

        return () => clearTimeout(timer);
      }
    }
  }, [session, status]);

  return null;
}
