import React from "react";
import { Box, Image, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

const topSellingItems = [
  {
    image: require("@/assets/products/product.png"),
    name: "Ultima watch circle 2.0 smartwatch",
    price: "Rs. 3,499",
  },
  {
    image: require("@/assets/products/product.png"),
    name: "Ultima watch circle 2.0 smartwatch",
    price: "Rs. 3,499",
  },
  {
    image: require("@/assets/products/product.png"),
    name: "Ultima watch circle 2.0 smartwatch",
    price: "Rs. 3,499",
  },
] as const;

const TopSellingComponent = () => {
  const theme = useBazarifyTheme();

  return (
    <Box padding="lg">
      <Box
        id="top-selling-info"
        gap="md"
        borderRadius="xl"
        paddingX="md"
        paddingY="sm"
        style={{ borderColor: theme.colors.borderStrong, borderWidth: 1 }}
      >
        <Text variant="title">Top Selling Products</Text>
        {topSellingItems.map((item, index) => (
          <Box
            key={`${item.name}-${index}`}
            direction="row"
            align="center"
            justify="space-between"
            gap="md"
          >
            <Box direction="row" align="center" gap="md" flex={1}>
              <Image source={item.image} size={40} radius="sm" />
              <Text variant="body" numberOfLines={2}>
                {item.name}
              </Text>
            </Box>
            <Text variant="bodyMedium" color="primary">
              {item.price}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopSellingComponent;
