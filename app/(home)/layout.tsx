import SiteHeader from "@/components/layouts/SiteHeader";
import { fetchProducts } from "@/redux/slices/products";
import { store } from "@/redux/store";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

interface LobbyLayoutProps {
  children: React.ReactNode;
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  await store.dispatch(fetchProducts());
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  );
}
