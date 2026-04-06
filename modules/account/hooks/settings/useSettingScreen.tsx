import { router } from "expo-router";
import {
  Image,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  IProfileMenu,
  SettingEnum,
} from "@/modules/account/data/settings/settingList";
import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { filteredDefaultLanguage } from "@/atoms/languageAtom";
import { logoutAuthSession } from "@/modules/auth/session/sessionController";

export default function useSettingScreen() {
  const defaultLanguage = useAtomValue(filteredDefaultLanguage);
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
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => router.push(`/account/setting/${item.id}`)}
        className={`border-b border-b-gray-400 px-2 py-6`}
      >
        {item.id === SettingEnum.LANGUAGE && defaultLanguage.length > 0 ? (
          <View className="flex-row items-center">
            <Text className="w-10/12 text-xl">{item.label}</Text>
            <View className="items-end justify-center">
              <Image
                source={defaultLanguage[0].imgSource}
                width={10}
                height={10}
              />
            </View>
          </View>
        ) : (
          <Text className="items-end text-xl">{item.label}</Text>
        )}
      </TouchableOpacity>
    );
  };
  return {
    handleLogout,
    isLoggingOut,
    renderSettingItem,
  };
}
