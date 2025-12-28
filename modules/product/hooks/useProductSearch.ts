import { useAtom } from "jotai";
import { searchFiltersAtom } from "@/atoms/searchFiltersAtom";
import { useInfiniteQuery } from "@tanstack/react-query";
import getProductByQuery from "@/modules/product/services/product/getProductByQuery";
import {
  buildSpatieFilterQuery,
  serializeSpatieFilters,
} from "@/modules/product/utils/searchFilters";

export default function useProductSearch(currentQuery: string) {
  const [filters] = useAtom(searchFiltersAtom);
  const spatieFilters = buildSpatieFilterQuery(filters, currentQuery);
  const serializedFilters = serializeSpatieFilters(spatieFilters);

  const queryResult = useInfiniteQuery({
    queryKey: ["product", currentQuery, serializedFilters],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getProductByQuery({
        perPage: "10",
        page: String(pageParam),
        ...spatieFilters,
      }),
    getNextPageParam: (lastPage) => {
      const p = lastPage?.products;
      return p?.next_page_url ? Number(p.current_page) + 1 : undefined;
    },
    enabled: Boolean(currentQuery),
  });
  const metadata = queryResult.data?.pages[0]?.metadata;
  return {
    queryResult,
    metadata,
  };
}
