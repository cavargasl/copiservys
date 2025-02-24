"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUpdateQueryParams } from "../utils/queryUtils";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [searchText, setSearchText] = useState(search || "");
  const debouncedSearchText = useDebounce(searchText);
  const updateQueryParams = useUpdateQueryParams(searchParams);
  useEffect(() => {
    updateQueryParams({ search: debouncedSearchText });
  }, [debouncedSearchText, updateQueryParams]);

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar productos..."
          className="pl-8 bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70 transition-colors"
        />
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
