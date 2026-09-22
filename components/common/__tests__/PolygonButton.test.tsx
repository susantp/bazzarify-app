import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import PolygonButton from "@/components/common/PolygonButton";

describe("PolygonButton", () => {
  it("keeps the label and forwards enabled presses", async () => {
    const onPress = jest.fn();
    const setDimensions = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <PolygonButton
          dimensions={{ width: 120, height: 48 }}
          setDimensions={setDimensions}
          onPress={onPress}
          color="#1A202C"
          label="Buy Now"
          isLeft={false}
        />
      </BazarifyThemeProvider>,
    );

    fireEvent.press(screen.getByRole("button", { name: "Buy Now" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
