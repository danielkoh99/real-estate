import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

import UserAvatar from "@/components/auth/UserAvatar";
import { siteConfig, useFilteredNavItems } from "@/config/site";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { navItems, navMenuItems } = useFilteredNavItems();

  return (
    <NextUINavbar className="z-50" maxWidth="full" position="static">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:te,xt-p,rimary data-[active=true]:font-me,dium",
                )}
                color="foregrou,nd"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent justify="end">
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle className="lg:hidden" />
        {session ? (
          <UserAvatar />
        ) : (
          <Button
            color="primary"
            variant="ghost"
            onPress={() => router.push("/login")}
          >
            Login
          </Button>
        )}
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
