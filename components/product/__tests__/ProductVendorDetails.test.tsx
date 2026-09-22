import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import ProductVendorDetails from "@/components/product/ProductVendorDetails";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

describe("ProductVendorDetails", () => {
  it("keeps vendor metrics and store navigation visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductVendorDetails />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Ultima")).toBeTruthy();
    expect(screen.getByText("Trusted seller status")).toBeTruthy();
    fireEvent.press(screen.getByText("Visit Store"));

    expect(router.push).toHaveBeenCalledWith("/vendor/demoVendor");
  });
});
