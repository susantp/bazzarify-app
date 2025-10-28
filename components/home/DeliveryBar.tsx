import { Platform, Text, TouchableOpacity, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";
import React, { useState } from "react";
import ChooseAddressComponent from "@/components/common/ChooseAddressComponent";
import { LocationGeocodedAddress } from "expo-location";
import DemoModalComponent from "@/components/common/DemoModalComponent";

type DeliveryBarProps = {
  className: string;
  locationError: string | null;
  refresh: () => void;
  displayCurrentAddress: LocationGeocodedAddress | null;
};

export default function DeliveryBar({
  className,
  locationError,
  displayCurrentAddress,
  refresh,
}: DeliveryBarProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <View className={className}>
      <MapPinIcon size={14} strokeWidth={2} color="white" />
      <TouchableOpacity
        onPress={() => setShowModal(!showModal)}
        className="w-80"
      >
        {locationError ? (
          <View className="flex-row items-center justify-between">
            <Text className="text-white">{locationError}</Text>
            <TouchableOpacity onPress={refresh}>
              <Text className="font-bold text-white">Refresh Location</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="text-sm font-semibold text-white">
            {displayCurrentAddress
              ? displayCurrentAddress.formattedAddress
              : "Location loading..."}
          </Text>
        )}
      </TouchableOpacity>
      <DemoModalComponent
        type="bottom"
        showModal={showModal}
        handlePress={() => setShowModal(!showModal)}
      >
        <ChooseAddressComponent />
      </DemoModalComponent>
    </View>
  );
}
