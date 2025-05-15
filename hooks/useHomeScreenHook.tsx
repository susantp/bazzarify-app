import ContentGridSection from "@/components/home/ContentGridSection";
import SectionHeader from "@/components/home/SectionHeader";
import React from "react";
import { randomUUID } from "expo-crypto";
import { Dimensions, Image, View } from "react-native";
import ImageSlider from "@/components/common/ImageSlider";
import { SliderData } from "@/constants/SliderData";
import { useQueries } from "@tanstack/react-query";
import getFlashDealProducts from "@/modules/product/services/home/getFlashDealProducts";
import getPopularProducts from "@/modules/product/services/home/getPopularProducts";
import getHomeCategories from "@/modules/product/services/home/getHomeCategories";

export default function useHomeScreenHook() {
  const { width, height } = Dimensions.get("window");
  const [
    { data: flashDealProducts },
    { data: popularProducts },
    { data: homeCategories },
  ] = useQueries({
    queries: [
      {
        queryKey: ["flashDealProducts"],
        queryFn: getFlashDealProducts,
      },
      {
        queryKey: ["popularProducts"],
        queryFn: getPopularProducts,
      },
      {
        queryKey: ["homeCategories"],
        queryFn: getHomeCategories,
      },
    ],
  });

  const CARDS = [
    {
      id: randomUUID(),
      component: <ImageSlider images={SliderData} autoplayInterval={4000} />,
      title: "Slider",
    },
    {
      id: randomUUID(),
      component: (
        <ContentGridSection
          title="Flash Deals"
          items={flashDealProducts?.slice(0, 6)}
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
          items={popularProducts?.slice(0, 4)}
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
          items={homeCategories?.slice(0, 9)}
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
          items={popularProducts}
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
