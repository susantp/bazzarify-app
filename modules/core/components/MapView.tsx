import React from "react";
import { Coordinates, GoogleMaps } from "expo-maps";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GoogleMapsMarker } from "expo-maps/src/google/GoogleMaps.types";
import { CameraPosition } from "expo-maps/src/shared.types";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  onClick: (event: { coordinates: Coordinates }) => void;
  markers?: GoogleMapsMarker[];
  cameraPosition?: CameraPosition;
  onClose: () => void;
  selectedAddress?: string | null;
  helperText?: string;
  onConfirm: () => void;
}
export const MapView = ({
  onClick,
  markers,
  cameraPosition,
  onClose,
  selectedAddress,
  onConfirm,
  helperText,
}: Props) => {
  console.log("mapView", selectedAddress);
  return (
    <SafeAreaWrapper className="relative flex flex-1 flex-col">
      <GoogleMaps.View
        style={{ height: "100%" }}
        onMapClick={onClick}
        markers={markers}
        cameraPosition={cameraPosition}
      />
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <AntDesign name="close-circle" size={24} color="#ea580c" />
      </TouchableOpacity>
      <View style={styles.infoBox}>
        <Text style={styles.helperText}>
          {helperText || "Click on map for delivery address"}
        </Text>
        {selectedAddress && (
          <Text
            style={{
              fontSize: 13,
              color: "#111827",
              marginBottom: 8,
              fontWeight: "500",
            }}
          >
            {selectedAddress}
          </Text>
        )}
        <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
          <Text style={styles.confirmBtnText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 8,
    borderRadius: 999,
    elevation: 4,
  },
  infoBox: {
    position: "absolute",
    top: 70, // directly under close button
    right: 16,
    zIndex: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    elevation: 4,
    maxWidth: "65%",
  },

  helperText: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 8,
  },

  confirmBtn: {
    backgroundColor: "#ea580c",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-end",
  },

  confirmBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
});
