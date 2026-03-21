import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import CategoryCard from "@/modules/categories/components/CategoryCard";
import ContentWrapper from "@/components/common/ContentWrapper";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { randomUUID } from "expo-crypto";
import { ThemedText } from "@/components/ThemedText";
import useCategoryHook from "@/modules/categories/hooks/useCategoryHook";
import { router } from "expo-router";

export default function CategoriesScreen() {
  const {
    isLoading,
    isError,
    flatData,
    hasNextPage,
    isFetchingNextPage,
    refreshing,
    hasCategories,
    onRefresh,
    fetchNextPage,
  } = useCategoryHook();

  if (isLoading) {
    return (
      <SafeAreaWrapper>
        <ScreenHeader title={"Categories"} />
        <ContentWrapper>
          <View style={{ paddingVertical: 16 }}>
            <ThemedLoader />
          </View>
        </ContentWrapper>
      </SafeAreaWrapper>
    );
  }

  if (isError) {
    return (
      <SafeAreaWrapper>
        <ScreenHeader title={"Categories"} />
        <ContentWrapper>
          <View style={{ paddingVertical: 16 }} />
        </ContentWrapper>
      </SafeAreaWrapper>
    );
  }
  if (hasCategories) {
    return (
      <SafeAreaWrapper>
        <ScreenHeader title={"Categories"} />
        <ContentWrapper>
          <View style={{ paddingVertical: 16 }}>
            <ThemedText type="title">Categories is empty</ThemedText>
          </View>
        </ContentWrapper>
      </SafeAreaWrapper>
    );
  }
  return (
    <SafeAreaWrapper>
      <ScreenHeader title={"Categories"} />
      <ContentWrapper>
        <FlatList
          horizontal={false}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={flatData}
          renderItem={({ item }) => (
            <CategoryCard
              item={item}
              cols={4}
              hasImages={item?.images?.length! > 0}
              onPress={() =>
                router.push({
                  pathname: "/categories/[child]",
                  params: { child: encodeURIComponent(item.slug) },
                })
              }
            />
          )}
          keyExtractor={(item: any) => item?.uuid ?? randomUUID()}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              void fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.4}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={{ paddingVertical: 10 }}>
                <ThemedLoader />
              </View>
            ) : null
          }
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
