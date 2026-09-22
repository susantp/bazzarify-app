import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ProductDeliveryDetails from "@/components/product/ProductDeliveryDetails";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("ProductDeliveryDetails", () => {
  it("keeps address selection and delivery information data-driven", async () => {
    const onChangeAddress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductDeliveryDetails
          selectedAddress={null}
          onChangeAddress={onChangeAddress}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Delivery")).toBeTruthy();
    expect(screen.getByText("Select your address")).toBeTruthy();

    fireEvent.press(screen.getByText("Change"));
    expect(onChangeAddress).toHaveBeenCalledTimes(1);
  });
});
