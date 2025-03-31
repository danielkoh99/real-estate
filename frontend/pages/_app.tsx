import type { AppProps } from "next/app";

import { useRouter } from "next/router";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";

import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { fontSans, fontMono } from "@/config/fonts";
import SessionManager from "@/components/SessionManager";
import { ModalProvider } from "@/contexts/ModalContext";
import LoginRequiredModal from "@/components/auth/LoginRequiredModal";
import LayoutTransition from "@/layouts/transition";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider>
          <SessionProvider session={session}>
            <SessionManager />
            <NuqsAdapter>
              <ModalProvider>
                <LayoutTransition>
                  <Component {...pageProps} />
                  <LoginRequiredModal />
                </LayoutTransition>
              </ModalProvider>
            </NuqsAdapter>
            <Toaster
              gutter={8}
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                className: "",
                duration: 5000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  duration: 3000,
                },
              }}
            />
          </SessionProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
