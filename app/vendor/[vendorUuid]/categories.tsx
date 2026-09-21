import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import React from "react";
import VendorHeader from "@/components/vendor/VendorBanner";
import { useLocalSearchParams } from "expo-router";
import TopBar from "@/components/home/TopBar";
import VendorCategories from "@/modules/vendor/components/VendorCategories";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import useVendorHook from "@/modules/vendor/domain/hooks/useVendorHook";

export default function Page() {
  const { vendorUuid } = useLocalSearchParams<{
    vendorUuid: string | string[];
  }>();
  const { vendorCategories } = useVendorHook(vendorUuid.toString());
  if (vendorCategories.isLoading) {
    return <ThemedLoader />;
  }
  return (
    <SafeAreaWrapper>
      <TopBar className={`flex-row items-center justify-between px-2 py-5`} />
      <VendorHeader vendorUuid={vendorUuid.toString()} />
      <VendorCategories queryResult={vendorCategories} />
    </SafeAreaWrapper>
  );
}
