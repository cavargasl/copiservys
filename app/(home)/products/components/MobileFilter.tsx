import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import Filter, { FilterProps } from "./Filter";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MobileFilter({
  categories,
  brands,
  priceRange,
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="grid grid-cols-[1fr_auto] gap-4 justify-between lg:hidden mb-4">
      <SearchInput />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size={"icon"}>
            <FilterIcon className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>Filtros</SheetTitle>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <Filter
              categories={categories}
              brands={brands}
              priceRange={priceRange}
              hideSearch={true}
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </section>
  );
}
