import React from "react";
import { useLocalSearchParams } from "expo-router";
import CategoryBrowseScreen from "@/modules/categories/components/CategoryBrowseScreen";

export default function ChildCategoryScreen() {
  const { child } = useLocalSearchParams();

  return (
    <CategoryBrowseScreen
      level="child"
      slug={child.toString()}
      params={{ child: child.toString() }}
    />
  );
}
