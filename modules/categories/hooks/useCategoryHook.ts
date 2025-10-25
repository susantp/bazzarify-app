import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { TCategoryListPayloadSchema } from "@/modules/product/schemas/responsePayloads/CategoryListPayloadSchema";
import categoryService from "@/modules/product/services/categoryService";

export default function useCategoryHook() {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["categories", "index"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      categoryService.index({
        perPage: "10",
        page: String(pageParam),
      }),
    getNextPageParam: (lastPage) => {
      const p = lastPage?.categories;
      return p?.next_page_url ? Number(p.current_page) + 1 : undefined;
    },
  });

  const flatData = React.useMemo(() => {
    const pages = data?.pages ?? [];
    // pages are of shape TPage where selectItems would be p?.categories.data
    return pages.flatMap(
      (p: TCategoryListPayloadSchema | null) => p?.categories?.data ?? [],
    );
  }, [data]);

  const refreshing = isRefetching;
  const onRefresh = async () => {
    // Reset the infinite list so it starts from page 1 again on pull-to-refresh
    // Clear cached pages for the infinite query so it restarts from initialPageParam (1)
    queryClient.removeQueries({
      queryKey: ["categories"],
      exact: true,
    });
    await Promise.all([refetch()]);
  };
  const hasCategories = !data?.pages[0]?.categories?.data?.length!;
  return {
    isLoading,
    isError,
    flatData,
    hasNextPage,
    isFetchingNextPage,
    refreshing,
    hasCategories,
    onRefresh,
    fetchNextPage,
  };
}
