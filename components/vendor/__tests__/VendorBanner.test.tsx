import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import VendorBanner from "@/components/vendor/VendorBanner";

jest.mock("@tanstack/react-query", () => ({
  useQuery: () => ({
    data: { store: { name: "Test Store" } },
    isLoading: false,
  }),
}));

jest.mock("@/modules/vendor/data/services/vendorService", () => ({
  fetchStore: jest.fn(),
}));

describe("VendorBanner", () => {
  it("keeps vendor identity and actions data-driven", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <VendorBanner vendorUuid="vendor-1" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Test Store")).toBeTruthy();
    expect(screen.getByText("100% Authentic")).toBeTruthy();
    expect(screen.getByText("Follow")).toBeTruthy();
    expect(screen.getByText("Chat")).toBeTruthy();
  });
});
