import { FlatList, Switch, Text, View } from "react-native";
import { useState } from "react";
import {
  permissionSetting,
  PermissionType,
} from "@/components/account/setting/data/permissions";
import { Colors } from "@/constants/Colors";

const PermissionSettingScreen = () => {
  const [permissions, setPermissions] = useState(permissionSetting);
  const handleSwitchChange = (id: string, value: boolean) => {
    setPermissions((prevPermissions: PermissionType[]) =>
      prevPermissions.map((permission: PermissionType) =>
        permission.id === id ? { ...permission, active: value } : permission,
      ),
    );
  };
  return (
    permissions.length > 0 && (
      <View className="h-screen-safe bg-white">
        <FlatList
          data={permissions}
          renderItem={({ item }) => {
            return (
              <View className="flex-row items-center justify-between border-b border-gray-400 px-2 py-6">
                <View className="w-10/12">
                  <Text className="text-md font-semibold">{item.label}</Text>
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
      </View>
    )
  );
};

export default PermissionSettingScreen;
