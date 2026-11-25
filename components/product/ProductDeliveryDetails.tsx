import type { ReactNode } from "react";
import { Pressable } from "react-native";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { formatUserAddress } from "@/modules/user/utils/address";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Box, Icon, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

const ProductDeliveryDetails = ({
  onChangeAddress,
  selectedAddress,
  children,
}: {
  onChangeAddress: () => void;
  selectedAddress: TUserAddress | null;
  children?: ReactNode;
}) => {
  const theme = useBazarifyTheme();
  return (
    <Box padding="lg">
      <Box
        id="delivery-info"
        gap="md"
        borderRadius="xl"
        padding="lg"
        style={{ borderColor: theme.colors.borderStrong, borderWidth: 1 }}
      >
        <Text variant="title">Delivery</Text>
        <Box direction="row" justify="space-between">
          <Box direction="row" align="center" gap="sm" flex={1}>
            <Icon size={28}>
              {({ color, size }) => (
                <Ionicons name="location-outline" size={size} color={color} />
              )}
            </Icon>
            <Text
              style={{ width: 200 }}
              lineBreakMode="clip"
              numberOfLines={2}
              variant="bodyCompactMedium"
            >
              {selectedAddress
                ? formatUserAddress(selectedAddress)
                : "Select your address"}
            </Text>
          </Box>
          <Pressable onPress={onChangeAddress} accessibilityRole="button">
            <Box
              backgroundColor="primary"
              borderRadius="pill"
              paddingX="sm"
              paddingY="xs"
            >
              <Text color="textInverted" variant="bodyCompactMedium">
                Change
              </Text>
            </Box>
          </Pressable>
        </Box>
        <Box direction="row" justify="space-between">
          <Box direction="row" align="center" gap="sm">
            <Icon size={28}>
              {({ color, size }) => (
                <Ionicons name="arrow-undo-outline" size={size} color={color} />
              )}
            </Icon>
            <Text variant="bodyMedium">14 days free returns</Text>
          </Box>
        </Box>
        <Box direction="row" justify="space-between">
          <Box direction="row" align="center" gap="sm">
            <Icon size={28}>
              {({ color, size }) => (
                <Ionicons
                  name="shield-checkmark-outline"
                  size={size}
                  color={color}
                />
              )}
            </Icon>
            <Text variant="bodyMedium">1 year brand seller warranty</Text>
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  );
};
export default ProductDeliveryDetails;
