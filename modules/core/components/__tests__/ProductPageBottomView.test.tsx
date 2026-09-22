import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import ProductPageBottomView from "@/modules/core/components/ProductPageBottomView";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("@/modules/core/utils/protectedNavigation", () => ({
  routeGuestToLoginForProtectedTarget: jest.fn(() => Promise.resolve()),
}));

describe("ProductPageBottomView", () => {
  it("keeps inventory messaging and guest purchase action reusable", async () => {
    const onStorePress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductPageBottomView
          onCartAdd={jest.fn()}
          onStorePress={onStorePress}
          inventoryMessage="Only two left"
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Only two left")).toBeTruthy();
    fireEvent.press(screen.getByRole("button", { name: "Store" }));
    expect(onStorePress).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Login To Buy" })).toBeTruthy();
  });
});
