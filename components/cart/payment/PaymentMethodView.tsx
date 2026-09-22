import { Box, Icon, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { PaymentMethodType } from "@/hooks/usePaymentScreenHook";
import { Href, Link } from "expo-router";
import { ConnectIPSIcon, ImePayIcon } from "@/components/common/icons";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import React from "react";

export interface PaymentMethodViewProps {
  method: PaymentMethodType;
  pathName: Href;
}

const PaymentMethodView = ({ method, pathName }: PaymentMethodViewProps) => {
  const theme = useBazarifyTheme();

  return (
    <Link href={pathName} asChild={true}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={method.name}
        style={[styles.row, { borderBottomColor: theme.colors.borderStrong }]}
      >
        <Box direction="row" align="center" gap="sm">
          <Icon size={24} color="primary">
            {({ color, size }) => {
              if (method.id === "imePay") return <ImePayIcon />;
              if (method.id === "connectIPS") return <ConnectIPSIcon />;
              if (method.id === "cod") {
                return (
                  <Ionicons name="cash-outline" size={size} color={color} />
                );
              }
              return (
                <MaterialCommunityIcons
                  name="credit-card-outline"
                  size={size}
                  color={color}
                />
              );
            }}
          </Icon>
          <Text variant="body">{method.name}</Text>
        </Box>
        <Icon size={20} accessibilityLabel="Open payment method">
          {({ color, size }) => (
            <Ionicons name="chevron-forward" size={size} color={color} />
          )}
        </Icon>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});

export default PaymentMethodView;
