import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { StorefrontProductGridFeedback } from "../StorefrontProductGridFeedback";

describe("StorefrontProductGridFeedback", () => {
  it("shows the supplied empty state copy", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <StorefrontProductGridFeedback
          kind="empty"
          title="No products found"
          description="This store has not added any products yet."
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("No products found")).toBeTruthy();
    expect(
      screen.getByText("This store has not added any products yet."),
    ).toBeTruthy();
  });

  it("retries the failed product query from the error state", async () => {
    const onRetry = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <StorefrontProductGridFeedback
          kind="error"
          title="Couldn't load products"
          description="Check your connection and try again."
          retryLabel="Try again"
          onRetry={onRetry}
        />
      </BazarifyThemeProvider>,
    );

    fireEvent.press(screen.getByRole("button", { name: "Try again" }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
