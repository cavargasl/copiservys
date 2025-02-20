import { CartSheet } from "@/components/cart/CartSheet";
import { siteConfig } from "@/config/site";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background border-border">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav mainNavItems={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <CartSheet />
          </nav>
        </div>
      </div>
    </header>
  );
}
