import React from "react";
import { FlatList, View } from "react-native";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import categoryService from "@/modules/product/services/categoryService";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import ChildCategoryHorizontal from "@/modules/categories/components/ChildCategoryHorizontal";
import SingleProductCard from "@/modules/product/components/SingleProductCard";
import { TCategoryWithImage } from "@/modules/product/schemas/CategorySchema";

type CategoryBrowseRouteLevel = "child" | "subchild" | "grandchild";

interface CategoryBrowseScreenProps {
  slug: string;
  level: CategoryBrowseRouteLevel;
  params: {
    child?: string;
    subchild?: string;
    grandchild?: string;
  };
}

function resolveTitle(pathNames: string[]): string {
  return `Categories / ${pathNames.join(" / ")}`;
}

function resolveNextRoute(
  level: CategoryBrowseRouteLevel,
  item: TCategoryWithImage,
  params: CategoryBrowseScreenProps["params"],
) {
  if (level === "child" && params.child) {
    return {
      pathname: "/categories/[child]/[subchild]" as const,
      params: {
        child: params.child,
        subchild: item.slug,
      },
    };
  }

  if (level === "subchild" && params.child && params.subchild) {
    return {
      pathname: "/categories/[child]/[subchild]/[grandchild]" as const,
      params: {
        child: params.child,
        subchild: params.subchild,
        grandchild: item.slug,
      },
    };
  }

  return null;
}

export default function CategoryBrowseScreen({
  slug,
  level,
  params,
}: CategoryBrowseScreenProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["category-browse", slug],
    queryFn: () => categoryService.find(slug),
  });

  const browse = data?.browse;
  const childCategories = browse?.child_categories ?? [];
  const products = browse?.products?.data ?? data?.category?.products ?? [];
  const titleSegments = browse?.path
    ?.map((item) => item.name)
    .filter(Boolean) ?? [slug];

  return (
    <SafeAreaWrapper>
      <ScreenHeader title={resolveTitle(titleSegments)} />
      {isLoading ? (
        <ThemedLoader />
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => <SingleProductCard item={item} />}
          keyExtractor={(item) => item.uuid}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="gap-y-4 bg-white px-4 pb-4 pt-2">
              {childCategories.length > 0 ? (
                <View className="gap-y-3">
                  <ThemedText type="subtitle">Refine by category</ThemedText>
                  <FlatList
                    horizontal
                    data={childCategories}
                    keyExtractor={(item) => item.uuid}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 12 }}
                    renderItem={({ item }) => {
                      const normalizedItem = {
                        ...item,
                        images: item.images ?? undefined,
                      };
                      const nextRoute = resolveNextRoute(
                        level,
                        normalizedItem,
                        params,
                      );

                      return (
                        <View style={{ marginRight: 12 }}>
                          <ChildCategoryHorizontal
                            item={normalizedItem}
                            onPress={() => {
                              if (nextRoute) {
                                router.push(nextRoute);
                              }
                            }}
                          />
                        </View>
                      );
                    }}
                  />
                </View>
              ) : null}

              <View className="flex-row items-center justify-between">
                <ThemedText type="subtitle">Products</ThemedText>
                {browse?.products?.next_page_url ? (
                  <ThemedText
                    darkColor={Colors.light.tint}
                    type="defaultSemiBold"
                  >
                    Showing first page
                  </ThemedText>
                ) : null}
              </View>
            </View>
          }
          ListEmptyComponent={
            <View className="px-4 py-8">
              <ThemedText
                type="title"
                darkColor={Colors.light.tint}
                lightColor={Colors.light.tint}
              >
                No products on record.
              </ThemedText>
            </View>
          }
        />
      )}
    </SafeAreaWrapper>
  );
}
