import Slider from "@/components/home/Slider";
import { SliderData } from "@/constants/SliderData";
import ContentGridSection from "@/components/home/ContentGridSection";
import { popularItemsData } from "@/constants/popularItemsData";
import SectionHeader from "@/components/home/SectionHeader";
import { categoriesItemData } from "@/constants/categoriesItemData";
import React from "react";
import { randomUUID } from "expo-crypto";

export default function useHomeScreenHook() {
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
          classes="px-1 py-3 bg-white "
          horizontal={false}
          cols={3}
        >
          <SectionHeader title="Flash Deals" seeMorePath="/(tabs)/categories" />
        </ContentGridSection>
      ),
      title: "Flash Deals",
    },
    {
      id: randomUUID(),
      component: (
        <ContentGridSection
          classes="px-1 py-3 bg-white"
          title="Popular Items"
          items={popularItemsData.slice(0, 4)}
          horizontal={false}
          cols={2}
        >
          <SectionHeader
            title="Popular Items"
            seeMorePath="/(tabs)/categories"
          />
        </ContentGridSection>
      ),
      title: "Popular Items",
    },
    {
      id: randomUUID(),
      component: (
        <ContentGridSection
          classes="px-1 py-3 bg-white flex-col"
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
          classes="px-1 py-3 bg-white flex-col gap-y-4"
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
