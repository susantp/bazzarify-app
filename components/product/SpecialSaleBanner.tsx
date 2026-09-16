import { formatDistance } from "date-fns";
import { View } from "react-native";
import StyledText from "@/components/common/StyledText";
import React from "react";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";

type SpecialSale = {
  discount: number;
  discountType: "flat" | "percent";
  endDate: string;
  name: string;
};

type SpecialSaleProduct = TProductWithVariantAndImage & {
  specialSale?: SpecialSale;
  price?: number;
};

const SpecialSaleBanner = ({ item }: { item: SpecialSaleProduct }) => {
  if (!item.specialSale) return null;
  const sale = item.specialSale;
  const price = item.price ?? item.base_price;
  const timeDistance = formatDistance(new Date(sale.endDate), new Date());
  return (
    <View className="w-screen flex-row bg-orange-600 p-2">
      <View className="w-6/12 flex-col gap-y-1">
        <StyledText className="text-sm text-white">{sale.name}</StyledText>
        <StyledText className="text-2xl font-bold text-white">
          {sale.discountType === "flat" && price - sale.discount}
          {sale.discountType === "percent" &&
            `Rs. ${(price - price * (sale.discount / 100)).toFixed()}`}
        </StyledText>
        <View className="flex-row gap-x-2">
          <StyledText className="text-white line-through">
            Rs. {price}
          </StyledText>
          <StyledText className="font-bold text-white">
            -
            {sale.discountType === "flat"
              ? `Rs. ${sale.discount}`
              : `${sale.discount}%`}
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
