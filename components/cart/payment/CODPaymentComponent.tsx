import { Text, View } from "react-native";
import { BanknotesIcon } from "react-native-heroicons/solid";
import React from "react";

const CODPaymentComponent = () => {
  return (
    <>
      <View className="h-4 bg-gray-200"></View>
      <View className="flex-row gap-x-2 p-2">
        <View className="w-1/12 items-end">
          <BanknotesIcon color={`#3dafc8`} size={20} />
        </View>
        <View className="w-10/12 flex-col gap-y-2">
          <Text className="text-justify">
            - You may pay in cash to our courier upon receiving your parcel at
            the doorstep
          </Text>
          <Text className="text-justify">
            - Before agreeing to receive the parcel, check if your delivery
            status has been updated to 'Out for Delivery'
          </Text>
          <Text className="text-justify">
            - Before receiving, confirm that the airway bill shows that the
            parcel is from Bazzarify.
          </Text>
          <Text className="text-justify">
            - Before you make payment to the courier, confirm your order number,
            sender information and tracking number on the parcel
          </Text>
        </View>
      </View>
    </>
  );
};

export default CODPaymentComponent;
