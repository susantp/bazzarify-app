// src/services/locationService.ts
import * as Location from "expo-location";
import { LocationGeocodedAddress } from "expo-location";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Requests foreground permission, then returns current coords.
 * Throws if permission denied.
 */
export async function getCurrentCoordinates(): Promise<Coordinates> {
  // check current status
  const perm = await Location.getForegroundPermissionsAsync();
  if (perm.status === Location.PermissionStatus.UNDETERMINED) {
    // first-time ask
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      throw new Error("location permission not allowed");
    }
  } else if (perm.status === Location.PermissionStatus.DENIED) {
    // user has said “never ask again”
    throw new Error("location permission not allowed");
  }
  // permission === GRANTED
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
