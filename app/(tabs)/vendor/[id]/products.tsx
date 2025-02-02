import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { router } from "expo-router";
import ContentWrapper from "@/components/common/ContentWrapper";
import React from "react";
import VendorHeader, { vendorData } from "@/components/vendor/VendorBanner";
import { popularItemsData } from "@/constants/popularItemsData";
import ContentGridSection from "@/components/home/ContentGridSection";
import SectionHeader from "@/components/home/SectionHeader";

export default function Page() {
  const vendor = vendorData;
  const canGoBack = router.canGoBack();
  return (
    <SafeAreaWrapper>
      <VendorHeader canGoBack={canGoBack} vendor={vendor} />
      <ContentWrapper>
        <ContentGridSection
          className="align-center flex-col bg-white py-2.5"
          title={"Popular Items"}
          items={popularItemsData}
          horizontal={false}
          cols={2}
        >
          <SectionHeader title="All Products" />
        </ContentGridSection>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
