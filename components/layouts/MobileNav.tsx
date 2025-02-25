"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileNav() {
  const navItems = siteConfig.mainNav[0].items;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Alternar menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <SheetTitle className="pl-6 text-2xl font-bold">
          {siteConfig.name}
        </SheetTitle>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <nav className="my-2">
              <ul className="space-y-2">
                <li className="py-1">
                  <MobileLink
                    href="/"
                    pathname={pathname}
                    setIsOpen={setIsOpen}
                  >
                    Inicio
                  </MobileLink>
                </li>
                {navItems?.map((item, index) => (
                  <li key={index} className="py-1">
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      pathname={pathname}
                      setIsOpen={setIsOpen}
                    >
                      {item.title}
                    </MobileLink>
                  </li>
                ))}
              </ul>
            </nav>
            {/* <Accordion type="single" collapsible className="w-full" defaultValue={mainNavItems?.[0].title}>
                  <AccordionTrigger className="text-sm capitalize">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {item.items?.map((subItem, index) =>
                        subItem.href ? (
                          <MobileLink
                            key={index}
                            href={subItem.href}
                            pathname={pathname}
                            setIsOpen={setIsOpen}
                            disabled={subItem.disabled}
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div
                            key={index}
                            className="text-foreground/70 transition-colors"
                          >
                            {item.title}
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion> */}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string;
  disabled?: boolean;
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground transition-colors hover:text-foreground",
        pathname === href && "text-foreground/40",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
