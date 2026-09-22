import { Platform, StyleSheet } from "react-native";
import React from "react";
import { Link, type Href } from "expo-router";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export interface SectionHeaderProps {
  title: string;
  showSeeMoreBtn?: boolean;
  seeMorePath?: Href;
  testID?: string;
}

const SectionHeader = ({ title, seeMorePath, testID }: SectionHeaderProps) => {
  const theme = useBazarifyTheme();

  return (
    <Box
      testID={testID}
      direction="row"
      align="center"
      justify="space-between"
      paddingX="sm"
      style={[styles.container, { marginBottom: theme.spacing.sm }]}
    >
      <Text
        variant="heading"
        color="primary"
        style={styles.title}
        numberOfLines={1}
      >
        {title}
      </Text>
      {seeMorePath ? (
        <Link href={seeMorePath}>
          <Text variant="link" style={styles.seeMore}>
            See More
          </Text>
        </Link>
      ) : null}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  seeMore: { fontFamily: "Poppins_200ExtraLight_Italic" },
  title: {
    flex: 1,
    fontFamily: Platform.select({
      android: "Poppins_600SemiBold",
      ios: "Poppins_SemiBold",
    }),
  },
});

export default SectionHeader;
