import React from "react";
import { randomUUID } from "expo-crypto";
import { Dimensions, Image, View } from "react-native";
import ImageSlider from "@/components/common/ImageSlider";
import { SliderData } from "@/constants/SliderData";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import FlashDealCard from "@/components/home/cards/FlashDealCard";
import PopularItems from "@/components/home/cards/PopularItems";
import JustForYou from "@/components/home/cards/JustForYou";
import HomeCategories from "@/components/home/cards/HomeCategories";
import { IHomeCard } from "@/modules/home/types";
import homeService from "@/modules/product/services/homeService";

export default function useHomeScreenHook() {
  const { width, height } = Dimensions.get("window");
  const [
    flashDealsQueryResult,
    popularProductsQueryResult,
    homeCategoriesQueryResult,
  ] = useQueries({
    queries: [
      {
        queryKey: ["flashDealProducts"],
        queryFn: homeService.getFlashDealProducts,
      },
      {
        queryKey: ["popularProducts"],
        queryFn: homeService.getPopularProducts,
      },
      {
        queryKey: ["homeCategories"],
        queryFn: homeService.getHomeCategories,
      },
    ],
  });
  const justForYouProducts = useInfiniteQuery({
    queryKey: ["just-for-you-products"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      homeService.getJustForYouProducts({
        perPage: "10",
        page: String(pageParam),
      }),
    getNextPageParam: (lastPage) => {
      const p = lastPage?.justForYouProducts;
      return p?.next_page_url ? Number(p.current_page) + 1 : undefined;
    },
  });

  const refreshing =
    flashDealsQueryResult.isRefetching ||
    popularProductsQueryResult.isRefetching ||
    homeCategoriesQueryResult.isRefetching ||
    justForYouProducts.isRefetching;

  const onRefresh = async () => {
    await Promise.all([
      flashDealsQueryResult.refetch(),
      popularProductsQueryResult.refetch(),
      homeCategoriesQueryResult.refetch(),
      justForYouProducts.refetch(),
    ]);
  };

  const CARDS: IHomeCard[] = [
    {
      id: randomUUID(),
      component: <ImageSlider images={SliderData} autoplayInterval={4000} />,
      title: "Slider",
    },
    {
      id: randomUUID(),
      component: <FlashDealCard queryResult={flashDealsQueryResult} />,
      title: "Flash Deals",
    },
    {
      id: randomUUID(),
      component: <PopularItems queryResult={popularProductsQueryResult} />,
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
      title: "Ad Banner",
    },
    {
      id: randomUUID(),
      component: <HomeCategories queryResult={homeCategoriesQueryResult} />,
      title: "Categories",
    },
    {
      id: randomUUID(),
      component: <JustForYou queryResult={justForYouProducts} />,
      title: "Just For You",
    },
  ];

  return {
    CARDS,
    refreshing,
    onRefresh,
  };
}
