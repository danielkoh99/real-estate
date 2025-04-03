"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UIProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider
        maxVisibleToasts={3}
        toastProps={{
          radius: "lg",
          color: "primary",
          variant: "bordered",
          shouldShowTimeoutProgress: true,
          classNames: {
            base: "animate-fade-in-up",
            closeButton:
              "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
          },
        }}
      />
      {children}
    </HeroUIProvider>
  );
}
