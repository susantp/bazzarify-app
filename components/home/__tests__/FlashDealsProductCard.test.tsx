import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import FlashDealsProductCard from "@/components/home/FlashDealsProductCard";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import type { TOmittedProductWithImages } from "@/modules/product/schemas/ProductSchema";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

const item = {
  uuid: "product-1",
  name: "Canvas shoes",
  images: [],
  image_base_url: "https://cdn.example.test",
  available_to_sell: 4,
  can_purchase: true,
  low_stock: false,
} as unknown as TOmittedProductWithImages;

describe("FlashDealsProductCard", () => {
  it("keeps the product route and inventory presentation data-driven", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <FlashDealsProductCard item={item} />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("-20%")).toBeTruthy();
    fireEvent.press(screen.getByRole("button", { name: "Canvas shoes" }));

    expect(router.push).toHaveBeenCalledWith({
      pathname: "/products/[uuid]",
      params: { uuid: "product-1" },
    });
  });
});
