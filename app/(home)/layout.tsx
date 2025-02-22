import SiteHeader from "@/components/layouts/SiteHeader"
import { fetchProducts } from "@/redux/slices/products";
import { store } from "@/redux/store";

interface LobbyLayoutProps {
  children: React.ReactNode
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  await store.dispatch(fetchProducts());
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
          {children}
      </main>
    </div>
  )
}
