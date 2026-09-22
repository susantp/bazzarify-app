import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import ProductCard from "@/components/common/ProductCard";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import type { TOmittedProductWithImages } from "@/modules/product/schemas/ProductSchema";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

const item = {
  uuid: "product-2",
  name: "Travel backpack",
  base_price: 2500,
  images: [],
  image_base_url: "https://cdn.example.test",
  available_to_sell: 2,
  can_purchase: true,
  low_stock: true,
} as unknown as TOmittedProductWithImages;

describe("ProductCard", () => {
  it("keeps product navigation and inventory messaging through owned primitives", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductCard cols={2} item={item} />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Travel backpack")).toBeTruthy();
    expect(screen.getByText("Rs 2500")).toBeTruthy();
    expect(screen.getByText("2 left")).toBeTruthy();

    fireEvent.press(screen.getByRole("button", { name: "Travel backpack" }));
    expect(router.push).toHaveBeenCalledWith({
      pathname: "/products/[uuid]",
      params: { uuid: "product-2" },
    });
  });
});
