import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import React from "react";
import VendorHeader, { vendorData } from "@/components/vendor/VendorBanner";
import { useGlobalSearchParams } from "expo-router";
import TopBar from "@/components/home/TopBar";

export default function Page() {
  const vendor = vendorData;
  const { vendorUuid } = useGlobalSearchParams<{ vendorUuid?: string }>();
  console.log("vendor products :", vendorUuid);
  return (
    <SafeAreaWrapper>
      <TopBar className={`flex-row items-center justify-between px-2 py-5`} />
      <VendorHeader vendor={vendor} />
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
