import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { Text } from "@/components/design-system";
import ContentWrapper from "@/components/common/ContentWrapper";

describe("ContentWrapper", () => {
  it("renders children through the owned layout boundary", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ContentWrapper>
          <Text>Content</Text>
        </ContentWrapper>
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Content")).toBeTruthy();
  });
});
