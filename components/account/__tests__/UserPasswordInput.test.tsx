import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import UserPasswordInput from "@/components/account/UserPasswordInput";

describe("UserPasswordInput", () => {
  it("keeps password visibility and validation feedback reusable", async () => {
    const setShowPassword = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <UserPasswordInput
          value="secret"
          showPassword
          setShowPassword={setShowPassword}
          onBlur={jest.fn()}
          onChange={jest.fn()}
          hasError={{ message: "Password is required", type: "required" }}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByDisplayValue("secret").props.secureTextEntry).toBe(true);
    expect(screen.getByText("Password is required")).toBeTruthy();

    fireEvent.press(screen.getByTestId("password-visibility-toggle"));
    expect(setShowPassword).toHaveBeenCalledWith(false);
  });
});
