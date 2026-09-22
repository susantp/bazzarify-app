import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import DeliveryBar from "@/components/home/DeliveryBar";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

jest.mock(
  "@/components/common/DemoModalComponent",
  () =>
    ({
      children,
      showModal,
    }: {
      children: React.ReactNode;
      showModal: boolean;
    }) =>
      showModal ? children : null,
);

jest.mock("@/components/common/ChooseAddressComponent", () => () => null);

describe("DeliveryBar", () => {
  it("renders the current address and opens its location chooser", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <DeliveryBar
          displayCurrentAddress={{ formattedAddress: "Kathmandu" } as never}
          locationError={null}
          refresh={jest.fn()}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Kathmandu")).toBeTruthy();
    fireEvent.press(screen.getByText("Kathmandu"));
  });

  it("keeps the refresh action available when location fails", async () => {
    const refresh = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <DeliveryBar
          displayCurrentAddress={null}
          locationError="denied"
          refresh={refresh}
        />
      </BazarifyThemeProvider>,
    );

    fireEvent.press(screen.getByText("Refresh Location"));
    expect(refresh).toHaveBeenCalledTimes(1);
  });
});
