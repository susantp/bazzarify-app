import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import React from "react";
import VendorBanner, { vendorData } from "@/components/vendor/VendorBanner";
import { FlatList, ImageBackground, useWindowDimensions } from "react-native";
import { randomUUID } from "expo-crypto";
import { useLocalSearchParams } from "expo-router";
import TopBar from "@/components/home/TopBar";

export default function Page() {
  const vendor = vendorData;
  const { height, width } = useWindowDimensions();
  const { vendorUuid } = useLocalSearchParams();
  console.log("vendor", vendorUuid);
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
    // {
    //   id: randomUUID(),
    //   title: "saleLiveBanner1",
    //   component: (
    //     <ImageBackground
    //       resizeMode={"stretch"}
    //       style={{
    //         marginHorizontal: "auto",
    //         height: height / 2,
    //         width: width * 0.95,
    //         marginVertical: 10,
    //       }}
    //       source={require("@/assets/images/vendor/saleLiveBanner1.png")}
    //     />
    //   ),
    // },
    // {
    //   id: randomUUID(),
    //   title: "popular6Items",
    //   component: (
    //     <ContentGridSection
    //       className="align-center flex-col bg-white"
    //       title={"Popular Items"}
    //       items={popularItemsData.slice(0, 6)}
    //       horizontal={false}
    //       cols={2}
    //       renderItem={(item, index, cols) => (
    //         <ProductCard item={item} key={index} cols={cols} />
    //       )}
    //     />
    //   ),
    // },

    // {
    //   id: randomUUID(),
    //   title: "popular6Items",
    //   component: (
    //     <ContentGridSection
    //       className="align-center flex-col bg-white"
    //       title={"Popular Items"}
    //       items={popularItemsData.slice(0, 6)}
    //       horizontal={false}
    //       cols={2}
    //       renderItem={(item, index, cols) => (
    //         <ProductCard item={item} key={index} cols={cols} />
    //       )}
    //     />
    //   ),
    // },

    // {
    //   id: randomUUID(),
    //   title: "popular6Items",
    //   component: (
    //     <ContentGridSection
    //       className="align-center flex-col bg-white"
    //       title={"Popular Items"}
    //       items={popularItemsData.slice(0, 4)}
    //       horizontal={false}
    //       cols={2}
    //       renderItem={(item, index, cols) => (
    //         <ProductCard item={item} key={index} cols={cols} />
    //       )}
    //     />
    //   ),
    // },
  ];

  return (
    <SafeAreaWrapper>
      <TopBar className={`flex-row items-center justify-between px-2 py-5`} />
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
