import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "jotai";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import CheckoutAddressComponent from "@/components/cart/checkout/CheckoutAddressComponent";

jest.mock(
  "@/components/common/DemoModalComponent",
  () =>
    ({ children }: { children: React.ReactNode }) => <>{children}</>,
);

jest.mock("@/modules/user/components/DeliveryAddressPicker", () => () => null);

describe("CheckoutAddressComponent", () => {
  it("keeps the address prompt and modal trigger accessible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <Provider>
          <CheckoutAddressComponent user={null} defaultDeliveryAddress={null} />
        </Provider>
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Select delivery address")).toBeTruthy();
    expect(screen.getByText("Change")).toBeTruthy();
    fireEvent.press(
      screen.getByRole("button", { name: "Select delivery address" }),
    );
  });
});
