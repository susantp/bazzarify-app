import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";
import { CustomFilterComponent } from "@/modules/product/components/CustomFilterComponent";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("CustomFilterComponent", () => {
  it("keeps metadata-driven category selection and completion behavior", async () => {
    const handleDonePress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <CustomFilterComponent
          handleDonePress={handleDonePress}
          metadata={
            {
              attributes: [],
              categories: [
                { uuid: "category-1", name: "Shoes", slug: "shoes" },
              ],
              price_range: { min: 0, max: 1000 },
            } as never
          }
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Categories")).toBeTruthy();
    await act(async () => {
      fireEvent.press(screen.getByTestId("filter-category-category-1"));
    });
    expect(await screen.findByText("Done (1)")).toBeTruthy();
    fireEvent.press(screen.getByText("Done (1)"));
    expect(handleDonePress).toHaveBeenCalledTimes(1);
  });
});
