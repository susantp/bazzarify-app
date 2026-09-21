import React from "react";
import { useLocalSearchParams } from "expo-router";
import CategoryBrowseScreen from "@/modules/categories/components/CategoryBrowseScreen";

export default function SubChildCategoryScreen() {
  const { child, subchild } = useLocalSearchParams();

  return (
    <CategoryBrowseScreen
      level="subchild"
      slug={subchild.toString()}
      params={{
        child: child.toString(),
        subchild: subchild.toString(),
      }}
    />
  );
}
