import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import React from "react";
import VendorBanner from "@/components/vendor/VendorBanner";
import TopBar from "@/components/home/TopBar";
import { useLocalSearchParams } from "expo-router";
import VendorTopProducts from "@/modules/vendor/components/VendorTopProducts";
import useVendorHook from "@/modules/vendor/domain/hooks/useVendorHook";

export default function Page() {
  const { vendorUuid } = useLocalSearchParams<{
    vendorUuid: string | string[];
  }>();
  const { vendorTopProducts } = useVendorHook(vendorUuid?.toString());

  return (
    <SafeAreaWrapper>
      <TopBar className={`flex-row items-center justify-between px-2 py-5`} />
      <VendorBanner vendorUuid={vendorUuid.toString()} />
      <VendorTopProducts queryResult={vendorTopProducts} />
    </SafeAreaWrapper>
  );
}
