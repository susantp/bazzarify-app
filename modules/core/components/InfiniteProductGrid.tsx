import React from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { InfiniteData } from "@tanstack/query-core";

export interface InfiniteProductGridProps<TPage, TItem> {
  // React Query infinite result
  queryResult: UseInfiniteQueryResult<InfiniteData<TPage>, Error>;
  // Extract items array from a page payload
  selectItems: (page: TPage) => readonly TItem[] | TItem[];
  // How to render each item
  renderItem: (info: ListRenderItemInfo<TItem>) => React.ReactElement | null;
  // Provide a stable key for each item
  keyExtractor: (item: TItem, index: number) => string;
  // Optional list props
  numColumns?: number;
  id?: string;
  onEndReachedThreshold?: number;
  listEmptyComponent?: React.ReactElement | null;
  listErrorComponent?: React.ReactElement | null;
}

export default function InfiniteProductGrid<TPage, TItem>(
  props: InfiniteProductGridProps<TPage, TItem>,
) {
  const {
    queryResult,
    selectItems,
    renderItem,
    keyExtractor,
    numColumns = 2,
    id,
    onEndReachedThreshold = 0.4,
    listEmptyComponent,
    listErrorComponent,
  } = props;

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = queryResult;

  const flatData: TItem[] = React.useMemo(() => {
    const pages = data?.pages ?? [];
    return pages.flatMap((p) => selectItems(p) as TItem[]);
  }, [data, selectItems]);

  if (isLoading) {
    return (
      <View style={{ paddingVertical: 16 }}>
        <ThemedLoader />
      </View>
    );
  }

  if (isError) {
    return listErrorComponent ?? null;
  }

  return (
    <FlatList
      id={id}
      horizontal={false}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={flatData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      }}
      onEndReachedThreshold={onEndReachedThreshold}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={{ paddingVertical: 16 }}>
            <ThemedLoader />
          </View>
        ) : null
      }
      ListEmptyComponent={listEmptyComponent ?? null}
    />
  );
}
