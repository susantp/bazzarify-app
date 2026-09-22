import React, { ReactNode } from "react";
import Svg, { Path } from "react-native-svg";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export const DiscountBannerIcon = () => (
  <Svg width="51" height="32" viewBox="0 0 51 32" fill="none">
    <Path
      d="M26.5225 2.25468V4.95151C26.5225 5.25266 26.7632 5.49858 27.0643 5.50498L50.1322 5.99579C50.4612 6.00279 50.5254 5.53227 50.2065 5.45085L29.2847 0.109111C27.8844 -0.248406 26.5225 0.809484 26.5225 2.25468Z"
      fill="#A73C09"
    />
    <Path
      d="M3.27146 5.49347H31.2282H50.3273C50.6331 5.49347 50.8809 5.74132 50.8809 6.04707V27.3606C50.8809 29.8066 48.8981 31.7894 46.4522 31.7894H31.2282H3.68666C1.92863 31.7894 0.503471 30.3642 0.503471 28.6062C0.503471 26.8482 1.92863 25.423 3.68666 25.423H6.31626C7.6921 25.423 8.80745 24.3077 8.80745 22.9318C8.80745 21.556 7.69211 20.4406 6.31626 20.4406H5.34746C4.04805 20.4406 2.99466 19.3873 2.99466 18.0878C2.99466 16.7884 4.04805 15.735 5.34746 15.735H6.45466C7.75407 15.735 8.80745 14.6817 8.80745 13.3823C8.80745 12.0828 7.75407 11.0295 6.45466 11.0295H3.27146C1.74274 11.0295 0.503471 9.79018 0.503471 8.26146C0.503471 6.73274 1.74274 5.49347 3.27146 5.49347Z"
      fill="#F75405"
    />
  </Svg>
);
const ProductGenericDetails = ({
  item,
  children,
}: {
  item: TProductWithVariantAndImage;
  children: ReactNode;
}) => {
  const theme = useBazarifyTheme();

  return (
    <Box paddingX="lg">
      <Box id="product-title" paddingY="sm">
        <Text variant="heading">{item.name}</Text>
      </Box>

      <Box id="rating-info" direction="row" justify="space-between">
        <Box id="reviews" direction="row" align="center" gap="xs">
          {(["star", "star", "star", "star", "star-outline"] as const).map(
            (name, index) => (
              <Icon key={`${name}-${index}`} size={20} color="primary">
                {({ color, size }) => (
                  <Ionicons name={name} size={size} color={color} />
                )}
              </Icon>
            ),
          )}
          <Text>512</Text>
        </Box>

        <Box id="authenticity" direction="row" align="center" gap="sm">
          <Text variant="bodyMedium" color="primary">
            100% Authentic
          </Text>
          <Icon size={23} color="primary">
            {({ color, size }) => (
              <Ionicons name="shield-checkmark" color={color} size={size} />
            )}
          </Icon>
        </Box>
      </Box>

      <Box
        id="price-info"
        gap="sm"
        borderRadius="xl"
        paddingX="md"
        paddingY="sm"
        style={{ borderColor: theme.colors.borderStrong, borderWidth: 1 }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ProductGenericDetails;
