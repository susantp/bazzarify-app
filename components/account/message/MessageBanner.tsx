import {
  Dimensions,
  Image as NativeImage,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Box, Icon, Stack, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export interface MessageBannerProps {
  time: string;
  title: string;
  detail: string;
  imgUrl: ImageSourcePropType;
  type: "promo" | "activity";
  testID?: string;
}

const MessageBanner = ({
  detail,
  title,
  time,
  imgUrl,
  type,
  testID,
}: MessageBannerProps) => {
  const { height } = Dimensions.get("window");
  const theme = useBazarifyTheme();
  const iconBackground = type === "promo" ? "primary" : "warning";

  return (
    <Box
      gap="sm"
      padding="sm"
      borderRadius="md"
      backgroundColor="surface"
      id="banner"
      testID={testID}
      style={[styles.banner, { borderColor: theme.colors.borderStrong }]}
    >
      <Stack direction="row" align="center" space="sm">
        <Box padding="sm" borderRadius="pill" backgroundColor={iconBackground}>
          <Icon size={18} color="textInverted">
            {({ color, size }) =>
              type === "promo" ? (
                <Ionicons name="megaphone" size={size} color={color} />
              ) : (
                <Feather name="activity" size={size} color={color} />
              )
            }
          </Icon>
        </Box>
        <Stack space="xs">
          <Text>{title}</Text>
          <Text variant="caption" color="textMuted">
            {time}
          </Text>
        </Stack>
      </Stack>
      <Box align="center">
        <NativeImage
          style={{ height: height * (120 / height), objectFit: "contain" }}
          source={imgUrl}
        />
      </Box>
      <Text>{detail}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  banner: { borderWidth: StyleSheet.hairlineWidth },
});

export default MessageBanner;
