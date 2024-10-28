import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function SessionManager() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.expires) {
      console.log(session, status);
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
        // signOut();
      }
    }
  }, [session, status]);

  return null; // This component only manages session expiration, no UI needed
}
