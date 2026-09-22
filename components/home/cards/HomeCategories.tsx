import { GridWrapper } from "@/components/home/ContentGridSection";
import { ThemedText } from "@/components/ThemedText";
import { FlatList } from "react-native";
import React from "react";
import { IHomeCardComponent } from "@/modules/home/types";
import CategoryCard from "@/modules/categories/components/CategoryCard";
import { THomeCategoriesPayload } from "@/modules/product/schemas/responsePayloads/HomeCategoriesPayloadSchema";
import { router } from "expo-router";

const title = "Categories";
const seeMorePath = "/(public)/(tabs)/categories";
const id = "categories";
const numCols = 3;
export default function HomeCategories({
  queryResult,
}: IHomeCardComponent<THomeCategoriesPayload | undefined>) {
  const { data, isLoading, isError, error } = queryResult;
  return (
    <GridWrapper title={title} seeMorePath={seeMorePath}>
      {isLoading ? (
        <ThemedText>Loading</ThemedText>
      ) : isError ? (
        <ThemedText>{error.message}</ThemedText>
      ) : (
        <FlatList
          id={id}
          data={data?.homeCategories?.data}
          renderItem={({ item, index }) => (
            <CategoryCard
              cols={numCols}
              item={item}
              index={index}
              hasImages={item?.images?.length! > 0}
              onPress={() =>
                router.push({
                  pathname: "/(public)/(tabs)/categories/[child]",
                  params: { child: encodeURIComponent(item.slug) },
                })
              }
            />
          )}
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
