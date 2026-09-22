import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ProductVariantSelector from "@/modules/product/components/ProductVariantSelector";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

jest.mock("@/modules/core/utils/getFirstImageSource", () => ({
  __esModule: true,
  default: () => ({ uri: "https://cdn.example.test/variant.png" }),
}));

describe("ProductVariantSelector", () => {
  it("keeps selected and unavailable variant choices data-driven", async () => {
    const onPress = jest.fn();
    const variants = [
      {
        uuid: "variant-1",
        name: "Blue|Large",
        available: true,
        available_to_sell: 2,
        images: [],
        image_base_url: "https://cdn.example.test",
      },
      {
        uuid: "variant-2",
        name: "Red|Large",
        available: false,
        available_to_sell: 0,
        images: [],
        image_base_url: "https://cdn.example.test",
      },
    ] as never;

    const screen = await render(
      <BazarifyThemeProvider>
        <ProductVariantSelector
          variants={variants}
          selectedVariant={undefined}
          onPress={onPress}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Select an option")).toBeTruthy();
    fireEvent.press(screen.getByTestId("variant-1"));
    fireEvent.press(screen.getByTestId("variant-2"));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(variants[0]);
  });
});
