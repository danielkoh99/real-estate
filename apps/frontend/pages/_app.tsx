import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "@/styles/leaflet.css";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import { ModalProvider } from "@/contexts/ModalContext";
import LoginRequiredModal from "@/components/auth/LoginRequiredModal";
import LayoutTransition from "@/layouts/transition";
import UIProviders from "@/providers/UIProviders";

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

  if (!router.isReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UIProviders>
        <SessionProvider session={session}>
          {/* <SessionManager /> */}
          <NuqsAdapter>
            <ModalProvider>
              <LayoutTransition transitionKey={router.pathname}>
                <Component {...pageProps} />
                <LoginRequiredModal />
              </LayoutTransition>
            </ModalProvider>
          </NuqsAdapter>
        </SessionProvider>
      </UIProviders>
    </QueryClientProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
