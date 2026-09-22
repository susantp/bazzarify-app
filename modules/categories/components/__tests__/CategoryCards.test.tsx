import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import CategoryCard from "@/modules/categories/components/CategoryCard";
import ChildCategoryHorizontal from "@/modules/categories/components/ChildCategoryHorizontal";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import type { TCategoryWithImage } from "@/modules/product/schemas/CategorySchema";

const category = {
  uuid: "category-1",
  name: "Shoes",
  slug: "shoes",
  image_base_path: "",
  image_base_url: "",
  icon_base_path: "",
  icon_base_url: "",
  images: [],
} satisfies TCategoryWithImage;

describe("category cards", () => {
  it("keeps the grid card data-driven and pressable", async () => {
    const onPress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <CategoryCard
          cols={3}
          hasImages={false}
          item={category}
          onPress={onPress}
        />
      </BazarifyThemeProvider>,
    );

    fireEvent.press(screen.getByRole("button", { name: "Shoes" }));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByText("S")).toBeTruthy();
  });

  it("shares the same owned avatar and label contract horizontally", async () => {
    const onPress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <ChildCategoryHorizontal item={category} onPress={onPress} />
      </BazarifyThemeProvider>,
    );

    fireEvent.press(screen.getByRole("button", { name: "Shoes" }));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByText("S")).toBeTruthy();
  });
});
