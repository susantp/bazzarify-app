import { useAtomValue } from "jotai";
import {
  geocodeAddressAtom,
  latitudeAtom,
  longitudeAtom,
} from "@/atoms/locationAtom";
import React, { useState } from "react";
import { Coordinates, GoogleMaps } from "expo-maps";
import { StyleSheet, View } from "react-native";
import { reverseGeocode } from "@/modules/core/services/locationService";

export const MapView = () => {
  const address = useAtomValue(geocodeAddressAtom);
  const latitude = useAtomValue(latitudeAtom);
  const longitude = useAtomValue(longitudeAtom);
  const [chosenLocation, setChosenLocation] = useState<Coordinates>();

  return (
    <View style={{ flex: 1 }}>
      <GoogleMaps.View
        style={StyleSheet.absoluteFill}
        onMapClick={async (e) => {
          setChosenLocation(e.coordinates);
          if (e.coordinates.latitude && e.coordinates.longitude) {
            const reverse = await reverseGeocode({
              latitude: e.coordinates.latitude,
              longitude: e.coordinates.longitude,
            });
            console.log("MapView", reverse);
          }
        }}
        markers={[
          {
            coordinates: {
              latitude: chosenLocation?.latitude || latitude || 0,
              longitude: chosenLocation?.longitude || longitude || 0,
            },
            title: "You are here",
            draggable: true,
            snippet: address
              ? address.formattedAddress || undefined
              : "Current Location",
          },
        ]}
        cameraPosition={{
          coordinates: {
            latitude: latitude || undefined,
            longitude: longitude || undefined,
          },
          zoom: 16,
        }}
      />
    </View>
  );
};
