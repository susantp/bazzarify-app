import React from "react";
import { render } from "@testing-library/react-native";
import ProductGenericDetails from "@/components/product/ProductGenericDetails";
import { BazarifyThemeProvider, Text } from "@/components/design-system";
import type { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";

const item = {
  name: "Everyday jacket",
} as unknown as TProductWithVariantAndImage;

describe("ProductGenericDetails", () => {
  it("keeps product identity and the nested price panel composable", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductGenericDetails item={item}>
          <Text>Price content</Text>
        </ProductGenericDetails>
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Everyday jacket")).toBeTruthy();
    expect(screen.getByText("100% Authentic")).toBeTruthy();
    expect(screen.getByText("Price content")).toBeTruthy();
  });
});
