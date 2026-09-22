export type ExpoMapsModule = typeof import("expo-maps");

/**
 * Expo Maps is a native-only module. Expo Go and clients built without the
 * module throw while loading it, so map consumers must treat it as optional.
 */
export function loadExpoMaps(): ExpoMapsModule | null {
  try {
    return require("expo-maps") as ExpoMapsModule;
  } catch {
    return null;
  }
}
