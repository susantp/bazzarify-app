import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import React from "react";
import VendorBanner, { vendorData } from "@/components/vendor/VendorBanner";
import ContentGridSection from "@/components/home/ContentGridSection";
import { popularItemsData } from "@/constants/popularItemsData";
import { FlatList, ImageBackground, useWindowDimensions } from "react-native";
import { randomUUID } from "expo-crypto";
import { SliderData } from "@/constants/SliderData";
import useSearchBarHook from "@/hooks/useSearchBarHook";
import NormalTopBar from "@/components/common/NormalTopBar";
import ImageSlider from "@/components/common/ImageSlider";

export default function Page() {
  const vendor = vendorData;
  const { height, width } = useWindowDimensions();
  const CARDS = [
    {
      id: randomUUID(),
      title: "saleLiveBanner",
      component: (
        <ImageBackground
          resizeMode={"stretch"}
          style={{
            marginHorizontal: "auto",
            height: height * 0.2,
            width: width * 0.95,
            marginTop: 10,
          }}
          source={require("@/assets/images/vendor/saleLiveBanner.png")}
        />
      ),
    },
    {
      id: randomUUID(),
      title: "saleLiveBanner1",
      component: (
        <ImageBackground
          resizeMode={"stretch"}
          style={{
            marginHorizontal: "auto",
            height: height / 2,
            width: width * 0.95,
            marginVertical: 10,
          }}
          source={require("@/assets/images/vendor/saleLiveBanner1.png")}
        />
      ),
    },
    {
      id: randomUUID(),
      title: "popular6Items",
      component: (
        <ContentGridSection
          className="align-center flex-col bg-white"
          title={"Popular Items"}
          items={popularItemsData.slice(0, 6)}
          horizontal={false}
          cols={2}
        />
      ),
    },
    {
      id: randomUUID(),
      component: <ImageSlider images={SliderData} />,
      title: "Slider",
    },
    {
      id: randomUUID(),
      title: "popular6Items",
      component: (
        <ContentGridSection
          className="align-center flex-col bg-white"
          title={"Popular Items"}
          items={popularItemsData.slice(0, 6)}
          horizontal={false}
          cols={2}
        />
      ),
    },
    {
      id: randomUUID(),
      component: <ImageSlider images={SliderData} />,
      title: "Slider",
    },
    {
      id: randomUUID(),
      title: "popular6Items",
      component: (
        <ContentGridSection
          className="align-center flex-col bg-white"
          title={"Popular Items"}
          items={popularItemsData.slice(0, 4)}
          horizontal={false}
          cols={2}
        />
      ),
    },
  ];
  const { canGoBack, onSearchSubmit, handleChangeText } = useSearchBarHook();

  return (
    <SafeAreaWrapper>
      <NormalTopBar
        canGoBack={canGoBack}
        handleSubmitEditing={onSearchSubmit}
        onChangeText={handleChangeText}
        searchPlaceHolder={`search on ${vendor.name}`}
      />
      <VendorBanner vendor={vendor} />
      <ContentWrapper>
        <FlatList
          data={CARDS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => item.component}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
