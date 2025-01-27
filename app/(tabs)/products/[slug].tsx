import { Animated, Platform, Text } from "react-native";
import Header from "@/components/home/Header";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { popularItemsData } from "@/constants/popularItemsData";
import { ItemProps } from "@/components";
import ProductScreenContainer from "@/components/product/ProductScreenContainer";
import ProductGenericDetails from "@/components/product/ProductGenericDetails";
import ProductDeliveryDetails from "@/components/product/ProductDeliveryDetails";
import ProductReviewBox from "@/components/product/ProductReviewBox";
import AskQuestionBox from "@/components/product/AskQuestionBox";
import TopSellingComponent from "@/components/product/TopSellingComponent";
import ProductVendorDetails from "@/components/product/ProductVendorDetails";
import ProductDescription from "@/components/product/ProductDescription";
import ProductSlider from "@/components/product/ProductSlider";
import { getById } from "@/utils/getById";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductSpecification from "@/components/product/ProductSpecification";
import BottomActionView from "@/components/common/BottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ProductPageBottomView from "@/components/product/ProductPageBottomView";
import VoucherList from "@/components/cart/checkout/VoucherList";
import ScrollView = Animated.ScrollView;

export default function ProductScreen() {
  const { slug } = useLocalSearchParams();
  const [product] = useState<ItemProps | undefined>(
    getById(slug.toString(), popularItemsData),
  );
  const ios = Platform.OS === "ios";

  if (!product) return <Text>Loading...</Text>;
  return (
    <SafeAreaWrapper>
      <Header
        className={`mx-4 my-6 flex-row items-center justify-between gap-3`}
      />
      <ContentWrapper
        className={`flex-1 bg-orange-600` + (ios ? " pb-2" : " pt-3")}
      >
        <ScrollView style={{ width: "100%" }}>
          <ProductScreenContainer>
            <ProductSlider />
            <ProductGenericDetails item={product} />
            <VoucherList className="border-gray-400" />
            <ProductDeliveryDetails />
            <ProductReviewBox />
            <AskQuestionBox />
            <TopSellingComponent />
            <ProductVendorDetails />
            <ProductDescription />
            <ProductSpecification />
            <RelatedProducts />
          </ProductScreenContainer>
        </ScrollView>
      </ContentWrapper>
      <BottomActionView className="gap-y-3 p-3">
        <ProductPageBottomView />
      </BottomActionView>
    </SafeAreaWrapper>
  );
}
