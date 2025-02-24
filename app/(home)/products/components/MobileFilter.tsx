import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import SearchFilter from "./SearchFilter";

interface MobileFilterProps {
  children: React.ReactNode;
}

export default function MobileFilter({ children }: MobileFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="grid grid-cols-[1fr_auto] gap-4 justify-between mb-4">
      <SearchFilter />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size={"icon"}>
            <FilterIcon className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>Filtros</SheetTitle>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="space-y-5">{children}</div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </section>
  );
}
