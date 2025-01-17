import { Text, View } from "react-native";
import { ImePayIcon } from "@/components/common/icons";
import React from "react";

const ImePayPaymentComponent = () => {
  return (
    <>
      <View className="flex-row gap-x-2 px-2 pb-10 pt-2">
        <View className="w-1/12 items-end">
          <ImePayIcon />
        </View>
        <View className="w-10/12">
          <Text className="text-justify">
            Pay with your IME Pay Account. Please make sure you have enough
            balance in your account.
          </Text>
        </View>
      </View>
      <View className="flex-1 flex-col gap-y-2 bg-gray-100 px-3 py-8">
        <Text className="text-gray-600">
          "You will be redirected to you IME Pay account to complete payment:"
        </Text>
        <Text className="text-gray-600">
          1. Login to your IME Pay account using your IME Pay ID and your PIN.
        </Text>
        <Text className="text-gray-600">
          2. Ensure your IME Pay account is activate and has sufficient balance.
        </Text>
        <Text className="text-gray-600">
          3. Enter OTP (one time password) sent to your registered mobile
          number.
        </Text>
        <Text className="text-gray-600">
          ***Login with your IME Pay mobile and PIN.***
        </Text>
      </View>
    </>
  );
};

export default ImePayPaymentComponent;
