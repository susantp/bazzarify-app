import {Text, View} from "react-native";
import {MapIcon} from "react-native-heroicons/outline";
import React from "react";

export default function DeliveryBar() {
    return (
        <View className="flex flex-row justify-center p-4 items-center bg-blue-950 gap-2">
            <MapIcon size={20} strokeWidth={2} color="white"/>
            <Text className="text-white">Deliver to </Text>
        </View>
    );
}