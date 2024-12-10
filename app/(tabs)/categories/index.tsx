import React from "react";
import { categoriesItemData } from "@/constants/categoriesItemData";
import { FlatList } from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import CategoryCard from "@/components/common/CategoryCard";

export default function CategoriesScreen() {
  return (
    <SafeAreaWrapper>
      <ScreenHeader title={"Categories"} />
      <FlatList
        className="bg-white"
        numColumns={4}
        horizontal={false}
        data={categoriesItemData}
        renderItem={({ item }) => (
          <CategoryCard item={item} key={item.id} cols={4} />
        )}
      />
    </SafeAreaWrapper>
  );
}
