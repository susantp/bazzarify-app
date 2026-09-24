import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import type { IHomeCardComponent } from "@/modules/home/types";
import type { THomeCategoriesPayload } from "@/modules/product/schemas/responsePayloads/HomeCategoriesPayloadSchema";
import type { TCategoryWithImage } from "@/modules/product/schemas/CategorySchema";
import VendorCategories from "../VendorCategories";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

const category = {
  uuid: "category-1",
  name: "Kitchen & Dining",
  slug: "kitchen-dining",
  image_base_path: "",
  image_base_url: "",
  icon_base_path: "",
  icon_base_url: "",
  images: [],
} satisfies TCategoryWithImage;

const makeQueryResult = (
  values: Record<string, unknown> = {},
): IHomeCardComponent<THomeCategoriesPayload | undefined>["queryResult"] =>
  ({
    data: null,
    error: null,
    isError: false,
    isLoading: false,
    refetch: jest.fn(),
    ...values,
  }) as never;

const renderCategories = (
  queryResult: IHomeCardComponent<
    THomeCategoriesPayload | undefined
  >["queryResult"],
) =>
  render(
    <BazarifyThemeProvider>
      <VendorCategories queryResult={queryResult} />
    </BazarifyThemeProvider>,
  );

describe("VendorCategories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("preserves the loading state", async () => {
    const screen = await renderCategories(makeQueryResult({ isLoading: true }));

    expect(screen.getByText("Loading")).toBeTruthy();
  });

  it("shows generic retry feedback without exposing the transport error", async () => {
    const refetch = jest.fn();
    const screen = await renderCategories(
      makeQueryResult({
        isError: true,
        error: new Error("ECONNREFUSED private.internal:3000"),
        refetch,
      }),
    );

    expect(screen.getByTestId("vendor-categories-error")).toBeTruthy();
    expect(screen.getByText("Couldn't load categories")).toBeTruthy();
    expect(screen.queryByText(/ECONNREFUSED|private\.internal/)).toBeNull();

    await fireEvent.press(screen.getByRole("button", { name: "Retry" }));

    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it("shows the owned empty state for a successful empty response", async () => {
    const screen = await renderCategories(
      makeQueryResult({ data: { homeCategories: { data: [] } } }),
    );

    expect(screen.getByTestId("vendor-categories-empty")).toBeTruthy();
    expect(screen.getByText("No categories yet")).toBeTruthy();
  });

  it("renders populated categories and preserves category navigation", async () => {
    const screen = await renderCategories(
      makeQueryResult({ data: { homeCategories: { data: [category] } } }),
    );

    await fireEvent.press(
      screen.getByRole("button", { name: "Kitchen & Dining" }),
    );

    expect(router.push).toHaveBeenCalledWith({
      pathname: "/categories/[child]",
      params: { child: "kitchen-dining" },
    });
  });
});
