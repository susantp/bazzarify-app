import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { router } from "expo-router";
import ContentWrapper from "@/components/common/ContentWrapper";
import { Text } from "react-native";
import React from "react";
import VendorHeader, { vendorData } from "@/components/vendor/VendorHeader";

export default function Page() {
  const vendor = vendorData;
  const canGoBack = router.canGoBack();
  return (
    <SafeAreaWrapper>
      <VendorHeader canGoBack={canGoBack} vendor={vendor} />
      <ContentWrapper>
        <Text className="text-xl text-orange-600">Categories</Text>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
