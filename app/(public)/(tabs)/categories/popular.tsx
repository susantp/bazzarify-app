import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Box, Icon } from "@/components/design-system";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  return (
    <SafeAreaWrapper>
      <Box
        direction="row"
        align="center"
        justify="space-between"
        style={styles.header}
      >
        <ScreenHeader title="Popular Items" />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Filter popular items"
        >
          <Icon size={24} color="surface">
            {({ color, size }) => (
              <Ionicons
                name="options"
                size={size}
                color={color}
                style={styles.rotatedIcon}
              />
            )}
          </Icon>
        </Pressable>
      </Box>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  header: { paddingRight: 12 },
  rotatedIcon: { transform: [{ rotate: "90deg" }] },
});
