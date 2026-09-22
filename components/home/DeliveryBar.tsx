import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import React, { useState } from "react";
import ChooseAddressComponent from "@/components/common/ChooseAddressComponent";
import { LocationGeocodedAddress } from "expo-location";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Text } from "@/components/design-system";

type DeliveryBarProps = {
  style?: StyleProp<ViewStyle>;
  locationError: string | null;
  refresh: () => void;
  displayCurrentAddress: LocationGeocodedAddress | null;
};

export default function DeliveryBar({
  style,
  locationError,
  displayCurrentAddress,
  refresh,
}: DeliveryBarProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <Box
      direction="row"
      align="center"
      justify="center"
      gap="sm"
      paddingY="sm"
      backgroundColor="locationBar"
      style={style}
    >
      <Icon size={14} color="textInverted">
        {({ color, size }) => (
          <Ionicons name="location-outline" size={size} color={color} />
        )}
      </Icon>
      <Pressable
        onPress={() => setShowModal(!showModal)}
        style={styles.content}
      >
        {locationError ? (
          <Box direction="row" align="center" justify="space-between">
            <Text variant="bodyCompact" color="textInverted">
              Location has an error. Please restart the app
            </Text>
            <Pressable onPress={refresh}>
              <Text
                variant="bodyCompact"
                color="textInverted"
                style={styles.refresh}
              >
                Refresh Location
              </Text>
            </Pressable>
          </Box>
        ) : (
          <Text
            variant="bodyCompactMedium"
            color="textInverted"
            numberOfLines={1}
            style={styles.address}
          >
            {displayCurrentAddress
              ? displayCurrentAddress.formattedAddress
              : "Location loading..."}
          </Text>
        )}
      </Pressable>
      <DemoModalComponent
        type="bottom"
        showModal={showModal}
        handlePress={() => setShowModal(!showModal)}
      >
        <ChooseAddressComponent />
      </DemoModalComponent>
    </Box>
  );
}

const styles = StyleSheet.create({
  address: { fontSize: 11 },
  content: { width: 320 },
  refresh: { fontWeight: "700" },
});
