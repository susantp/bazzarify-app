import React from "react";
import { render } from "@testing-library/react-native";
import { useForm } from "react-hook-form";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import ControlledInput from "@/components/common/ControlledInput";

function ControlledInputFixture() {
  const { control } = useForm({ defaultValues: { email: "" } });

  return (
    <ControlledInput
      name="email"
      control={control}
      style={{ width: "100%", gap: 8 }}
      formField={({
        field,
      }: {
        field: { value: string; onChange: (value: string) => void };
      }) => <>{field.value}</>}
    />
  );
}

describe("ControlledInput", () => {
  it("renders its controlled field inside the owned layout wrapper", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ControlledInputFixture />
      </BazarifyThemeProvider>,
    );

    expect(screen).toBeTruthy();
  });
});
