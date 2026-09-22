import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import LoginFormHelperText from "@/components/account/LoginFormHelperText";
import SocialLoginButton from "@/components/account/SocialLoginButton";
import { router } from "expo-router";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("expo-checkbox", () => {
  const { Pressable } = require("react-native");

  return {
    Checkbox: ({
      value,
      onValueChange,
    }: {
      value: boolean;
      onValueChange: (value: boolean) => void;
    }) => (
      <Pressable
        accessibilityRole="checkbox"
        accessibilityLabel="Remember me"
        accessibilityState={{ checked: value }}
        onPress={() => onValueChange(!value)}
      />
    ),
  };
});

describe("auth action components", () => {
  it("renders a provider action with its data-driven label and invokes press", async () => {
    const onPress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <SocialLoginButton
          label="sign in with"
          provider="google"
          onPress={onPress}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("sign in with Google")).toBeTruthy();
    fireEvent.press(
      screen.getByRole("button", { name: "sign in with Google" }),
    );
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("preserves remember-me state and password-reset navigation", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <LoginFormHelperText />
      </BazarifyThemeProvider>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Remember me" });
    expect(checkbox.props.accessibilityState.checked).toBe(false);
    fireEvent.press(checkbox);
    await waitFor(() =>
      expect(
        screen.getByRole("checkbox", { name: "Remember me" }).props
          .accessibilityState.checked,
      ).toBe(true),
    );

    fireEvent.press(screen.getByText("Forget password"));
    expect(router.push).toHaveBeenCalledWith("/auth/request-password-reset");
  });
});
