import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { router } from "expo-router";
import React from "react";
import VendorHeader, { vendorData } from "@/components/vendor/VendorBanner";

export default function Page() {
  const vendor = vendorData;
  const canGoBack = router.canGoBack();
  return (
    <SafeAreaWrapper>
      <VendorHeader canGoBack={canGoBack} vendor={vendor} />
      {/*<ContentWrapper>*/}
      {/*  <ContentGridSection*/}
      {/*    section={{ title: "All Products" }}*/}
      {/*    className="align-center flex-col bg-white py-2.5"*/}
      {/*    title={"Popular Items"}*/}
      {/*    items={popularItemsData}*/}
      {/*    horizontal={false}*/}
      {/*    cols={2}*/}
      {/*    renderItem={(item, index, cols) => (*/}
      {/*      <ProductCard item={item} key={index} cols={cols} />*/}
      {/*    )}*/}
      {/*  />*/}
      {/*</ContentWrapper>*/}
    </SafeAreaWrapper>
  );
}
