import { beforeEach, describe, expect, it, mock } from "bun:test";

const undeterminedPermission = {
  status: "undetermined",
  granted: false,
  canAskAgain: true,
  expires: "never",
};
const deniedPermission = {
  status: "denied",
  granted: false,
  canAskAgain: false,
  expires: "never",
};
const grantedPermission = {
  status: "granted",
  granted: true,
  canAskAgain: true,
  expires: "never",
};

let currentPermission = undeterminedPermission;
const getForegroundPermissionsAsync = mock(async () => currentPermission);
const requestForegroundPermissionsAsync = mock(async () => grantedPermission);
const getCurrentPositionAsync = mock(async () => ({
  coords: { latitude: 27.7172, longitude: 85.324 },
}));
const reverseGeocodeAsync = mock(async () => []);

mock.module("expo-location", () => ({
  Accuracy: { Highest: 6 },
  PermissionStatus: {
    DENIED: "denied",
    GRANTED: "granted",
    UNDETERMINED: "undetermined",
  },
  getForegroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
}));

const {
  getCurrentCoordinates,
  getForegroundLocationPermission,
  requestForegroundLocationPermission,
} = await import("./locationService");

describe("location permission boundary", () => {
  beforeEach(() => {
    getForegroundPermissionsAsync.mockClear();
    requestForegroundPermissionsAsync.mockClear();
    getCurrentPositionAsync.mockClear();
    reverseGeocodeAsync.mockClear();
    currentPermission = undeterminedPermission;
  });

  it("reads permission state without prompting the operating system", async () => {
    const permission = await getForegroundLocationPermission();

    expect(permission.status).toBe("undetermined");
    expect(requestForegroundPermissionsAsync).not.toHaveBeenCalled();
  });

  it("requests permission only through its explicit request function", async () => {
    const permission = await requestForegroundLocationPermission();

    expect(permission.granted).toBe(true);
    expect(requestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
  });

  it("does not request permission while loading coordinates after denial", async () => {
    currentPermission = deniedPermission;

    await expect(getCurrentCoordinates()).rejects.toThrow(
      "location permission not allowed",
    );
    expect(requestForegroundPermissionsAsync).not.toHaveBeenCalled();
    expect(getCurrentPositionAsync).not.toHaveBeenCalled();
  });

  it("loads coordinates for a previously granted permission", async () => {
    currentPermission = grantedPermission;

    await expect(getCurrentCoordinates()).resolves.toEqual({
      latitude: 27.7172,
      longitude: 85.324,
    });
    expect(requestForegroundPermissionsAsync).not.toHaveBeenCalled();
  });
});
