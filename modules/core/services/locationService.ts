// src/services/locationService.ts
import * as Location from "expo-location";
import type {
  LocationGeocodedAddress,
  LocationPermissionResponse,
} from "expo-location";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Reads permission state without triggering the operating-system prompt. */
export async function getForegroundLocationPermission(): Promise<LocationPermissionResponse> {
  return Location.getForegroundPermissionsAsync();
}

/** Requests location only after an explicit user action. */
export async function requestForegroundLocationPermission(): Promise<LocationPermissionResponse> {
  return Location.requestForegroundPermissionsAsync();
}

/**
 * Returns current coordinates only when foreground permission is already
 * granted. Permission prompting belongs to the user-triggered UI action.
 */
export async function getCurrentCoordinates(): Promise<Coordinates> {
  const permission = await getForegroundLocationPermission();
  if (!permission.granted) {
    throw new Error("location permission not allowed");
  }

  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
  });
  return { latitude: coords.latitude, longitude: coords.longitude };
}

/**
 * Given coords, returns an array of formatted address strings.
 */
export async function reverseGeocode(
  coords: Coordinates,
): Promise<LocationGeocodedAddress> {
  const placeMarks = await Location.reverseGeocodeAsync(coords);
  const first = placeMarks[0];
  if (!first) {
    throw new Error("No geocode result");
  }
  return first;
}
