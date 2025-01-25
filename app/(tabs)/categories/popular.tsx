import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import { popularItemsData } from "@/constants/popularItemsData";
import ContentGridSection from "@/components/home/ContentGridSection";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  return (
    <SafeAreaWrapper>
      <View className="flex-row items-center justify-between pr-3">
        <ScreenHeader title="Popular Deals" />
        <TouchableOpacity activeOpacity={0.6}>
          <Ionicons
            name="options"
            size={24}
            color="white"
            className="rotate-90"
          />
        </TouchableOpacity>
      </View>
      <ContentWrapper>
        <ContentGridSection
          classes=" bg-white flex-col align-center"
          title={"Popular Items"}
          items={popularItemsData}
          horizontal={false}
          cols={2}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
