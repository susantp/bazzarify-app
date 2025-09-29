import { Animated, Platform } from "react-native";
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
import ProductSlider from "@/modules/product/components/ProductSlider";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductSpecification from "@/components/product/ProductSpecification";
import BottomActionView from "@/components/common/BottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ProductPageBottomView from "@/components/product/ProductPageBottomView";
import VoucherList from "@/components/cart/checkout/VoucherList";
import useProductScreen from "@/modules/product/hooks/useProductScreen";
import ProductCouponDiscountInfo from "@/modules/product/components/ProductCouponDiscountInfo";
import ProductPriceComponent from "@/modules/product/components/ProductPriceComponent";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import ProductVariantSelector from "@/modules/product/components/ProductVariantSelector";
import useCart from "@/modules/cart/hooks/useCart";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";
import FetchingErrorComponent from "@/modules/core/components/FetchingErrorComponent";
import ScrollView = Animated.ScrollView;

export default function ProductScreen() {
  const { uuid } = useLocalSearchParams();
  const token = useAtomValue(tokenAtom);
  console.log("product page: ", token);
  const { product, currency, selectedVariant, handleVariantChange, isError } =
    useProductScreen(uuid as string);
  const { handleAddToCart } = useCart();
  const ios = Platform.OS === "ios";

  return (
    <SafeAreaWrapper>
      <TopBar
        className={`mx-4 my-6 flex-row items-center justify-between gap-3`}
      />
      {isError ? (
        <FetchingErrorComponent message="Sorry, something went wrong fetching the product." />
      ) : product && currency ? (
        <>
          <ContentWrapper className={`flex-1 ` + (ios ? " pb-2" : " pt-3")}>
            <ScrollView style={{ width: "100%" }}>
              <ProductScreenContainer>
                <ProductSlider item={product} />
                {/*<SpecialSaleBanner item={product} />*/}
                <ProductGenericDetails item={product}>
                  <ProductPriceComponent
                    item={product}
                    currency={currency}
                    selectedVariant={selectedVariant}
                  />
                  {product?.variants && product.variants.length > 0 && (
                    <ProductVariantSelector
                      selectedVariant={selectedVariant}
                      variants={product.variants}
                      onPress={handleVariantChange}
                    />
                  )}
                  <ProductCouponDiscountInfo />
                </ProductGenericDetails>
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
          {token && (
            <BottomActionView className="gap-y-3 p-3">
              <ProductPageBottomView
                onCartAdd={() => handleAddToCart(product, selectedVariant)}
              />
            </BottomActionView>
          )}
        </>
      ) : (
        <ThemedLoader />
      )}
    </SafeAreaWrapper>
  );
}
