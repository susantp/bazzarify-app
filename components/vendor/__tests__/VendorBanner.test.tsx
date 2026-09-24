import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import VendorBanner from "@/components/vendor/VendorBanner";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/modules/vendor/data/services/vendorService", () => ({
  fetchStore: jest.fn(),
}));

const mockUseQuery = jest.mocked(useQuery);
const mockRefetch = jest.fn().mockResolvedValue({});
const storeData = { store: { name: "Test Store" } };

describe("VendorBanner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: storeData,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    } as never);
  });

  it("keeps vendor identity and actions data-driven", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <VendorBanner vendorUuid="vendor-1" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Test Store")).toBeTruthy();
    expect(screen.getByText("100% Authentic")).toBeTruthy();
    expect(screen.getByText("Follow")).toBeTruthy();
    expect(screen.getByText("Chat")).toBeTruthy();
  });

  it("shows a retryable error when the initial store query fails", async () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    } as never);

    const screen = await render(
      <BazarifyThemeProvider>
        <VendorBanner vendorUuid="vendor-1" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByTestId("vendor-banner-error")).toBeTruthy();
    expect(screen.getByText("Store details unavailable")).toBeTruthy();
    expect(screen.queryByText("N/A")).toBeNull();

    await fireEvent.press(screen.getByRole("button", { name: "Retry" }));

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it("keeps cached store content visible after a failed refresh", async () => {
    mockUseQuery.mockReturnValue({
      data: storeData,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    } as never);

    const screen = await render(
      <BazarifyThemeProvider>
        <VendorBanner vendorUuid="vendor-1" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Test Store")).toBeTruthy();
    expect(screen.queryByTestId("vendor-banner-error")).toBeNull();
  });

  it("renders store content after a retry succeeds", async () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    } as never);

    const screen = await render(
      <BazarifyThemeProvider>
        <VendorBanner vendorUuid="vendor-1" />
      </BazarifyThemeProvider>,
    );

    await fireEvent.press(screen.getByRole("button", { name: "Retry" }));
    mockUseQuery.mockReturnValue({
      data: storeData,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    } as never);

    await screen.rerender(
      <BazarifyThemeProvider>
        <VendorBanner vendorUuid="vendor-1" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Test Store")).toBeTruthy();
    expect(screen.queryByTestId("vendor-banner-error")).toBeNull();
  });
});
