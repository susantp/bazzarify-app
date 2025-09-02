import { formatDistance } from "date-fns";
import { View } from "react-native";
import StyledText from "@/components/common/StyledText";
import React from "react";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";

const SpecialSaleBanner = ({ item }: { item: TProductWithVariantAndImage }) => {
  if (!item.specialSale) return <></>;
  const { specialSale, price } = item;
  const timeDistance = formatDistance(
    new Date(specialSale.endDate),
    new Date(),
  );
  return (
    <View className="w-screen flex-row bg-orange-600 p-2">
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
export default SpecialSaleBanner;
