import React from "react";
import { useLocalSearchParams } from "expo-router";
import { popularItemsData } from "@/constants/popularItemsData";
import ContentGridSection from "@/components/home/ContentGridSection";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";

export default function SubChildCategoryScreen() {
  const { id, child, subChild } = useLocalSearchParams();

  return (
    <SafeAreaWrapper>
      <ScreenHeader
        title={`Categories / ${id.toString().slice(0, 6).padEnd(9, ".")} / ${child.toString().slice(0, 6).padEnd(9, ".")} / ${subChild.toString().slice(0, 6).padEnd(9, ".")}`}
      />
      <ContentGridSection
        classes=" bg-white flex-col align-center"
        title={"Popular Items"}
        items={popularItemsData}
        horizontal={false}
        cols={2}
      />
    </SafeAreaWrapper>
  );
}
