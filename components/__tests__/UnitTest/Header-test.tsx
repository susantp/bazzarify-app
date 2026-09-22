import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import TopBar from "@/components/home/TopBar";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

jest.mock("expo-router", () => ({
  router: {
    back: jest.fn(),
    canGoBack: jest.fn(() => false),
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

it("renders the search control", async () => {
  const { getByRole } = await render(
    <BazarifyThemeProvider>
      <TopBar />
    </BazarifyThemeProvider>,
  );

  expect(getByRole("button", { name: "Search" })).toBeTruthy();
});

it("opens search when the search control is pressed", async () => {
  const { getByRole } = await render(
    <BazarifyThemeProvider>
      <TopBar />
    </BazarifyThemeProvider>,
  );

  fireEvent.press(getByRole("button", { name: "Search" }));

  expect(router.push).toHaveBeenCalledWith("/search");
});
