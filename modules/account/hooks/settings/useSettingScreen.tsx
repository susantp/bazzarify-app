import { deleteStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY, USER_KEY } from "@/modules/auth/config";
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
import React from "react";
import { useAtomValue } from "jotai";
import { filteredDefaultLanguage } from "@/atoms/languageAtom";

export default function useSettingScreen() {
  const defaultLanguage = useAtomValue(filteredDefaultLanguage);
  const handleLogout = async () => {
    await deleteStorage(USER_KEY);
    await deleteStorage(AUTH_TOKEN_KEY);
    router.replace("/guest/guestAccountIndex");
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
            <View className="h-0 w-2/12 items-end justify-center">
              <Image source={defaultLanguage[0].imgSource} />
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
    renderSettingItem,
  };
}
