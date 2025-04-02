import type { AppProps } from "next/app";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { fontSans, fontMono } from "@/config/fonts";
import SessionManager from "@/components/SessionManager";
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
  return (
    <QueryClientProvider client={queryClient}>
      <UIProviders>
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
          </SessionProvider>
        </NextThemesProvider>
      </UIProviders>
    </QueryClientProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
