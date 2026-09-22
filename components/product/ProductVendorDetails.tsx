import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

const ProductVendorDetails = () => {
  const theme = useBazarifyTheme();

  return (
    <Box padding="lg">
      <Box
        id="vendor-info"
        gap="md"
        borderRadius="xl"
        paddingX="md"
        paddingY="md"
        style={{ borderColor: theme.colors.borderStrong, borderWidth: 1 }}
      >
        <Box
          direction="row"
          align="center"
          justify="space-between"
          paddingX="xxl"
        >
          <Box>
            <Text variant="title">Ultima</Text>
            <Box direction="row" align="center" gap="xs">
              <Icon size={18} color="primary">
                {({ color, size }) => (
                  <Ionicons name="shield-checkmark" size={size} color={color} />
                )}
              </Icon>
              <Text variant="body" color="primary">
                100% Authentic
              </Text>
            </Box>
          </Box>
          <Box direction="row" align="center" gap="sm">
            <Icon size={18} color="text">
              {({ color, size }) => (
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={size}
                  color={color}
                />
              )}
            </Icon>
            <Text variant="title">Chat</Text>
          </Box>
        </Box>
        <Box direction="row">
          {[
            ["Trusted seller status", "80%"],
            ["Accurate delivery timing", "100%"],
            ["Chat response", "70%"],
          ].map(([label, value]) => (
            <Box
              key={label}
              flex={1}
              gap="md"
              padding="lg"
              style={[
                styles.metric,
                { borderColor: theme.colors.borderStrong },
              ]}
            >
              <Text variant="bodyCompact">{label}</Text>
              <Text variant="title" align="center">
                {value}
              </Text>
            </Box>
          ))}
        </Box>
        <Box align="center">
          <Text
            variant="bodyMedium"
            color="primary"
            onPress={() => router.push("/vendor/demoVendor")}
          >
            Visit Store
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const styles = { metric: { borderWidth: 1 } };

export default ProductVendorDetails;
