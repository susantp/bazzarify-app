import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";

import { Coordinates, getCurrentCoordinates, reverseGeocode } from "../services/locationService";
import { geocodeAddressAtom, latitudeAtom, locationErrorAtom, longitudeAtom } from "@/atoms/locationAtom";
import { Alert } from "react-native";
import { openSettings } from "expo-linking";

export function useLocation() {
  const setLat = useSetAtom(latitudeAtom);
  const setLng = useSetAtom(longitudeAtom);
  const setGeocode = useSetAtom(geocodeAddressAtom);
  const setError = useSetAtom(locationErrorAtom);
  const fetchAndStoreLocation = useCallback(async () => {
    try {
      const coords = await getCurrentCoordinates();
      setError(null);
      setLat(coords.latitude);
      setLng(coords.longitude);

      const place = await reverseGeocode(coords);
      setGeocode(place);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "unknown error";
      setError(msg);

      if (msg === "location permission not allowed") {
        Alert.alert(
          "Location Access Required",
          "Please enable location permission in your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => openSettings()
            }
          ]
        );
      }
    }
  }, [setLat, setLng, setGeocode, setError]);

  // run once on mount
  useEffect(() => {
    fetchAndStoreLocation().then(() => undefined);
  }, [fetchAndStoreLocation]);

  /**
   * Expose reverseGeocode so any component can pass in coords
   */
  const doReverseGeocode = useCallback(
    (coords: Coordinates) => reverseGeocode(coords),
    []
  );

  return { refresh: fetchAndStoreLocation, reverseGeocode: doReverseGeocode };
}
