import React, { type ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import {
  Box,
  Icon,
  Text,
  type BazarifyColorName,
} from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export type MessageActionType = {
  id: string;
  label: string;
  icon: (props: { color: string; size: number }) => ReactNode;
  backgroundColor: BazarifyColorName;
  routeTo?: () => void;
};

interface MessageActionProps {
  action: MessageActionType;
}

const MessageAction = ({ action }: MessageActionProps) => {
  const theme = useBazarifyTheme();

  return (
    <Pressable
      onPress={action.routeTo}
      accessibilityRole="button"
      key={action.id}
      style={({ pressed }) => [
        styles.action,
        { gap: theme.spacing.sm },
        pressed && styles.pressed,
      ]}
    >
      <Box
        padding="md"
        borderRadius="pill"
        backgroundColor={action.backgroundColor}
      >
        <Icon size={30} color="textInverted">
          {action.icon}
        </Icon>
      </Box>
      <Text variant="bodyCompactMedium">{action.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  action: { alignItems: "center" },
  pressed: { opacity: 0.72 },
});

export default MessageAction;
