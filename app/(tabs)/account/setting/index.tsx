import React from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import ScreenHeader from "@/components/common/ScreenHeader";
import {
  IProfileMenu,
  SettingEnum,
  settingList,
} from "@/components/account/setting/data/settingList";
import { useRecoilState, useRecoilValue } from "recoil";
import { filteredDefaultLanguage } from "@/atoms/languageAtom";
import { userSession } from "@/atoms/sessionAtom";

const SettingScreen = () => {
  const defaultLanguage = useRecoilValue(filteredDefaultLanguage);
  const [session, setSession] = useRecoilState(userSession);

  const renderItem = ({ item }: ListRenderItemInfo<IProfileMenu>) => {
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
  return (
    <SafeAreaWrapper>
      <ScreenHeader title={"Settings"} />
      <View className="h-screen-safe flex-col bg-white">
        <View>
          <FlatList
            className="flex-col"
            data={settingList}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <TouchableOpacity
            onPress={() => setSession(!session)}
            activeOpacity={0.8}
            className="mt-4 flex w-full items-center bg-orange-600"
          >
            <Text className="p-4 text-lg font-bold text-white">Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default SettingScreen;
