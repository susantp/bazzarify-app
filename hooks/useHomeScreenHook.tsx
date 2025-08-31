import { GridWrapper } from "@/components/home/ContentGridSection";
import React from "react";
import * as Crypto from "expo-crypto";
import { randomUUID } from "expo-crypto";
import { Dimensions, FlatList, Image, View } from "react-native";
import ImageSlider from "@/components/common/ImageSlider";
import { SliderData } from "@/constants/SliderData";
import { useQueries } from "@tanstack/react-query";
import getFlashDealProducts from "@/modules/product/services/home/getFlashDealProducts";
import getPopularProducts from "@/modules/product/services/home/getPopularProducts";
import getHomeCategories from "@/modules/product/services/home/getHomeCategories";
import FlashDealsProductCard from "@/components/home/FlashDealsProductCard";
import ProductCard from "@/components/common/ProductCard";
import CategoryCard from "@/components/common/CategoryCard";
import { ThemedText } from "@/components/ThemedText";

export default function useHomeScreenHook() {
  const { width, height } = Dimensions.get("window");
  const [
    {
      data: flashDealProducts,
      isLoading: flashDealProductsLoading,
      isError: flashDealProductsError,
      error: flashDealProductsErrorMessage,
    },
    {
      data: popularProducts,
      isLoading: popularProductsLoading,
      isError: popularProductsError,
      error: popularProductsErrorMessage,
    },
    {
      data: homeCategories,
      isLoading: homeCategoriesLoading,
      isError: homeCategoriesError,
      error: homeCategoriesErrorMessage,
    },
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
        <GridWrapper
          title="Flash Deals"
          className="bg-white px-1 py-3"
          section={{
            title: "Flash Deals",
            seeMorePath: "/(tabs)/categories/flashDeal",
          }}
        >
          {flashDealProductsLoading ? (
            <ThemedText>Loading</ThemedText>
          ) : flashDealProductsError ? (
            <ThemedText>{flashDealProductsErrorMessage.message}</ThemedText>
          ) : (
            <FlatList
              id="content"
              data={flashDealProducts?.flashDeals.data}
              renderItem={({ item }) => <FlashDealsProductCard item={item} />}
              keyExtractor={() => Crypto.randomUUID()}
              horizontal={false}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </GridWrapper>
      ),
    },
    {
      id: randomUUID(),
      component: (
        <GridWrapper
          className="bg-white px-1 py-3"
          title="Popular Items"
          section={{
            title: "Popular Items",
            seeMorePath: "/(tabs)/categories/popular",
          }}
        >
          {popularProductsLoading ? (
            <ThemedText>Loading</ThemedText>
          ) : popularProductsError ? (
            <ThemedText>{popularProductsErrorMessage.message}</ThemedText>
          ) : (
            <FlatList
              id="content"
              data={popularProducts?.popularProducts.data}
              renderItem={({ item, index }) => (
                <ProductCard item={item} key={index} cols={2} />
              )}
              keyExtractor={() => Crypto.randomUUID()}
              horizontal={false}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </GridWrapper>
      ),
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
        <GridWrapper
          className="flex-col bg-white px-1 py-3"
          title="Categories"
          section={{
            title: "Categories",
            seeMorePath: "/(tabs)/categories",
          }}
        >
          {homeCategoriesLoading ? (
            <ThemedText>Loading</ThemedText>
          ) : homeCategoriesError ? (
            <ThemedText>{homeCategoriesErrorMessage.message}</ThemedText>
          ) : (
            <FlatList
              id="content"
              data={homeCategories?.homeCategories.data}
              renderItem={({ item, index }) => (
                <CategoryCard cols={3} item={item} index={index} />
              )}
              keyExtractor={() => Crypto.randomUUID()}
              horizontal={false}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </GridWrapper>
      ),
    },
    //TODO: enable when popular products api is ready and design it like request next page after view ends
    // {
    //   id: randomUUID(),
    //   component: (
    //     <ContentGridSection
    //       cols={2}
    //       section={{ title: "Just for you", seeMorePath: "/(tabs)/categories" }}
    //       className="flex-col gap-y-4 bg-white px-1 py-3"
    //       title="Just for you"
    //       items={popularProducts}
    //       horizontal={false}
    //       renderItem={(item, index, cols) => (
    //         <ProductCard item={item} key={index} cols={cols} />
    //       )}
    //     />
    //   ),
    //   title: "Just for you",
    // },
  ];

  return {
    CARDS,
  };
}
