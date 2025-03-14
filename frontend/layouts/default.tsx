import { Head } from "./head";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-2 sm:px-6 flex-1 flex flex-col">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        Daningatlan
      </footer>
    </div>
  );
}
