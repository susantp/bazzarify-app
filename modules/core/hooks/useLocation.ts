import { useCallback, useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { AppState } from "react-native";
import { openSettings } from "expo-linking";

import {
  Coordinates,
  getForegroundLocationPermission,
  getCurrentCoordinates,
  requestForegroundLocationPermission,
  reverseGeocode,
} from "../services/locationService";
import {
  geocodeAddressAtom,
  latitudeAtom,
  locationErrorAtom,
  longitudeAtom,
} from "@/atoms/locationAtom";

export type LocationPermissionStatus =
  "checking" | "undetermined" | "denied" | "granted";

export function useLocation() {
  const setLat = useSetAtom(latitudeAtom);
  const setLng = useSetAtom(longitudeAtom);
  const setGeocode = useSetAtom(geocodeAddressAtom);
  const setError = useSetAtom(locationErrorAtom);
  const [permissionStatus, setPermissionStatus] =
    useState<LocationPermissionStatus>("checking");
  const [canAskAgain, setCanAskAgain] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);

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
      if (msg === "location permission not allowed") {
        setPermissionStatus("denied");
        setLat(null);
        setLng(null);
        setGeocode(null);
        setError(null);
        return;
      }

      setError(msg);
    }
  }, [setError, setGeocode, setLat, setLng]);

  const applyPermission = useCallback(
    async (
      permission: Awaited<ReturnType<typeof getForegroundLocationPermission>>,
    ) => {
      setPermissionStatus(
        permission.granted
          ? "granted"
          : permission.status === "undetermined"
            ? "undetermined"
            : "denied",
      );
      setCanAskAgain(permission.canAskAgain);

      if (permission.granted) {
        await fetchAndStoreLocation();
        return;
      }

      setLat(null);
      setLng(null);
      setGeocode(null);
      setError(null);
    },
    [fetchAndStoreLocation, setError, setGeocode, setLat, setLng],
  );

  const refresh = useCallback(async () => {
    try {
      await applyPermission(await getForegroundLocationPermission());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "unknown error");
    }
  }, [applyPermission, setError]);

  const requestAccess = useCallback(async () => {
    setIsRequesting(true);
    try {
      let permission = await getForegroundLocationPermission();
      if (
        !permission.granted &&
        (permission.status === "undetermined" || permission.canAskAgain)
      ) {
        permission = await requestForegroundLocationPermission();
      }
      await applyPermission(permission);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "unknown error");
    } finally {
      setIsRequesting(false);
    }
  }, [applyPermission, setError]);

  const syncPermission = useCallback(async () => {
    try {
      await applyPermission(await getForegroundLocationPermission());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "unknown error");
    }
  }, [applyPermission, setError]);

  useEffect(() => {
    void syncPermission();
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") void syncPermission();
    });

    return () => subscription.remove();
  }, [syncPermission]);

  /**
   * Expose reverseGeocode so any component can pass in coords
   */
  const doReverseGeocode = useCallback(
    (coords: Coordinates) => reverseGeocode(coords),
    [],
  );

  return {
    refresh,
    requestAccess,
    openLocationSettings: openSettings,
    permissionStatus,
    canAskAgain,
    isRequesting,
    reverseGeocode: doReverseGeocode,
  };
}
