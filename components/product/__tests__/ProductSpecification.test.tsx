import React from "react";
import { render } from "@testing-library/react-native";
import ProductSpecification from "@/components/product/ProductSpecification";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import type { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";

jest.mock("@/modules/core/components/LexicalContentView", () => ({
  LexicalContentView: () => null,
}));

const product = {
  highlights: "Cotton shell",
} as unknown as TProductWithVariantAndImage;

describe("ProductSpecification", () => {
  it("keeps the specification panel and lexical boundary composable", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductSpecification product={product} />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Specification")).toBeTruthy();
  });
});
