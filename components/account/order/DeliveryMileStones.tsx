import { Text, View } from "react-native";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

const DeliveryMileStones = () => (
  <View className={`flex-row justify-between gap-x-2`}>
    <View
      style={{ top: 28 }}
      className="absolute left-4 right-2 border border-dashed border-black"
    />
    <View className="flex-col items-center justify-center gap-y-2">
      <View className="rounded-full bg-black p-4">
        <MaterialCommunityIcons name="archive-clock" size={24} color="white" />
      </View>
      <Text className={`text-center`}>Processing</Text>
    </View>
    <View className="flex-col items-center justify-center gap-y-2">
      <View className="bg-primary rounded-full p-4">
        <Feather name="package" size={24} color="white" />
      </View>
      <Text className={`text-center`}>Packed</Text>
    </View>
    <View className="flex-col items-center justify-center gap-y-2">
      <View className="rounded-full bg-gray-400 p-4">
        <FontAwesome5 name="shipping-fast" size={24} color="white" />
      </View>
      <Text className={`text-center`}>Shipped</Text>
    </View>
    <View className="flex-col items-center justify-center gap-y-2">
      <View className="rounded-full bg-gray-400 p-4">
        <MaterialIcons name="done" size={24} color="white" />
      </View>
      <Text className={`text-center`}>Delivered</Text>
    </View>
  </View>
);

export default DeliveryMileStones;
