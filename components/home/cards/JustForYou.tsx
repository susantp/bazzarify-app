import { GridWrapper } from "@/components/home/ContentGridSection";
import { ThemedText } from "@/components/ThemedText";
import { FlatList, View } from "react-native";
import ProductCard from "@/components/common/ProductCard";
import React from "react";
import { IHomeInfiniteCardComponent } from "@/components/home/types";
import { IJustForYouProductsPayload } from "@/modules/product/types/payloads";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { InfiniteData } from "@tanstack/query-core";

const className = "bg-white px-1 py-3";
const title = "Just For You";
const seeMorePath = "/(tabs)/categories/just-for-you";
const id = "JustForYou";
const numCols = 2;
export default function JustForYou({
  queryResult,
}: IHomeInfiniteCardComponent<IJustForYouProductsPayload>) {
  const { data, isLoading, isError, error } =
    queryResult as UseInfiniteQueryResult<
      InfiniteData<IJustForYouProductsPayload>,
      Error
    >;

  return (
    <GridWrapper className={className} title={title} seeMorePath={seeMorePath}>
      {isLoading ? (
        <ThemedText>Loading</ThemedText>
      ) : isError ? (
        <ThemedText>{error.message}</ThemedText>
      ) : (
        <FlatList
          id={id}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={(data?.pages ?? []).flatMap((p) => p.justForYouProducts.data)}
          renderItem={({ item, index }) => (
            <ProductCard item={item} key={index} cols={numCols} />
          )}
          keyExtractor={(item) => item?.uuid}
          onEndReached={() => {
            if (queryResult.hasNextPage && !queryResult.isFetchingNextPage) {
              void queryResult.fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            queryResult.isFetchingNextPage ? (
              <View style={{ paddingVertical: 16 }}>
                <ThemedLoader />
              </View>
            ) : null
          }
        />
      )}
    </GridWrapper>
  );
}
