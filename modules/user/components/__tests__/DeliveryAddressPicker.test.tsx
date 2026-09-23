import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import DeliveryAddressPicker from "@/modules/user/components/DeliveryAddressPicker";

jest.mock("jotai", () => ({
  useAtomValue: () => null,
  useAtom: () => [null, jest.fn()],
  useSetAtom: () => jest.fn(),
}));
jest.mock("@/modules/user/atoms/addresessAtom", () => ({
  addressDraftAtom: {},
  addressListAtom: {},
  getDefaultAddressAtom: {},
}));
jest.mock("@/modules/cart/atoms", () => ({ selectedDeliveryAddress: {} }));
jest.mock("@/atoms/locationAtom", () => ({
  latitudeAtom: {},
  longitudeAtom: {},
}));
jest.mock("@/modules/auth/atoms/authStatusAtom", () => ({
  authStatusAtom: {},
}));
jest.mock("expo-router", () => ({ router: { push: jest.fn() } }));
jest.mock("react-native-toast-message", () => ({ show: jest.fn() }));
jest.mock("@/modules/portal/usePortal", () => ({
  usePortal: () => ({ openPortal: jest.fn(), closePortal: jest.fn() }),
}));
jest.mock("@/modules/core/components/MapView", () => ({ MapView: () => null }));
jest.mock("@/modules/core/services/locationService", () => ({
  reverseGeocode: jest.fn(),
}));
jest.mock("@/modules/core/services/placesService", () => ({
  fetchPlaceDetails: jest.fn(),
  fetchPlaceSuggestions: jest.fn(),
}));
jest.mock("@/modules/core/utils/protectedNavigation", () => ({
  routeGuestToLoginForProtectedTarget: jest.fn(),
}));

describe("DeliveryAddressPicker", () => {
  it("keeps the empty-address actions visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <DeliveryAddressPicker />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Select delivery address")).toBeTruthy();
    expect(
      screen.getByText(
        "No saved address yet. Add a new address or pick on the map.",
      ),
    ).toBeTruthy();
    expect(screen.getByLabelText("Create address")).toBeTruthy();
    expect(screen.getByLabelText("Use current location")).toBeTruthy();
  });
});
