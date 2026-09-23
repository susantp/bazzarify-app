import { router } from "expo-router";
import { Pressable, StyleSheet, type ListRenderItemInfo } from "react-native";
import {
  IProfileMenu,
  SettingEnum,
} from "@/modules/account/data/settings/settingList";
import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { filteredDefaultLanguage } from "@/atoms/languageAtom";
import { logoutAuthSession } from "@/modules/auth/session/sessionController";
import { Box, Image, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export default function useSettingScreen() {
  const defaultLanguage = useAtomValue(filteredDefaultLanguage);
  const theme = useBazarifyTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    try {
      await logoutAuthSession();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const renderSettingItem = ({ item }: ListRenderItemInfo<IProfileMenu>) => {
    return (
      <Pressable
        accessibilityLabel={item.label}
        accessibilityRole="button"
        onPress={() => router.push(`/account/setting/${item.id}`)}
        style={({ pressed }) => [
          styles.item,
          { borderBottomColor: theme.colors.borderStrong },
          pressed && styles.pressed,
        ]}
      >
        {item.id === SettingEnum.LANGUAGE && defaultLanguage.length > 0 ? (
          <Box direction="row" align="center">
            <Text variant="title" style={styles.languageLabel}>
              {item.label}
            </Text>
            <Box align="flex-end" justify="center" style={styles.languageIcon}>
              <Image
                source={defaultLanguage[0].imgSource}
                size={10}
                radius="none"
              />
            </Box>
          </Box>
        ) : (
          <Text variant="title">{item.label}</Text>
        )}
      </Pressable>
    );
  };
  return {
    handleLogout,
    isLoggingOut,
    renderSettingItem,
  };
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingVertical: 24,
  },
  languageIcon: { width: "16.666%" },
  languageLabel: { flex: 1 },
  pressed: { opacity: 0.6 },
});
