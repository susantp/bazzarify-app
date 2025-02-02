import Slider from "@/components/home/Slider";
import { SliderData } from "@/constants/SliderData";
import ContentGridSection from "@/components/home/ContentGridSection";
import { popularItemsData } from "@/constants/popularItemsData";
import SectionHeader from "@/components/home/SectionHeader";
import { categoriesItemData } from "@/constants/categoriesItemData";
import React from "react";
import { randomUUID } from "expo-crypto";
import { Dimensions, Image, View } from "react-native";

export default function useHomeScreenHook() {
  const { width, height } = Dimensions.get("window");
  const CARDS = [
    {
      id: randomUUID(),
      component: <Slider itemList={SliderData} />,
      title: "Slider",
    },
    {
      id: randomUUID(),
      component: (
        <ContentGridSection
          title="Flash Deals"
          items={popularItemsData.slice(0, 6)}
          showDiscountBadge={true}
          navigateTo={"/index"}
          className="bg-white px-1 py-3"
          horizontal={false}
          cols={3}
        >
          <SectionHeader
            title="Flash Deals"
            seeMorePath="/(tabs)/categories/flashDeal"
          />
        </ContentGridSection>
      ),
      title: "Flash Deals",
    },
    {
      id: randomUUID(),
      component: (
        <ContentGridSection
          className="bg-white px-1 py-3"
          title="Popular Items"
          items={popularItemsData.slice(0, 4)}
          horizontal={false}
          cols={2}
        >
          <SectionHeader
            title="Popular Items"
            seeMorePath={"/(tabs)/categories/popular"}
          />
        </ContentGridSection>
      ),
      title: "Popular Items",
    },
    {
      id: randomUUID(),
      component: (
        <View className="flex w-full items-center">
          <Image
            source={require("@/assets/images/ads/homeAd.png")}
            style={{ width: width * 0.99, height: height * 0.2 }}
          />
        </View>
      ),
    },
    {
      id: randomUUID(),
      component: (
        <ContentGridSection
          className="flex-col bg-white px-1 py-3"
          title="Categories"
          items={categoriesItemData.slice(0, 9)}
          horizontal={false}
          cols={3}
        >
          <SectionHeader title="Categories" seeMorePath="/(tabs)/categories" />
        </ContentGridSection>
      ),
      title: "Categories",
    },
    {
      id: randomUUID(),
      component: (
        <ContentGridSection
          className="flex-col gap-y-4 bg-white px-1 py-3"
          title="Just for you"
          items={popularItemsData}
          horizontal={false}
          cols={2}
        >
          <SectionHeader
            title="Just for you"
            seeMorePath="/(tabs)/categories"
          />
        </ContentGridSection>
      ),
      title: "Just for you",
    },
  ];

  return {
    CARDS,
  };
}
