import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import ScreenHeader from "@/components/common/ScreenHeader";

interface Props {
  onAddressButtonPress: () => void;
}
const CartHeader = ({ onAddressButtonPress }: Props) => {
  const theme = useBazarifyTheme();

  return (
    <Box direction="row" justify="space-between">
      <Box style={styles.title}>
        <ScreenHeader title="My Cart" />
      </Box>
      <Box
        direction="row"
        align="center"
        justify="flex-end"
        gap="lg"
        backgroundColor="primary"
        paddingX="sm"
        style={styles.actions}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Choose delivery address"
          onPress={onAddressButtonPress}
        >
          <Text
            variant="caption"
            color="primary"
            style={[
              styles.addressAction,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            Choose delivery address
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  title: { width: "25%" },
  actions: { width: "75%" },
  addressAction: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default CartHeader;
