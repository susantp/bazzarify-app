import React from "react";
import { StyleSheet } from "react-native";
import { Box, Icon, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface DeliveryMileStonesProps {
  currentStatus?: string;
}

const getStatusStep = (currentStatus?: string) => {
  const status = (currentStatus || "").toLowerCase().trim();
  if (!status) {
    return -1;
  }
  const byBackendCode: Record<string, number> = {
    draft: 0,
    confirmed: 0,
    allocated: 1,
    partially_shipped: 2,
    shipped: 2,
    delivered: 3,
    completed: 3,
    canceled: -1,
    returned: -1,
  };
  if (Object.hasOwn(byBackendCode, status)) {
    return byBackendCode[status];
  }

  // Fallback for unexpected values from legacy payloads.
  const relaxed = status.replaceAll("_", " ");
  if (relaxed.includes("cancel") || relaxed.includes("return")) return -1;
  if (relaxed.includes("deliver") || relaxed.includes("complete")) return 3;
  if (relaxed.includes("ship") || relaxed.includes("logistic")) return 2;
  if (relaxed.includes("pack") || relaxed.includes("allocat")) return 1;
  return 0;
};

const DeliveryMileStones = ({ currentStatus }: DeliveryMileStonesProps) => {
  const theme = useBazarifyTheme();
  const activeStep = getStatusStep(currentStatus);
  const isActive = (step: number) => activeStep >= 0 && step <= activeStep;
  const milestones = [
    {
      label: "Processing",
      icon: (color: string) => (
        <MaterialCommunityIcons name="archive-clock" size={24} color={color} />
      ),
    },
    {
      label: "Packed",
      icon: (color: string) => (
        <Feather name="package" size={24} color={color} />
      ),
    },
    {
      label: "Shipped",
      icon: (color: string) => (
        <FontAwesome5 name="shipping-fast" size={24} color={color} />
      ),
    },
    {
      label: "Delivered",
      icon: (color: string) => (
        <MaterialIcons name="done" size={24} color={color} />
      ),
    },
  ];

  return (
    <Box direction="row" justify="space-between" gap="sm">
      <Box
        style={[
          styles.connector,
          {
            borderColor:
              activeStep >= 0 ? theme.colors.primary : theme.colors.textMuted,
          },
        ]}
      />
      {milestones.map((milestone, index) => {
        const active = isActive(index);
        return (
          <Box
            key={milestone.label}
            align="center"
            justify="center"
            gap="sm"
            style={styles.milestone}
          >
            <Box
              align="center"
              justify="center"
              padding="lg"
              borderRadius="pill"
              style={{
                backgroundColor: active
                  ? theme.colors.primary
                  : theme.colors.textMuted,
              }}
            >
              <Icon size={24} color="textInverted">
                {({ color }) => milestone.icon(color)}
              </Icon>
            </Box>
            <Text
              variant="caption"
              color={active ? "text" : "textMuted"}
              align="center"
            >
              {milestone.label}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  connector: {
    borderStyle: "dashed",
    borderTopWidth: 1,
    left: 16,
    position: "absolute",
    right: 8,
    top: 28,
  },
  milestone: { flex: 1 },
});

export default DeliveryMileStones;
