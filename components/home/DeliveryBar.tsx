import { Text, TouchableOpacity, View } from "react-native";
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
            <Text className="text-white">
              Location has an error. Please restart the app
            </Text>
            <TouchableOpacity onPress={refresh}>
              <Text className="font-bold text-white">Refresh Location</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="font-semibold text-white" style={{ fontSize: 11 }}>
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
