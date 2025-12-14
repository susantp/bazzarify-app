import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchProducts,
  fetchStore,
  fetchTopProducts,
} from "@/modules/vendor/data/services/vendorService";

export default function useVendorHook(vendorUuid: string) {
  const [vendorCategories, vendorStore] = useQueries({
    queries: [
      {
        queryKey: ["vendor", vendorUuid, "categories"],
        queryFn: () =>
          fetchCategories(vendorUuid, {
            perPage: "9",
            page: "1",
          }),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ["vendor", vendorUuid, "store"],
        queryFn: () => fetchStore(vendorUuid),
        staleTime: 5 * 60 * 1000,
      },
    ],
  });
  const vendorTopProducts = useInfiniteQuery({
    queryKey: ["vendor", vendorUuid, "top", "products"],
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    queryFn: () =>
      fetchTopProducts(vendorUuid, {
        perPage: "6",
        page: "1",
      }),
    getNextPageParam: () => undefined,
  });
  const vendorProducts = useInfiniteQuery({
    queryKey: ["vendor", vendorUuid, "products"],
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    queryFn: ({ pageParam }) =>
      fetchProducts(vendorUuid, {
        perPage: "10",
        page: String(pageParam),
      }),
    getNextPageParam: (lastPage) => {
      const p = lastPage?.products;
      return p?.next_page_url ? Number(p.current_page) + 1 : undefined;
    },
  });

  return {
    vendorCategories,
    vendorStore,
    vendorTopProducts,
    vendorProducts,
  };
}
