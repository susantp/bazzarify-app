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
import { useAtomValue, useSetAtom } from "jotai";
import { filteredDefaultLanguage } from "@/atoms/languageAtom";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
import { clearAuthToken } from "@/modules/auth/utils/token";

export default function useSettingScreen() {
  const defaultLanguage = useAtomValue(filteredDefaultLanguage);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const handleLogout = async () => {
    //TODO request to logout api
    await clearAuthToken();
    setToken(null);
    setAuthStatus("guest");
    setUser(null);
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
    renderSettingItem,
  };
}
