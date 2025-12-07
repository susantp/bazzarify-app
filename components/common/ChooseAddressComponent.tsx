import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const ChooseAddressComponent = () => (
  <View className="flex-col gap-y-6">
    <Text className="font-semibold">Choose your delivery location.</Text>
    <Text>
      Select a delivery location to see product availability and delivery
      options.
    </Text>
    <TouchableOpacity className="w-full flex-row">
      <View className="bg-primary rounded-full p-4">
        <Text className="text-white"> Sign in to see your address</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default ChooseAddressComponent;
