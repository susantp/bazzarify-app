import React, { useState } from "react";
import { Pressable } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import {
  Box,
  Icon,
  Image,
  PageContent,
  Text,
} from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export default function Page() {
  const theme = useBazarifyTheme();
  const [selectedDiscount, setSelectedDiscount] = useState("50%");
  const handleSelectDiscount = (discount: string) =>
    setSelectedDiscount(discount);
  const discountList = ["All", "10%", "20%", "30%", "40%", "50%"];
  return (
    <SafeAreaWrapper>
      <ScreenHeader
        title="Flash Deal"
        iconColor={theme.colors.primary}
        titleColor={theme.colors.primary}
      />
      <PageContent backgroundColor="surface">
        <BubbleDesign />
        <Box
          direction="row"
          align="center"
          justify="space-between"
          paddingX="sm"
        >
          <Text variant="title">Choose your discount</Text>
          <DealTimer />
        </Box>
        <Box padding="md">
          <DiscountSelection
            selectedDiscount={selectedDiscount}
            discounts={discountList}
            onSelectDiscount={handleSelectDiscount}
          />
        </Box>
        <Box
          direction="row"
          justify="space-between"
          paddingX="sm"
          paddingY="xxl"
        >
          <Text variant="title" color="primary">
            {selectedDiscount === "All" ? "" : `${selectedDiscount} Discount`}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Filter flash deals"
          >
            <Icon size={28} color="primary">
              {({ color, size }) => (
                <Ionicons
                  name="options"
                  size={size}
                  color={color}
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
              )}
            </Icon>
          </Pressable>
        </Box>
      </PageContent>
    </SafeAreaWrapper>
  );
}

interface DiscountSelectionProps {
  discounts: string[];
  onSelectDiscount: (discount: string) => void;
  selectedDiscount: string;
}

const DiscountSelection = ({
  discounts,
  onSelectDiscount,
  selectedDiscount,
}: DiscountSelectionProps) => {
  const theme = useBazarifyTheme();

  return (
    <Box
      direction="row"
      align="center"
      justify="space-between"
      backgroundColor="surfaceMuted"
      padding="xs"
      borderRadius="lg"
    >
      {discounts.map((discount) => (
        <Pressable
          key={discount}
          accessibilityRole="button"
          accessibilityLabel={discount}
          style={({ pressed }) => ({
            borderColor:
              selectedDiscount === discount
                ? theme.colors.primary
                : "transparent",
            borderRadius: theme.radii.pill,
            borderWidth: selectedDiscount === discount ? 2 : 0,
            opacity: pressed ? 0.8 : 1,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
          })}
          onPress={() => onSelectDiscount(discount)}
        >
          <Text variant="bodyMedium">{discount}</Text>
        </Pressable>
      ))}
    </Box>
  );
};
const DealTimer = () => (
  <Box direction="row" align="center" gap="sm">
    <Icon size={28} color="primary">
      {({ color, size }) => (
        <Entypo name="stopwatch" size={size} color={color} />
      )}
    </Icon>
    <Box backgroundColor="surface" padding="sm" borderRadius="lg">
      <Text variant="bodyMedium">00</Text>
    </Box>
    <Box backgroundColor="surface" padding="sm" borderRadius="lg">
      <Text variant="bodyMedium">36</Text>
    </Box>
    <Box backgroundColor="surface" padding="sm" borderRadius="lg">
      <Text variant="bodyMedium">58</Text>
    </Box>
  </Box>
);
const BubbleDesign = () => (
  <Box>
    <Image
      source={require("@/assets/images/flashDeal/bubble00.png")}
      radius="none"
      style={{ position: "absolute", top: -80, left: 100 }}
    />
    <Image
      source={require("@/assets/images/flashDeal/bubble01.png")}
      radius="none"
      style={{
        position: "absolute",
        top: -80,
        left: 50,
        transform: [{ rotateY: "50deg" }],
      }}
    />
  </Box>
);
