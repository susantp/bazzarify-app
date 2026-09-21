import { Text, View } from "react-native";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

interface DeliveryMileStonesProps {
  currentStatus?: string;
}

const getStatusStep = (currentStatus?: string) => {
  const status = (currentStatus || "").toLowerCase().trim();
  if (!status) {
    return -1;
  }
  const byBackendCode: Record<string, number> = {
    draft: 0,
    confirmed: 0,
    allocated: 1,
    partially_shipped: 2,
    shipped: 2,
    delivered: 3,
    completed: 3,
    canceled: -1,
    returned: -1,
  };
  if (status in byBackendCode) {
    return byBackendCode[status];
  }

  // Fallback for unexpected values from legacy payloads.
  const relaxed = status.replaceAll("_", " ");
  if (relaxed.includes("cancel") || relaxed.includes("return")) return -1;
  if (relaxed.includes("deliver") || relaxed.includes("complete")) return 3;
  if (relaxed.includes("ship") || relaxed.includes("logistic")) return 2;
  if (relaxed.includes("pack") || relaxed.includes("allocat")) return 1;
  return 0;
};

const DeliveryMileStones = ({ currentStatus }: DeliveryMileStonesProps) => {
  const activeStep = getStatusStep(currentStatus);
  const isActive = (step: number) => activeStep >= 0 && step <= activeStep;

  return (
    <View className={`flex-row justify-between gap-x-2`}>
      <View
        style={{ top: 28 }}
        className={`absolute left-4 right-2 border border-dashed ${activeStep >= 0 ? "border-primary" : "border-gray-400"}`}
      />
      <View className="flex-col items-center justify-center gap-y-2">
        <View
          className={`rounded-full p-4 ${isActive(0) ? "bg-primary" : "bg-gray-400"}`}
        >
          <MaterialCommunityIcons
            name="archive-clock"
            size={24}
            color="white"
          />
        </View>
        <Text className={`text-center ${!isActive(0) ? "text-gray-500" : ""}`}>
          Processing
        </Text>
      </View>
      <View className="flex-col items-center justify-center gap-y-2">
        <View
          className={`rounded-full p-4 ${isActive(1) ? "bg-primary" : "bg-gray-400"}`}
        >
          <Feather name="package" size={24} color="white" />
        </View>
        <Text className={`text-center ${!isActive(1) ? "text-gray-500" : ""}`}>
          Packed
        </Text>
      </View>
      <View className="flex-col items-center justify-center gap-y-2">
        <View
          className={`rounded-full p-4 ${isActive(2) ? "bg-primary" : "bg-gray-400"}`}
        >
          <FontAwesome5 name="shipping-fast" size={24} color="white" />
        </View>
        <Text className={`text-center ${!isActive(2) ? "text-gray-500" : ""}`}>
          Shipped
        </Text>
      </View>
      <View className="flex-col items-center justify-center gap-y-2">
        <View
          className={`rounded-full p-4 ${isActive(3) ? "bg-primary" : "bg-gray-400"}`}
        >
          <MaterialIcons name="done" size={24} color="white" />
        </View>
        <Text className={`text-center ${!isActive(3) ? "text-gray-500" : ""}`}>
          Delivered
        </Text>
      </View>
    </View>
  );
};

export default DeliveryMileStones;
