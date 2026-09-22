import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import categoryService from "@/modules/product/services/categoryService";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import ChildCategoryHorizontal from "@/modules/categories/components/ChildCategoryHorizontal";
import SingleProductCard from "@/modules/product/components/SingleProductCard";
import { TCategoryWithImage } from "@/modules/product/schemas/CategorySchema";
import { Box, Text } from "@/components/design-system";

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
            <Box
              backgroundColor="surface"
              gap="lg"
              paddingX="lg"
              style={styles.header}
            >
              {childCategories.length > 0 ? (
                <Box gap="md">
                  <Text variant="bodyMedium">Refine by category</Text>
                  <FlatList
                    horizontal
                    data={childCategories}
                    keyExtractor={(item) => item.uuid}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
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
                        <Box style={styles.categoryItem}>
                          <ChildCategoryHorizontal
                            item={normalizedItem}
                            onPress={() => {
                              if (nextRoute) {
                                router.push(nextRoute);
                              }
                            }}
                          />
                        </Box>
                      );
                    }}
                  />
                </Box>
              ) : null}

              <Box direction="row" align="center" justify="space-between">
                <Text variant="bodyMedium">Products</Text>
                {browse?.products?.next_page_url ? (
                  <Text variant="label" color="primary">
                    Showing first page
                  </Text>
                ) : null}
              </Box>
            </Box>
          }
          ListEmptyComponent={
            <Box paddingX="lg" paddingY="xxl">
              <Text variant="title" color="primary">
                No products on record.
              </Text>
            </Box>
          }
        />
      )}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  categoryItem: { marginRight: 12 },
  categoryList: { paddingRight: 12 },
  header: { paddingBottom: 16, paddingTop: 8 },
});
