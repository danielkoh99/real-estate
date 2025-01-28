import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

import useUserStore from "@/stores/userStore";

export default function SessionManager() {
  const { data: session, status } = useSession();

  const { setCurrentUser, clearUser, currentUser } = useUserStore();

  useEffect(() => {
    if (session) {
      setCurrentUser({
        id: session.user.id,
        name: `${session.user.firstName} ${session.user.lastName}`,
        email: session.user.email,
      });
    } else {
      clearUser();
    }
  }, [session, setCurrentUser, clearUser]);
  useEffect(() => {
    if (status === "authenticated" && session?.expires) {
      // Calculate the time remaining until the session expires
      const expirationTime = new Date(session.expires).getTime();
      const currentTime = new Date().getTime();
      const timeRemaining = expirationTime - currentTime;

      if (timeRemaining > 0) {
        const timer = setTimeout(() => {
          //   signOut();
        }, timeRemaining);

        return () => clearTimeout(timer);
      } else {
        signOut();
      }
    }
  }, [session, status]);

  return null; // This component only manages session expiration, no UI needed
}
