import React from "react";
import type { Coordinates } from "expo-maps";
import type { GoogleMapsMarker } from "expo-maps/src/google/GoogleMaps.types";
import type { CameraPosition } from "expo-maps/src/shared.types";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { AntDesign } from "@expo/vector-icons";
import { loadExpoMaps } from "@/modules/core/services/expoMapsRuntime";
import { EmptyState } from "@/components/design-system";

const expoMaps = loadExpoMaps();

interface Props {
  onClick: (event: { coordinates: Coordinates }) => void;
  markers?: GoogleMapsMarker[];
  cameraPosition?: CameraPosition;
  onClose: () => void;
  selectedAddress?: string | null;
  helperText?: string;
  onConfirm: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchResults?: Array<{
    id: string;
    title: string;
    subtitle?: string;
  }>;
  onSearchResultPress?: (id: string) => void;
  searchLoading?: boolean;
  searchError?: string | null;
}
export const MapView = ({
  onClick,
  markers,
  cameraPosition,
  onClose,
  selectedAddress,
  onConfirm,
  helperText,
  searchValue,
  onSearchChange,
  searchResults,
  onSearchResultPress,
  searchLoading,
  searchError,
}: Props) => {
  const GoogleMapsView =
    expoMaps && (Platform.OS === "android" || Platform.OS === "ios")
      ? expoMaps.GoogleMaps.View
      : null;

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      {GoogleMapsView ? (
        <GoogleMapsView
          style={{ height: "100%" }}
          onMapClick={onClick}
          markers={markers}
          cameraPosition={cameraPosition}
        />
      ) : (
        <View style={styles.mapUnavailable}>
          <EmptyState
            title="Map unavailable"
            description="Use address search or install the Bazarify development client to select a location on the map."
          />
        </View>
      )}
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <AntDesign name="close-circle" size={24} color="#ea580c" />
      </TouchableOpacity>
      {onSearchChange ? (
        <View style={styles.searchContainer}>
          <View style={styles.searchRow}>
            <TextInput
              value={searchValue}
              placeholder="Search address"
              placeholderTextColor="#6b7280"
              onChangeText={onSearchChange}
              style={styles.searchInput}
              autoCorrect={false}
            />
            {searchLoading ? (
              <ActivityIndicator size="small" color="#ea580c" />
            ) : null}
          </View>
          {searchResults && searchResults.length > 0 ? (
            <View style={styles.searchResults}>
              {searchResults.map((result) => (
                <TouchableOpacity
                  key={result.id}
                  style={styles.searchResultItem}
                  onPress={() => onSearchResultPress?.(result.id)}
                >
                  <Text style={styles.searchResultTitle}>{result.title}</Text>
                  {result.subtitle ? (
                    <Text style={styles.searchResultSubtitle}>
                      {result.subtitle}
                    </Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          ) : searchError ? (
            <View style={styles.searchResults}>
              <View style={styles.searchResultItem}>
                <Text style={styles.searchResultSubtitle}>{searchError}</Text>
              </View>
            </View>
          ) : null}
        </View>
      ) : null}
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
  mapUnavailable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 24,
  },
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
  searchContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 64,
    zIndex: 30,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 4,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  searchResults: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 8,
    elevation: 4,
    maxHeight: 220,
  },
  searchResultItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
  },
  searchResultTitle: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  searchResultSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
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
