import React from "react";
import { render } from "@testing-library/react-native";
import AskQuestionBox from "@/components/product/AskQuestionBox";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("AskQuestionBox", () => {
  it("keeps the sign-in prompt and question surface visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <AskQuestionBox />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Ask a question.")).toBeTruthy();
    expect(screen.getByText("log-in or sign-up to ask question")).toBeTruthy();
  });
});
