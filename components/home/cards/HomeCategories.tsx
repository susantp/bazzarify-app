import { GridWrapper } from "@/components/home/ContentGridSection";
import { ThemedText } from "@/components/ThemedText";
import { FlatList } from "react-native";
import * as Crypto from "expo-crypto";
import React from "react";
import { IHomeCardComponent } from "@/modules/home/types";
import CategoryCard from "@/components/common/CategoryCard";
import { THomeCategoriesPayload } from "@/modules/product/schemas/responsePayloads/HomeCategoriesPayloadSchema";

const className = "flex-col bg-white px-1 py-3";
const title = "Categories";
const seeMorePath = "/(tabs)/categories";
const id = "categories";
const numCols = 3;
export default function HomeCategories({
  queryResult,
}: IHomeCardComponent<THomeCategoriesPayload | undefined>) {
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
          data={data?.homeCategories?.data}
          renderItem={({ item, index }) => (
            <CategoryCard cols={numCols} item={item} index={index} />
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
