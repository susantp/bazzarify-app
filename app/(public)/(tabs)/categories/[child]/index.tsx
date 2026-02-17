import { FlatList } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useQuery } from "@tanstack/react-query";
import categoryService from "@/modules/product/services/categoryService";
import CategoryCard from "@/modules/categories/components/CategoryCard";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export default function ChildCategoryScreen() {
  const { child } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["category", child],
    queryFn: () => categoryService.find(child.toString()),
  });
  const children = data?.category?.children;
  const CARDS = [
    {
      title: "children",
      element: (
        <FlatList
          horizontal={false}
          numColumns={4}
          data={children}
          renderItem={({ item }) => (
            <CategoryCard
              cols={4}
              hasImages={item?.images?.length! > 0}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/categories/[child]/[subchild]",
                  params: {
                    child: child.toString(),
                    subchild: encodeURIComponent(item.slug),
                  },
                })
              }
              item={item}
            />
          )}
          keyExtractor={(item) => item.uuid}
          ListEmptyComponent={
            isLoading ? (
              <ThemedLoader />
            ) : (
              <ThemedText
                type="title"
                darkColor={Colors.light.tint}
                lightColor={Colors.light.tint}
              >
                No child categories found
              </ThemedText>
            )
          }
        />
      ),
    },
    // {
    //   title: "Related Items",
    //   element: (
    //     <ContentGridSection
    //       className="align-center flex-col bg-white"
    //       title={"Popular Items"}
    //       items={popularItemsData}
    //       horizontal={false}
    //       cols={2}
    //       renderItem={(item, index, cols) => (
    //         <ProductCard item={item} key={index} cols={cols} />
    //       )}
    //     />
    //   ),
    // },
  ];

  return (
    <SafeAreaWrapper>
      <ScreenHeader title={`Categories / ${child.toString()}`} />
      <FlatList
        data={CARDS}
        contentContainerClassName="gap-y-2 bg-white h-screen"
        renderItem={({ item }) => item.element}
        keyExtractor={(item) => item.title.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaWrapper>
  );
}
