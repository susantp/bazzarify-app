import { Text, TouchableOpacity, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";
import React, { useState } from "react";
import { useDeliveryComponentHook } from "@/hooks/useDeliveryComponentHook";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import ChooseAddressComponent from "@/components/common/ChooseAddressComponent";

type DeliveryBarProps = {
  className: string;
};

export default function DeliveryBar({ className }: DeliveryBarProps) {
  const { msg, isError, handleRetry } = useDeliveryComponentHook();
  const [showModal, setShowModal] = useState(false);
  return (
    <View className={className}>
      {isError ? (
        <TouchableOpacity onPress={handleRetry}>
          <Text className="text-sm font-semibold text-white underline">
            {msg}
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <MapPinIcon size={14} strokeWidth={2} color="white" />
          <TouchableOpacity onPress={() => setShowModal(!showModal)}>
            <Text className="text-sm font-semibold text-white">{msg}</Text>
          </TouchableOpacity>
          <DemoModalComponent
            type="bottom"
            showModal={showModal}
            handlePress={() => setShowModal(!showModal)}
          >
            <ChooseAddressComponent />
          </DemoModalComponent>
        </>
      )}
    </View>
  );
}
