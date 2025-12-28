import { useState } from "react";
import { useAtom } from "jotai";
import { customFilterModalAtom } from "@/atoms/customFilterModalAtom";
import {
  FilterMenuItemEnum,
  IFilterMenuItem,
} from "@/modules/product/types/search";
import { useInfiniteQuery } from "@tanstack/react-query";
import getProductByQuery from "@/modules/product/services/product/getProductByQuery";

export default function useProductSearch(currentQuery: string) {
  const [filter, setFilter] = useState<IFilterMenuItem | undefined>();
  const [priceSortAsc, setPriceSortAsc] = useState(true);
  const [showCustomFilter, setShowCustomFilter] = useAtom(
    customFilterModalAtom,
  );

  const queryResult = useInfiniteQuery({
    queryKey: ["product", currentQuery],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getProductByQuery({
        perPage: "10",
        page: String(pageParam),
        "filter[name]": currentQuery,
      }),
    getNextPageParam: (lastPage) => {
      const p = lastPage?.products;
      return p?.next_page_url ? Number(p.current_page) + 1 : undefined;
    },
    enabled: Boolean(currentQuery),
  });
  const metadata = queryResult.data?.pages[0]?.metadata;

  const handleFilterPress = (item: IFilterMenuItem) => {
    setFilter(item);
    item.id === FilterMenuItemEnum.PRICE && setPriceSortAsc(!priceSortAsc);
    item.id === FilterMenuItemEnum.CUSTOM_FILTER &&
      setShowCustomFilter(!showCustomFilter);
  };
  return {
    setFilter,
    showCustomFilter,
    setShowCustomFilter,
    queryResult,
    metadata,
  };
}
