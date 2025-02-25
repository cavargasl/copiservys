"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { NavItemWithOptionalChildren } from "@/models";
import Link from "next/link";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export default function MainNav() {
  const mainNavItems = siteConfig.mainNav[0].items;
  return (
    <div className="hidden gap-6 lg:flex w-full justify-between">
      <Link
        aria-label="Home"
        href="/"
        className="hidden items-center space-x-2 lg:flex flex-nowrap"
      >
        <span className="text-xl font-bold leading-none uppercase text-center">
          Copi<br></br>servys
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className={navigationMenuTriggerStyle()}
            >
              Inicio
            </NavigationMenuLink>
          </NavigationMenuItem>

          {mainNavItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                href={item.href}
                className={navigationMenuTriggerStyle()}
              >
                {item.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = forwardRef<
  ElementRef<"a">,
  ComponentPropsWithoutRef<"a"> & NavItemWithOptionalChildren
>(({ className, children, ...props }, ref) => {
  const { title, disabled } = props;
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href ?? ""}
          ref={ref}
          className={cn(
            "group block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
            disabled && "opacity-50 cursor-not-allowed pointer-events-none"
          )}
          {...props}
        >
          <div className="text-sm font-normal leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-white flex flex-col">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
