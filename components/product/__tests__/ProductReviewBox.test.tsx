import React from "react";
import { render } from "@testing-library/react-native";
import ProductReviewBox from "@/components/product/ProductReviewBox";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("ProductReviewBox", () => {
  it("renders the review collection with stable cards", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductReviewBox />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Reviews")).toBeTruthy();
    expect(screen.getAllByText("Ayush P.")).toHaveLength(11);
    expect(
      screen.getAllByText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      ),
    ).toHaveLength(11);
  });
});
