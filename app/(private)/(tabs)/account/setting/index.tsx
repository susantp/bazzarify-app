import React from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import { settingList } from "@/modules/account/data/settings/settingList";
import useSettingScreen from "@/modules/account/hooks/settings/useSettingScreen";

const SettingScreen = () => {
  const { handleLogout, isLoggingOut, renderSettingItem } = useSettingScreen();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title={"Settings"} />
      <View className="h-screen-safe flex-col bg-white">
        <View>
          <FlatList
            className="flex-col"
            data={settingList}
            keyExtractor={(item) => item.id}
            renderItem={renderSettingItem}
          />
          <TouchableOpacity
            onPress={handleLogout}
            disabled={isLoggingOut}
            activeOpacity={0.8}
            className="mt-4 flex w-full items-center bg-primary"
          >
            <Text className="p-4 text-lg font-bold text-white">
              {isLoggingOut ? "Logging out..." : "Log Out"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default SettingScreen;
