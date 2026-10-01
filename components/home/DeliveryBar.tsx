import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useState } from "react";
import ChooseAddressComponent from "@/components/common/ChooseAddressComponent";
import { LocationGeocodedAddress } from "expo-location";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Box, Icon, Text } from "@/components/design-system";

type DeliveryBarProps = {
  style?: StyleProp<ViewStyle>;
  locationError: string | null;
  locationStatus: "checking" | "available" | "unavailable";
  refresh: () => void;
  displayCurrentAddress: LocationGeocodedAddress | null;
};

export default function DeliveryBar({
  style,
  locationError,
  locationStatus,
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
      paddingX="lg"
      paddingY="sm"
      backgroundColor="locationBar"
      style={style}
    >
      <Icon size={14} color="locationBarText">
        {({ color, size }) => (
          <Ionicons name="location-outline" size={size} color={color} />
        )}
      </Icon>
      <Pressable
        onPress={() => setShowModal(!showModal)}
        style={styles.content}
      >
        {locationError && locationStatus === "available" ? (
          <Box direction="row" align="center" gap="sm">
            <Text
              variant="bodyCompact"
              color="locationBarText"
              numberOfLines={1}
              style={styles.errorMessage}
            >
              Location unavailable
            </Text>
            <Pressable onPress={refresh}>
              <Text
                variant="bodyCompact"
                color="locationBarText"
                style={styles.refresh}
              >
                Refresh Location
              </Text>
            </Pressable>
          </Box>
        ) : (
          <Text
            variant="bodyCompactMedium"
            color="locationBarText"
            numberOfLines={1}
            style={styles.address}
          >
            {displayCurrentAddress
              ? displayCurrentAddress.formattedAddress
              : locationStatus === "checking"
                ? "Finding your delivery area…"
                : locationStatus === "available"
                  ? "Location unavailable"
                  : "Delivery area not set"}
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
  content: { flex: 1, minWidth: 0 },
  errorMessage: { flexShrink: 1 },
  refresh: { fontWeight: "700" },
});
