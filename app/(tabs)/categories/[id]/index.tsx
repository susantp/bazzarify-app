import { FlatList } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { categoriesItemData } from "@/constants/categoriesItemData";
import { findChildren } from "@/utils/getById";
import ScreenHeader from "@/components/common/ScreenHeader";
import ChildCategoryHorizontal from "@/components/categories/ChildCategoryHorizontal";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";

export default function ChildCategoryScreen() {
  const { id } = useLocalSearchParams();
  const children = findChildren(categoriesItemData, [id.toString()]);
  const CARDS = [
    {
      title: "children",
      element: (
        <FlatList
          data={children}
          renderItem={({ item }) => (
            <ChildCategoryHorizontal
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/categories/[id]/[child]",
                  params: { child: item.id, id: id.toString() },
                })
              }
              item={item}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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
      <ScreenHeader
        title={`Categories / ${id.toString().slice(0, 8).padEnd(11, ".")}`}
      />
      <FlatList
        data={CARDS}
        contentContainerClassName="gap-y-2 bg-white"
        renderItem={({ item }) => item.element}
        keyExtractor={(item) => item.title.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaWrapper>
  );
}
