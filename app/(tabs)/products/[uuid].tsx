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
import ProductSlider from "@/components/product/ProductSlider";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductSpecification from "@/components/product/ProductSpecification";
import BottomActionView from "@/components/common/BottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ProductPageBottomView from "@/components/product/ProductPageBottomView";
import VoucherList from "@/components/cart/checkout/VoucherList";
import SpecialSaleBanner from "@/components/product/SpecialSaleBanner";
import useProductScreen from "@/modules/product/hooks/useProductScreen";
import ProductCouponDiscountInfo from "@/modules/product/components/ProductCouponDiscountInfo";
import ProductPriceComponent from "@/modules/product/components/ProductPriceComponent";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { CartType } from "@/modules/cart/atoms/cartState";
import ProductVariantSelector from "@/modules/product/components/ProductVariantSelector";
import ScrollView = Animated.ScrollView;

export default function ProductScreen() {
  const { uuid } = useLocalSearchParams();
  const { product, selectedVariant, handleVariantChange } = useProductScreen(
    uuid as string,
  );
  const ios = Platform.OS === "ios";
  const handleAddToCart = () => {
    if (!product) return;
    const cartItem: CartType = {
      productUUID: product.uuid,
      name: product.name,
      quantity: 1,
      unitPrice: selectedVariant
        ? selectedVariant.price.amount
        : product.base_price.amount,
    };
    if (selectedVariant) {
      cartItem.variantAttributeName = selectedVariant.name;
      cartItem.variantUUID = selectedVariant.uuid;
    }
    console.log(cartItem, selectedVariant?.price);
  };
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
                <ProductSlider item={product} />
                <SpecialSaleBanner item={product} />
                <ProductGenericDetails item={product}>
                  <ProductPriceComponent
                    item={product}
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
          <BottomActionView className="gap-y-3 p-3">
            <ProductPageBottomView onCartAdd={handleAddToCart} />
          </BottomActionView>
        </>
      ) : (
        <ThemedLoader />
      )}
    </SafeAreaWrapper>
  );
}
