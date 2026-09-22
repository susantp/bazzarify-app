import React from "react";
import { formatDistance } from "date-fns";
import { Box, Text } from "@/components/design-system";
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
  const discountedPrice =
    sale.discountType === "flat"
      ? price - sale.discount
      : price - price * (sale.discount / 100);

  return (
    <Box direction="row" backgroundColor="primary" padding="sm">
      <Box gap="xs" style={{ width: "50%" }}>
        <Text color="textInverted" variant="bodyCompact">
          {sale.name}
        </Text>
        <Text color="textInverted" variant="heading">
          {sale.discountType === "flat"
            ? discountedPrice
            : `Rs. ${discountedPrice.toFixed()}`}
        </Text>
        <Box direction="row" gap="sm">
          <Text
            color="textInverted"
            style={{ textDecorationLine: "line-through" }}
          >
            Rs. {price}
          </Text>
          <Text color="textInverted" variant="bodyMedium">
            -
            {sale.discountType === "flat"
              ? `Rs. ${sale.discount}`
              : `${sale.discount}%`}
          </Text>
        </Box>
      </Box>
      <Box align="flex-end" justify="flex-end" style={{ width: "50%" }}>
        <Text color="textInverted" variant="title" align="right">
          Ends in {timeDistance}
        </Text>
      </Box>
    </Box>
  );
};

export default SpecialSaleBanner;
