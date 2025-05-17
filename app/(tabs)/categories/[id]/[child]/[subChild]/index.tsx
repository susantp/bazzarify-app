import React from "react";
import { useLocalSearchParams } from "expo-router";
import { popularItemsData } from "@/constants/popularItemsData";
import ContentGridSection from "@/components/home/ContentGridSection";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ProductCard from "@/components/common/ProductCard";

export default function SubChildCategoryScreen() {
  const { id, child, subChild } = useLocalSearchParams();

  return (
    <SafeAreaWrapper>
      <ScreenHeader
        title={`Categories / ${id.toString().slice(0, 6).padEnd(9, ".")} / ${child.toString().slice(0, 6).padEnd(9, ".")} / ${subChild.toString().slice(0, 6).padEnd(9, ".")}`}
      />
      <ContentGridSection
        className="align-center flex-col bg-white"
        title={"Popular Items"}
        items={popularItemsData}
        horizontal={false}
        cols={2}
        renderItem={(item, index, cols) => (
          <ProductCard item={item} key={index} cols={cols} />
        )}
      />
    </SafeAreaWrapper>
  );
}
