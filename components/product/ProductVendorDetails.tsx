import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ProductVendorDetails = () => (
  <View className="p-4">
    <View
      id="vendor-info"
      className="flex-col gap-y-3 rounded-xl border border-gray-400 px-3 py-3"
    >
      <View className="flex-row items-center justify-between justify-items-center px-6">
        <View>
          <Text className="text-lg font-semibold">Ultima</Text>
          <View className="flex-row gap-x-1">
            <Ionicons
              name="shield-checkmark"
              size={18}
              color={Colors.light.tint}
            />
            <Text className="text-orange-950">100% Authentic</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-items-center gap-x-2">
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={18}
            color="black"
          />
          <Text className="text-lg">Chat</Text>
        </View>
      </View>
      <View className="flex-row">
        <View className="w-4/12 flex-col gap-y-3 border border-gray-400 p-4">
          <Text className="text-md">Trusted seller status</Text>
          <View className="flex items-center justify-items-center">
            <Text className="text-lg">80%</Text>
          </View>
        </View>
        <View className="w-4/12 flex-col gap-y-3 border border-gray-400 p-4">
          <Text className="text-md">Accurate delivery timing</Text>
          <View className="flex items-center justify-items-center">
            <Text className="text-lg">100%</Text>
          </View>
        </View>
        <View className="w-4/12 flex-col gap-y-3 border border-gray-400 p-4">
          <Text className="text-md">Chat response</Text>
          <View className="flex items-center justify-items-center">
            <Text className="text-lg">70%</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/vendor/demoVendor")}
        className="flex items-center justify-items-center"
      >
        <Text className="font-semibold text-primary">Visit Store</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ProductVendorDetails;
