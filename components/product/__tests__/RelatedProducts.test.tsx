import React from "react";
import { render } from "@testing-library/react-native";
import RelatedProducts from "@/components/product/RelatedProducts";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("RelatedProducts", () => {
  it("keeps the related-products section discoverable", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <RelatedProducts />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Related Products")).toBeTruthy();
    expect(screen.getByText("See more")).toBeTruthy();
  });
});
