import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { PageContent } from "@/components/design-system/compositions";
import { Text } from "@/components/design-system/primitives";

describe("PageContent composition", () => {
  it("owns the content surface and flex contract", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <PageContent backgroundColor="surfaceMuted">
          <Text testID="content">Results</Text>
        </PageContent>
      </BazarifyThemeProvider>,
    );

    expect(await screen.findByTestId("content")).toHaveTextContent("Results");
  });
});
