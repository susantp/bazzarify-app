import React, { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { ColorSchemeName } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createBazarifyTheme } from "@/components/design-system/theme/tokens";
import type { BazarifyTheme } from "@/components/design-system/theme/tokens";

type BazarifyThemeContextValue = {
  theme: BazarifyTheme;
};

const BazarifyThemeContext = createContext<
  BazarifyThemeContextValue | undefined
>(undefined);

export function BazarifyThemeProvider({
  children,
  colorScheme,
}: {
  children: ReactNode;
  colorScheme?: ColorSchemeName;
}) {
  const systemColorScheme = useColorScheme();
  const theme = useMemo(
    () => createBazarifyTheme(colorScheme ?? systemColorScheme),
    [colorScheme, systemColorScheme],
  );

  return (
    <BazarifyThemeContext.Provider value={{ theme }}>
      {children}
    </BazarifyThemeContext.Provider>
  );
}

export function useBazarifyTheme(): BazarifyTheme {
  const context = useContext(BazarifyThemeContext);

  if (!context) {
    throw new Error(
      "useBazarifyTheme must be used inside BazarifyThemeProvider",
    );
  }

  return context.theme;
}
