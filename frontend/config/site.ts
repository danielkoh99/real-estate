import { useSession } from "next-auth/react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Daningatlan",
  description: "A place to find your dream home",
  navItems: [
    {
      label: "Home",
      href: "/",
    },

    { label: "Upload Listing", href: "/property/new", protected: true },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    { label: "Upload Listing", href: "/property/new", protected: true },
    {
      label: "Logout",
      href: "/logout",
      protected: true,
    },
  ],
};

export function useFilteredNavItems() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return {
    navItems: siteConfig.navItems.filter(
      (item) => !item.protected || isAuthenticated
    ),
    navMenuItems: siteConfig.navMenuItems.filter(
      (item) => !item.protected || isAuthenticated
    ),
  };
}
