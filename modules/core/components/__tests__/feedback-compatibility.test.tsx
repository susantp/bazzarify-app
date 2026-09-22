import React from "react";
import { render } from "@testing-library/react-native";
import FetchingErrorComponent from "@/modules/core/components/FetchingErrorComponent";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("core feedback compatibility adapters", () => {
  it("routes legacy error and loader surfaces through owned contracts", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <FetchingErrorComponent message="Unable to load products" />
        <ThemedLoader />
      </BazarifyThemeProvider>,
    );

    expect(await screen.findByText("Unable to load products")).toBeTruthy();
    expect(screen.getByLabelText("Loading")).toBeTruthy();
  });
});
