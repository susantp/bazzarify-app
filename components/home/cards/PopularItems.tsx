import { GridWrapper } from "@/components/home/ContentGridSection";
import { ThemedText } from "@/components/ThemedText";
import { FlatList } from "react-native";
import ProductCard from "@/components/common/ProductCard";
import * as Crypto from "expo-crypto";
import React from "react";
import { IHomeCardComponent } from "@/modules/home/types";
import { IPopularProductsPayload } from "@/modules/product/types/payloads";

const className = "bg-white px-1 py-3";
const title = "Popular Items";
const seeMorePath = "/(tabs)/categories/popular-items";
const id = "popularItems";
const numCols = 2;
export default function PopularItems({
  queryResult,
}: IHomeCardComponent<IPopularProductsPayload | undefined>) {
  const { data, isLoading, isError, error } = queryResult;
  return (
    <GridWrapper className={className} title={title} seeMorePath={seeMorePath}>
      {isLoading ? (
        <ThemedText>Loading</ThemedText>
      ) : isError ? (
        <ThemedText>{error.message}</ThemedText>
      ) : (
        <FlatList
          id={id}
          data={data?.popularProducts.data}
          renderItem={({ item, index }) => (
            <ProductCard item={item} key={index} cols={numCols} />
          )}
          keyExtractor={() => Crypto.randomUUID()}
          horizontal={false}
          numColumns={numCols}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </GridWrapper>
  );
}
