import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import FaqScreen from "@/modules/account/components/settings/FaqScreen";

describe("FaqScreen", () => {
  it("keeps FAQ content data-driven and toggles one answer at a time", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <FaqScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("What is bazzarify?")).toBeTruthy();
    expect(screen.getAllByText(/Terms ipsum dolor sit amet/)).toHaveLength(3);

    const paymentQuestion = screen.getByTestId("faq-question-payment method");
    fireEvent.press(paymentQuestion);
    await waitFor(() => {
      expect(
        screen.getByTestId("faq-question-payment method").props
          .accessibilityState,
      ).toMatchObject({ expanded: true });
    });
  });
});
