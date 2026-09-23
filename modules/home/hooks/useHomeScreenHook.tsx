import React from "react";
import ImageSlider from "@/components/common/ImageSlider";
import { ImageSliderType, SliderData } from "@/constants/SliderData";
import {
  useInfiniteQuery,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import FlashDealCard from "@/components/home/cards/FlashDealCard";
import PopularItems from "@/components/home/cards/PopularItems";
import JustForYou from "@/components/home/cards/JustForYou";
import HomeCategories from "@/components/home/cards/HomeCategories";
import { IHomeCard } from "@/modules/home/types";
import homeService from "@/modules/product/services/homeService";
import marketingService from "@/modules/marketing/sliders/domain/services/marketingService";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";
import { Text } from "@/components/design-system";

export default function useHomeScreenHook() {
  const queryClient = useQueryClient();
  const [
    homeSlidersQueryResult,
    flashDealsQueryResult,
    popularProductsQueryResult,
    homeCategoriesQueryResult,
  ] = useQueries({
    queries: [
      {
        queryKey: ["homeSliders"],
        queryFn: marketingService.getHomeSliders,
      },
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
  const justForYouProductsQueryResult = useInfiniteQuery({
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
    homeSlidersQueryResult.isRefetching ||
    flashDealsQueryResult.isRefetching ||
    popularProductsQueryResult.isRefetching ||
    homeCategoriesQueryResult.isRefetching ||
    justForYouProductsQueryResult.isRefetching;

  const onRefresh = async () => {
    // Reset the infinite list so it starts from page 1 again on pull-to-refresh
    // Clear cached pages for the infinite query so it restarts from initialPageParam (1)
    queryClient.removeQueries({
      queryKey: ["just-for-you-products"],
      exact: true,
    });

    await Promise.all([
      homeSlidersQueryResult.refetch(),
      flashDealsQueryResult.refetch(),
      popularProductsQueryResult.refetch(),
      homeCategoriesQueryResult.refetch(),
      // After removal, refetch will fetch from the initialPageParam (1)
      justForYouProductsQueryResult.refetch(),
    ]);
  };
  const getSliderData = (): ImageSliderType[] => {
    let sliderData: ImageSliderType[] = SliderData;
    if (
      homeSlidersQueryResult.data &&
      homeSlidersQueryResult.data.sliders.data
    ) {
      sliderData = [];
      const { sliders } = homeSlidersQueryResult.data;
      sliders.data?.forEach((slider) =>
        sliderData.push({
          title: slider.title,
          image: getFirstImageSource({
            images: slider.images,
            baseUrl: slider.image_base_url,
          }),
          description: slider.title,
        }),
      );
    }
    return sliderData;
  };
  const CARDS: IHomeCard[] = [
    {
      id: "slider",
      component: homeCategoriesQueryResult.isLoading ? (
        <Text>Loading</Text>
      ) : homeCategoriesQueryResult.isError ? (
        <></>
      ) : (
        <ImageSlider images={getSliderData()} autoplayInterval={4000} />
      ),
      title: "Slider",
    },
    {
      id: "flash-deals",
      component: flashDealsQueryResult?.data?.flashDeals?.data?.length! ? (
        <FlashDealCard queryResult={flashDealsQueryResult} />
      ) : undefined,
      title: "Flash Deals",
    },
    {
      id: "popular-items",
      component: popularProductsQueryResult?.data?.popularProducts?.data
        ?.length! ? (
        <PopularItems queryResult={popularProductsQueryResult} />
      ) : undefined,
      title: "Popular Items",
    },
    {
      id: "categories",
      component: homeCategoriesQueryResult?.data?.homeCategories?.data
        ?.length! ? (
        <HomeCategories queryResult={homeCategoriesQueryResult} />
      ) : undefined,
      title: "Categories",
    },
    {
      id: "just-for-you",
      component: <JustForYou queryResult={justForYouProductsQueryResult} />,
      title: "Just For You",
    },
  ];

  return {
    CARDS,
    refreshing,
    onRefresh,
    justForYouProductsQueryResult,
  };
}
