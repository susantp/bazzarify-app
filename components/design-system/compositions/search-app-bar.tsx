import React, { type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@/components/design-system/primitives/box";
import { Icon } from "@/components/design-system/media/icon";
import { Input } from "@/components/design-system/controls/input";
import { useBazarifyTheme } from "@/components/design-system/theme";

export type SearchAppBarProps = {
  canGoBack: boolean;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing: () => void;
  onBackPress: () => void;
  actions?: ReactNode;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  testID?: string;
};

export function SearchAppBar({
  canGoBack,
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBackPress,
  actions,
  style,
  inputStyle,
  testID,
}: SearchAppBarProps) {
  const theme = useBazarifyTheme();

  return (
    <Box
      testID={testID}
      direction="row"
      align="center"
      padding="sm"
      backgroundColor="navigationBar"
      style={style}
    >
      <Box
        flex={1}
        direction="row"
        align="center"
        paddingX="sm"
        borderRadius="pill"
        backgroundColor="navigationInput"
      >
        {canGoBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={8}
            onPress={onBackPress}
            style={({ pressed }) => [styles.back, pressed && styles.pressed]}
          >
            <Icon size={24} color="text">
              {({ color, size }) => (
                <Ionicons name="arrow-back" size={size} color={color} />
              )}
            </Icon>
          </Pressable>
        ) : null}
        <Input
          accessibilityLabel="Search"
          autoCorrect
          containerStyle={styles.inputContainer}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          returnKeyType="next"
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.navigationInput,
              color: theme.colors.text,
            },
            inputStyle,
          ]}
          value={value}
        />
      </Box>
      {actions ? (
        <Box
          direction="row"
          align="center"
          justify="space-between"
          paddingX="sm"
          style={styles.actions}
        >
          {actions}
        </Box>
      ) : null}
    </Box>
  );
}

const styles = StyleSheet.create({
  actions: { width: "25%" },
  back: { alignItems: "center", justifyContent: "center" },
  input: { borderWidth: 0, paddingHorizontal: 4 },
  inputContainer: { flex: 1 },
  pressed: { opacity: 0.6 },
});
