import React from "react";
import { useLocalSearchParams } from "expo-router";
import CategoryBrowseScreen from "@/modules/categories/components/CategoryBrowseScreen";

export default function GrandChildCategoryScreen() {
  const { child, subchild, grandchild } = useLocalSearchParams();

  return (
    <CategoryBrowseScreen
      level="grandchild"
      slug={grandchild.toString()}
      params={{
        child: child.toString(),
        subchild: subchild.toString(),
        grandchild: grandchild.toString(),
      }}
    />
  );
}
