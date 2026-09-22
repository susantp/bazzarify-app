import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import UsernameInput from "@/components/account/UsernameInput";

describe("UsernameInput", () => {
  it("keeps the username field and validation feedback reusable", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <UsernameInput
          value="user@example.com"
          onBlur={jest.fn()}
          onChange={jest.fn()}
          hasError={{ message: "Email is required", type: "required" }}
          placeholder="Email"
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByDisplayValue("user@example.com")).toBeTruthy();
    expect(screen.getByText("Email is required")).toBeTruthy();
  });
});
