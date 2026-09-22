import React from "react";
import { render } from "@testing-library/react-native";
import ProductDescription from "@/components/product/ProductDescription";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import type { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";

jest.mock("@/modules/core/components/LexicalContentView", () => ({
  LexicalContentView: () => null,
}));

const product = {
  description: "A warm jacket",
} as unknown as TProductWithVariantAndImage;

describe("ProductDescription", () => {
  it("keeps the description panel composable and data-driven", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductDescription product={product} />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Description")).toBeTruthy();
    expect(screen.getByText("See more")).toBeTruthy();
  });
});
