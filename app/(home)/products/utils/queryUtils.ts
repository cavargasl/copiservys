import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useUpdateQueryParams = (searchParams: URLSearchParams) => {
  const router = useRouter();

  const updateQueryParams = useCallback(
    (newParams: Record<string, string | number | undefined>) => {
      const updatedQuery = {
        ...Object.fromEntries(searchParams),
        ...newParams,
      };

      // Filtrar valores undefined y valores vacíos
      const filteredQuery = Object.fromEntries(
        Object.entries(updatedQuery).filter(
          ([, v]) => v !== undefined && v !== ""
        )
      );

      // Convertir valores a string
      const stringQuery = Object.fromEntries(
        Object.entries(filteredQuery).map(([k, v]) => [k, String(v)])
      );

      router.push(`/products?${new URLSearchParams(stringQuery).toString()}`);
    },
    [searchParams, router]
  );

  return updateQueryParams;
};