import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import AddressFormComponent from "@/modules/account/components/settings/AddressFormComponent";
import type { AddressFieldType } from "@/modules/account/data/address/addressFields";

const fields: AddressFieldType[] = [
  {
    id: "city",
    label: "City",
    type: "text",
    placeholder: "City",
  },
  { id: "action", label: "Update", type: "none" },
];

describe("AddressFormComponent", () => {
  it("keeps data-driven fields and forwards the action press", async () => {
    const onSubmit = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <AddressFormComponent
          fields={fields}
          existingAddress={null}
          onSubmit={onSubmit}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByPlaceholderText("City")).toBeTruthy();
    fireEvent.press(screen.getByRole("button", { name: "Update" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
