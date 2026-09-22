import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ProductSlider from "@/modules/product/components/ProductSlider";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

jest.mock("@/modules/product/utils/constructImageUrl", () => ({
  __esModule: true,
  default: () => [
    {
      title: "Product image",
      description: "Product image",
      image: { uri: "https://cdn.example.test/product.png" },
    },
  ],
}));

jest.mock("@/components/common/ImageSlider", () => ({
  __esModule: true,
  default: () => null,
}));

describe("ProductSlider", () => {
  it("keeps the image surface and favorite action reusable", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductSlider item={{} as never} />
      </BazarifyThemeProvider>,
    );

    const favorite = screen.getByTestId("product-favorite");
    expect(favorite).toBeTruthy();
    fireEvent.press(favorite);
    expect(screen.getByLabelText("Share product")).toBeTruthy();
  });
});
