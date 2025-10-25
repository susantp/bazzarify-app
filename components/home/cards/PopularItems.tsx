import { GridWrapper } from "@/components/home/ContentGridSection";
import { ThemedText } from "@/components/ThemedText";
import { FlatList } from "react-native";
import ProductCard from "@/components/common/ProductCard";
import React from "react";
import { IHomeCardComponent } from "@/modules/home/types";
import { TPopularProductsPayload } from "@/modules/product/schemas/responsePayloads/PopularProductsPayloadSchema";

const className = "bg-white px-1 py-3";
const title = "Popular Items";
// const seeMorePath = "/(tabs)/categories/popular-items";
const id = "popularItems";
const numCols = 2;
export default function PopularItems({
  queryResult,
}: IHomeCardComponent<TPopularProductsPayload>) {
  const { data, isLoading, isError, error } = queryResult;
  return (
    <GridWrapper className={className} title={title}>
      {isLoading ? (
        <ThemedText>Loading</ThemedText>
      ) : isError ? (
        <ThemedText>{error.message}</ThemedText>
      ) : (
        <FlatList
          id={id}
          data={data?.popularProducts?.data}
          renderItem={({ item }) => <ProductCard item={item} cols={numCols} />}
          keyExtractor={(item) => item.uuid}
          horizontal={false}
          numColumns={numCols}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </GridWrapper>
  );
}
