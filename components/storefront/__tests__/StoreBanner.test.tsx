import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import StoreBanner from "@/components/storefront/StoreBanner";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/modules/storefront/data/services/storefrontService", () => ({
  fetchStore: jest.fn(),
}));

const mockUseQuery = jest.mocked(useQuery);
const mockRefetch = jest.fn().mockResolvedValue({});
const storeData = {
  store: { name: "Test Store", short_description: "A real store description" },
};

describe("StoreBanner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: storeData,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    } as never);
  });

  it("shows the store identity and description from the store response", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <StoreBanner storeUuid="store-1" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Test Store")).toBeTruthy();
    expect(screen.getByText("A real store description")).toBeTruthy();
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
        <StoreBanner storeUuid="store-1" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByTestId("store-banner-error")).toBeTruthy();
    expect(screen.getByText("Store details unavailable")).toBeTruthy();
    expect(screen.queryByText("Store")).toBeNull();

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
        <StoreBanner storeUuid="store-1" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Test Store")).toBeTruthy();
    expect(screen.queryByTestId("store-banner-error")).toBeNull();
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
        <StoreBanner storeUuid="store-1" />
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
        <StoreBanner storeUuid="store-1" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Test Store")).toBeTruthy();
    expect(screen.queryByTestId("store-banner-error")).toBeNull();
  });
});
