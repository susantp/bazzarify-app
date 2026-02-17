import React from "react";
import { useLocalSearchParams } from "expo-router";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useQuery } from "@tanstack/react-query";
import categoryService from "@/modules/product/services/categoryService";
import SingleProductCard from "@/modules/product/components/SingleProductCard";
import { FlatList } from "react-native";
import { randomUUID } from "expo-crypto";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export default function SubChildCategoryScreen() {
  const { child, subchild, grandchild } = useLocalSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["category", grandchild],
    queryFn: () => categoryService.find(grandchild.toString()),
  });

  return (
    <SafeAreaWrapper className="h-screen">
      <ScreenHeader
        title={`Categories / ${child} / ${subchild} / ${grandchild}`}
      />
      <FlatList
        data={data?.category.products}
        renderItem={({ item }) => <SingleProductCard item={item} />}
        numColumns={2}
        keyExtractor={(item) => randomUUID()}
        ListEmptyComponent={
          isLoading ? (
            <ThemedLoader />
          ) : (
            <ThemedText
              type="title"
              darkColor={Colors.light.tint}
              lightColor={Colors.light.tint}
            >
              No products on record.
            </ThemedText>
          )
        }
      />
    </SafeAreaWrapper>
  );
}
