import React from "react";
import { render } from "@testing-library/react-native";
import ProductPriceComponent from "@/modules/product/components/ProductPriceComponent";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import type { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";

const item = {
  base_price: 3200,
  selection: { requires_customer_selection: false },
  variants: [],
} as unknown as TProductWithVariantAndImage;

describe("ProductPriceComponent", () => {
  it("keeps currency and selection availability data-driven", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductPriceComponent currency={{ code: "NPR" }} item={item} />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("NPR 3200")).toBeTruthy();
    expect(screen.getByText("Unavailable")).toBeTruthy();
  });
});
