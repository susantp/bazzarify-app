import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import TrackOrderPage from "@/app/(private)/(tabs)/account/order/[id]/tracking";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ id: "order-1" }),
}));
jest.mock("@/hooks/useOrderTracking", () => ({
  __esModule: true,
  default: () => ({
    tracking: {
      currentStatus: "Shipped",
      trackingNumber: "TRACK-1",
      estimatedDeliveryText: "Arrives tomorrow",
      currentStatusDate: "Today",
    },
    orderTrackingData: [],
    isLoading: false,
    error: null,
    isEmpty: true,
    retry: jest.fn().mockResolvedValue(undefined),
  }),
}));
jest.mock("@/components/account/order/DeliveryMileStones", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("@/components/account/order/TimelineItem", () => () => null);
jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("@/components/common/ScreenHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => {
    const { Text } = jest.requireActual("react-native");

    return <Text>{title}</Text>;
  },
}));

describe("TrackOrderPage", () => {
  it("keeps tracking details and the empty timeline state visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <TrackOrderPage />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Track Your Product")).toBeTruthy();
    expect(screen.getByText("Tracking Number")).toBeTruthy();
    expect(screen.getByText("TRACK-1")).toBeTruthy();
    expect(screen.getByText("Tracking timeline is empty")).toBeTruthy();
  });
});
