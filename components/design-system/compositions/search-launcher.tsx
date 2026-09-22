import React from "react";
import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@/components/design-system/primitives/box";
import { Text } from "@/components/design-system/primitives/text";
import { Icon } from "@/components/design-system/media/icon";
import { Image } from "@/components/design-system/media/image";
import { useBazarifyTheme } from "@/components/design-system/theme";

export type SearchLauncherProps = {
  canGoBack: boolean;
  onSearchPress: () => void;
  onBackPress: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function SearchLauncher({
  canGoBack,
  onSearchPress,
  onBackPress,
  style,
  testID,
}: SearchLauncherProps) {
  const theme = useBazarifyTheme();

  return (
    <Box testID={testID} flex={1} style={style}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Search"
        hitSlop={6}
        onPress={onSearchPress}
        style={({ pressed }) => [
          styles.launcher,
          { backgroundColor: theme.colors.surface },
          pressed && styles.pressed,
        ]}
      >
        <Box
          direction="row"
          align="center"
          justify="center"
          flex={1}
          paddingX="lg"
        >
          <Text>Search on</Text>
          <Image
            source={require("@/assets/images/iconSmall.png")}
            size={24}
            radius="none"
            style={styles.logo}
          />
        </Box>
      </Pressable>

      {canGoBack ? (
        <Box pointerEvents="box-none" style={styles.backLayer}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={12}
            onPress={onBackPress}
            style={({ pressed }) => [styles.back, pressed && styles.pressed]}
          >
            <Icon size={24} color="text">
              {({ color, size }) => (
                <Ionicons name="arrow-back" size={size} color={color} />
              )}
            </Icon>
          </Pressable>
        </Box>
      ) : null}
    </Box>
  );
}

const styles = StyleSheet.create({
  back: {
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  backLayer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  launcher: {
    borderRadius: 999,
    height: 48,
  },
  logo: { marginLeft: 8 },
  pressed: { opacity: 0.6 },
});
