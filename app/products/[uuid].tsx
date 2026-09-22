import { Animated, Platform, StyleSheet } from "react-native";
import TopBar from "@/components/home/TopBar";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import ProductScreenContainer from "@/components/product/ProductScreenContainer";
import ProductGenericDetails from "@/components/product/ProductGenericDetails";
import ProductDeliveryDetails from "@/components/product/ProductDeliveryDetails";
import ProductDescription from "@/components/product/ProductDescription";
import ProductSlider from "@/modules/product/components/ProductSlider";
import ProductSpecification from "@/components/product/ProductSpecification";
import BottomActionView from "@/modules/core/components/BottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ProductPageBottomView from "@/modules/core/components/ProductPageBottomView";
import useProductScreen from "@/modules/product/hooks/useProductScreen";
import ProductCouponDiscountInfo from "@/modules/product/components/ProductCouponDiscountInfo";
import ProductPriceComponent from "@/modules/product/components/ProductPriceComponent";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import ProductVariantSelector from "@/modules/product/components/ProductVariantSelector";
import useCartHook from "@/modules/cart/hooks/useCartHook";
import FetchingErrorComponent from "@/modules/core/components/FetchingErrorComponent";
import { useAtom, useAtomValue } from "jotai";
import { selectedDeliveryAddress } from "@/modules/cart/atoms";
import { getDefaultAddressAtom } from "@/modules/user/atoms/addresessAtom";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import DeliveryAddressPicker from "@/modules/user/components/DeliveryAddressPicker";
import ScrollView = Animated.ScrollView;

export default function ProductScreen() {
  const { uuid } = useLocalSearchParams();
  const {
    product,
    currency,
    selectedVariant,
    handleVariantChange,
    selectedVariantAvailableToSell,
    selectedVariantCanSell,
    requiresCustomerSelection,
    hasConcreteSku,
    isError,
  } = useProductScreen(uuid as string);
  const { handleAddToCart } = useCartHook();
  const ios = Platform.OS === "ios";
  const [showAddressModal, setShowAddressModal] = useAtom(addressModalAtom);
  const selectedAddress = useAtomValue(selectedDeliveryAddress);
  const defaultAddress = useAtomValue(getDefaultAddressAtom);
  const displayAddress = selectedAddress || defaultAddress;
  const handleOpenAddress = () => setShowAddressModal(true);
  return (
    <SafeAreaWrapper>
      <TopBar style={styles.productTopBar} />
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
                  {requiresCustomerSelection &&
                  product?.variants &&
                  product.variants.length > 1 ? (
                    <ProductVariantSelector
                      selectedVariant={selectedVariant}
                      variants={product.variants}
                      onPress={handleVariantChange}
                    />
                  ) : null}
                  <ProductCouponDiscountInfo />
                </ProductGenericDetails>
                {/*<VoucherList className="border-gray-400 px-4" />*/}
                <ProductDeliveryDetails
                  selectedAddress={displayAddress}
                  onChangeAddress={handleOpenAddress}
                />
                {/*<ProductReviewBox />*/}
                {/*<AskQuestionBox />*/}
                {/*<TopSellingComponent />*/}
                {/*<ProductVendorDetails />*/}
                <ProductDescription product={product} />
                <ProductSpecification product={product} />
                {/*<RelatedProducts />*/}
              </ProductScreenContainer>
            </ScrollView>
          </ContentWrapper>
          <BottomActionView style={{ gap: 12, padding: 12 }}>
            <ProductPageBottomView
              onCartAdd={() => handleAddToCart(product, selectedVariant)}
              canPurchase={selectedVariantCanSell}
              inventoryMessage={
                !hasConcreteSku
                  ? "Unavailable"
                  : selectedVariant
                    ? selectedVariantCanSell
                      ? `${selectedVariantAvailableToSell} available for this option`
                      : "This option is currently unavailable"
                    : requiresCustomerSelection
                      ? "Select an option before purchasing"
                      : "Unavailable"
              }
              onStorePress={() =>
                product?.user_uuid &&
                router.push({
                  pathname: "/vendor/[vendorUuid]",
                  params: { vendorUuid: product?.user_uuid },
                })
              }
            />
          </BottomActionView>
          <DemoModalComponent
            type="bottom"
            showModal={showAddressModal}
            handlePress={() => setShowAddressModal(false)}
          >
            <DeliveryAddressPicker onClose={() => setShowAddressModal(false)} />
          </DemoModalComponent>
        </>
      ) : (
        <ThemedLoader />
      )}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  productTopBar: {
    gap: 12,
    padding: 16,
  },
});
