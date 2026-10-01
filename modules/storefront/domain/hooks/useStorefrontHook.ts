import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchProducts,
  fetchStore,
  fetchTopProducts,
} from "@/modules/storefront/data/services/storefrontService";

export default function useStorefrontHook(storeUuid: string) {
  const [storeCategories, store] = useQueries({
    queries: [
      {
        queryKey: ["store", storeUuid, "categories"],
        queryFn: () =>
          fetchCategories(storeUuid, {
            perPage: "9",
            page: "1",
          }),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ["store", storeUuid, "store"],
        queryFn: () => fetchStore(storeUuid),
        staleTime: 5 * 60 * 1000,
      },
    ],
  });
  const storeTopProducts = useInfiniteQuery({
    queryKey: ["store", storeUuid, "top", "products"],
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    queryFn: () =>
      fetchTopProducts(storeUuid, {
        perPage: "6",
        page: "1",
      }),
    getNextPageParam: () => undefined,
  });
  const storeProducts = useInfiniteQuery({
    queryKey: ["store", storeUuid, "products"],
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    queryFn: ({ pageParam }) =>
      fetchProducts(storeUuid, {
        perPage: "10",
        page: String(pageParam),
      }),
    getNextPageParam: (lastPage) => {
      const p = lastPage?.products;
      return p?.next_page_url ? Number(p.current_page) + 1 : undefined;
    },
  });

  return {
    storeCategories,
    store,
    storeTopProducts,
    storeProducts,
  };
}
