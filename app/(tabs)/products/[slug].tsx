import { ActivityIndicator, Animated, Platform } from "react-native";
import TopBar from "@/components/home/TopBar";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import ProductScreenContainer from "@/components/product/ProductScreenContainer";
import ProductGenericDetails from "@/components/product/ProductGenericDetails";
import ProductDeliveryDetails from "@/components/product/ProductDeliveryDetails";
import ProductReviewBox from "@/components/product/ProductReviewBox";
import AskQuestionBox from "@/components/product/AskQuestionBox";
import TopSellingComponent from "@/components/product/TopSellingComponent";
import ProductVendorDetails from "@/components/product/ProductVendorDetails";
import ProductDescription from "@/components/product/ProductDescription";
import ProductSlider from "@/components/product/ProductSlider";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductSpecification from "@/components/product/ProductSpecification";
import BottomActionView from "@/components/common/BottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ProductPageBottomView from "@/components/product/ProductPageBottomView";
import VoucherList from "@/components/cart/checkout/VoucherList";
import SpecialSaleBanner from "@/components/product/SpecialSaleBanner";
import { useQuery } from "@tanstack/react-query";
import getProductBySlug from "@/modules/product/services/product/getProductBySlug";
import ScrollView = Animated.ScrollView;

export default function ProductScreen() {
  const { slug } = useLocalSearchParams();
  const { data: product } = useQuery({
    queryFn: () => getProductBySlug(slug.toString()),
    queryKey: ["product", slug],
  });
  const ios = Platform.OS === "ios";
  return (
    <SafeAreaWrapper>
      <TopBar
        className={`mx-4 my-6 flex-row items-center justify-between gap-3`}
      />
      {product ? (
        <>
          <ContentWrapper className={`flex-1 ` + (ios ? " pb-2" : " pt-3")}>
            <ScrollView style={{ width: "100%" }}>
              <ProductScreenContainer>
                <ProductSlider />
                <SpecialSaleBanner item={product} />
                <ProductGenericDetails item={product} />
                <VoucherList className="border-gray-400 px-4" />
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
        </>
      ) : (
        <ActivityIndicator size="large" color="#ffffff" />
      )}
    </SafeAreaWrapper>
  );
}
