import { Animated, Platform, Text, View } from "react-native";
import TopBar from "@/components/home/TopBar";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductSpecification from "@/components/product/ProductSpecification";
import BottomActionView from "@/components/common/BottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ProductPageBottomView from "@/components/product/ProductPageBottomView";
import VoucherList from "@/components/cart/checkout/VoucherList";
import { getById } from "@/utils/getById";
import StyledText from "@/components/common/StyledText";
import { formatDistance } from "date-fns";
import ScrollView = Animated.ScrollView;

export default function ProductScreen() {
  const { slug } = useLocalSearchParams();
  const [product, setProduct] = useState<ItemProps | undefined>(
    getById(slug.toString(), popularItemsData),
  );
  useEffect(() => {
    setProduct(getById(slug.toString(), popularItemsData));
  }, [slug]);

  const ios = Platform.OS === "ios";

  if (!product) return <Text>Loading...</Text>;
  return (
    <SafeAreaWrapper>
      <TopBar
        className={`mx-4 my-6 flex-row items-center justify-between gap-3`}
      />
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
    </SafeAreaWrapper>
  );
}

const SpecialSaleBanner = ({ item }: { item: ItemProps }) => {
  if (!item.specialSale) return <></>;
  const { specialSale, price } = item;
  const timeDistance = formatDistance(
    new Date(specialSale.endDate),
    new Date(),
  );
  return (
    <View className="w-screen flex-row bg-green-700 p-2">
      <View className="w-6/12 flex-col gap-y-1">
        <StyledText className="text-sm text-white">
          {specialSale?.name}
        </StyledText>
        <StyledText className="text-2xl font-bold text-white">
          {specialSale?.discountType === "flat" && price - specialSale.discount}
          {specialSale?.discountType === "percent" &&
            `Rs. ${(price - price * (specialSale?.discount / 100)).toFixed()}`}
        </StyledText>
        <View className="flex-row gap-x-2">
          <StyledText className="text-white line-through">
            Rs. {price}
          </StyledText>
          <StyledText className="font-bold text-white">
            -
            {specialSale?.discountType === "flat"
              ? `Rs. ${specialSale.discount}`
              : `${specialSale?.discount}%`}
          </StyledText>
        </View>
      </View>
      <View className="w-6/12 flex-row items-end justify-end">
        <StyledText className="text-lg font-semibold text-white">
          Ends in {timeDistance}
        </StyledText>
      </View>
    </View>
  );
};
