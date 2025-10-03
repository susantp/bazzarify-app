import { FlatList, Switch, Text, View } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import {
  notificationSettingList,
  NotificationSettingType,
} from "@/modules/account/data/settings/notification";
import ContentWrapper from "@/components/common/ContentWrapper";

const NotificationSettingScreen = () => {
  const [notifications, setNotifications] = useState(notificationSettingList);
  const handleSwitchChange = (id: string, value: boolean) => {
    setNotifications((prevNotification: NotificationSettingType[]) =>
      prevNotification.map((notification: NotificationSettingType) =>
        notification.id === id
          ? { ...notification, active: value }
          : notification,
      ),
    );
  };
  return (
    notifications.length > 0 && (
      <ContentWrapper className="bg-white">
        <FlatList
          data={notifications}
          renderItem={({ item }) => {
            return (
              <View className="flex-row items-center justify-items-center border-b border-gray-400 px-2 py-4">
                <View className="w-10/12 flex-col gap-y-2">
                  <Text className="text-md font-semibold">{item.label}</Text>
                  <Text className="text-[0.8rem] font-light">
                    {item.helperText}
                  </Text>
                </View>
                <View className="w-2/12 items-end">
                  <Switch
                    value={item.active}
                    thumbColor={item.active ? "white" : "gray"}
                    trackColor={{ true: Colors.light.tint }}
                    onValueChange={(value) =>
                      handleSwitchChange(item.id, value)
                    }
                  />
                </View>
              </View>
            );
          }}
        />
      </ContentWrapper>
    )
  );
};

export default NotificationSettingScreen;
