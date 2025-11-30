import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import React from "react";
import VendorHeader, { vendorData } from "@/components/vendor/VendorBanner";
import useSearchBarHook from "@/hooks/useSearchBarHook";
import NormalTopBar from "@/components/common/NormalTopBar";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const vendor = vendorData;
  const { uuid } = useLocalSearchParams();
  console.log("vendor products :", uuid);
  const { canGoBack, onSearchSubmit, handleChangeText } = useSearchBarHook();
  return (
    <SafeAreaWrapper>
      <NormalTopBar
        canGoBack={canGoBack}
        handleSubmitEditing={onSearchSubmit}
        onChangeText={handleChangeText}
        searchPlaceHolder={`search on ${vendor.name}`}
      />
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
