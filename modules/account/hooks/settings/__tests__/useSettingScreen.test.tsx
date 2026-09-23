import React from "react";
import { FlatList } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import useSettingScreen from "@/modules/account/hooks/settings/useSettingScreen";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("jotai", () => {
  const actual = jest.requireActual("jotai");

  return { ...actual, useAtomValue: () => [] };
});

jest.mock("@/atoms/languageAtom", () => ({
  filteredDefaultLanguage: {},
}));

jest.mock("@/modules/auth/session/sessionController", () => ({
  logoutAuthSession: jest.fn(),
}));

function SettingsHarness() {
  const { renderSettingItem } = useSettingScreen();

  return (
    <FlatList
      data={[{ id: "language", label: "Language" }]}
      keyExtractor={(item) => item.id}
      renderItem={renderSettingItem}
    />
  );
}

describe("useSettingScreen", () => {
  it("keeps settings rows pressable and routes by setting id", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <SettingsHarness />
      </BazarifyThemeProvider>,
    );

    fireEvent.press(screen.getByRole("button", { name: "Language" }));
    expect(router.push).toHaveBeenCalledWith("/account/setting/language");
  });
});
