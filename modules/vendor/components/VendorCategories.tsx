import { GridWrapper } from "@/components/home/ContentGridSection";
import { ThemedText } from "@/components/ThemedText";
import { FlatList } from "react-native";
import { IHomeCardComponent } from "@/modules/home/types";
import CategoryCard from "@/modules/categories/components/CategoryCard";
import { THomeCategoriesPayload } from "@/modules/product/schemas/responsePayloads/HomeCategoriesPayloadSchema";
import { router } from "expo-router";
import { EmptyState, ErrorState } from "@/components/design-system";

const title = "Categories";
// const seeMorePath = "/(tabs)/categories";
const id = "categories";
const numCols = 3;
export default function VendorCategories({
  queryResult,
}: IHomeCardComponent<THomeCategoriesPayload | undefined>) {
  const { data, isLoading, isError, refetch } = queryResult;
  const categories = data?.homeCategories?.data ?? [];

  return (
    <GridWrapper title={title}>
      {isLoading ? (
        <ThemedText>Loading</ThemedText>
      ) : isError ? (
        <ErrorState
          title="Couldn't load categories"
          description="Check your connection and try again."
          action={{ label: "Retry", onPress: () => void refetch() }}
          testID="vendor-categories-error"
        />
      ) : categories.length === 0 ? (
        <EmptyState
          title="No categories yet"
          description="This store hasn't added any categories yet."
          testID="vendor-categories-empty"
        />
      ) : (
        <FlatList
          id={id}
          data={categories}
          renderItem={({ item, index }) => (
            <CategoryCard
              cols={numCols}
              item={item}
              index={index}
              hasImages={item?.images?.length! > 0}
              onPress={() =>
                router.push({
                  pathname: "/categories/[child]",
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
