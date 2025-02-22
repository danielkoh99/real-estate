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
    {
      label: "Profile",
      href: "/user/profile",
      protected: true,
    },
    { label: "Upload Listing", href: "/listing/upload", protected: true },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
      protected: true,
    },
    { label: "Upload Listing", href: "/listing/upload", protected: true },
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
      (item) => !item.protected || isAuthenticated,
    ),
    navMenuItems: siteConfig.navMenuItems.filter(
      (item) => !item.protected || isAuthenticated,
    ),
  };
}
