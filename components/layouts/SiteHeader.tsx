import { CartSheet } from "@/components/cart/CartSheet";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background border-border">
      <div className="container flex h-14 items-center gap-6">
        <MainNav />
        <MobileNav />
        <div className="flex items-center justify-end space-x-4 flex-1">
          <nav className="flex items-center space-x-2">
            <CartSheet />
          </nav>
        </div>
      </div>
    </header>
  );
}
