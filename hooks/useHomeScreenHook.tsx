import ContentGridSection from "@/components/home/ContentGridSection";
import React from "react";
import { randomUUID } from "expo-crypto";
import { Dimensions, Image, View } from "react-native";
import ImageSlider from "@/components/common/ImageSlider";
import { SliderData } from "@/constants/SliderData";
import { useQueries } from "@tanstack/react-query";
import getFlashDealProducts from "@/modules/product/services/home/getFlashDealProducts";
import getPopularProducts from "@/modules/product/services/home/getPopularProducts";
import getHomeCategories from "@/modules/product/services/home/getHomeCategories";
import FlashDealsProductCard from "@/components/home/FlashDealsProductCard";
import ProductCard from "@/components/common/ProductCard";
import CategoryCard from "@/components/common/CategoryCard";

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
          section={{
            title: "Flash Deals",
            seeMorePath: "/(tabs)/categories/flashDeal",
          }}
          title="Flash Deals"
          items={flashDealProducts?.slice(0, 6)}
          renderItem={(deal) => <FlashDealsProductCard item={deal} />}
          showDiscountBadge={true}
          navigateTo={"/index"}
          className="bg-white px-1 py-3"
          horizontal={false}
          cols={3}
        />
      ),
      title: "Flash Deals",
    },
    {
      id: randomUUID(),
      component: (
        <ContentGridSection
          cols={2}
          section={{
            title: "Popular Items",
            seeMorePath: "/(tabs)/categories/popular",
          }}
          className="bg-white px-1 py-3"
          title="Popular Items"
          items={popularProducts?.slice(0, 4)}
          renderItem={(item, index, cols) => (
            <ProductCard item={item} key={index} cols={cols} />
          )}
          horizontal={false}
        />
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
          section={{
            title: "Categories",
            seeMorePath: "/(tabs)/categories",
          }}
          className="flex-col bg-white px-1 py-3"
          title="Categories"
          cols={3}
          renderItem={(item, index, cols) => (
            <CategoryCard cols={cols} item={item} index={index} />
          )}
          items={homeCategories?.slice(0, 9)}
          horizontal={false}
        />
      ),
      title: "Categories",
    },
    {
      id: randomUUID(),
      component: (
        <ContentGridSection
          cols={2}
          section={{ title: "Just for you", seeMorePath: "/(tabs)/categories" }}
          className="flex-col gap-y-4 bg-white px-1 py-3"
          title="Just for you"
          items={popularProducts}
          horizontal={false}
          renderItem={(item, index, cols) => (
            <ProductCard item={item} key={index} cols={cols} />
          )}
        />
      ),
      title: "Just for you",
    },
  ];

  return {
    CARDS,
  };
}
