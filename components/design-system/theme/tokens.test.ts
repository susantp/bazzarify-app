import { createBazarifyTheme } from "./tokens";

describe("Bazarify theme tokens", () => {
  it("provides the light palette by default", () => {
    const theme = createBazarifyTheme(null);

    expect(theme.mode).toBe("light");
    expect(theme.colors.primary).toBe("#F05625");
    expect(theme.spacing.lg).toBe(16);
  });

  it("selects the dark palette when requested", () => {
    const theme = createBazarifyTheme("dark");

    expect(theme.mode).toBe("dark");
    expect(theme.colors.background).toBe("#0F172A");
    expect(theme.colors.text).toBe("#ECEDEE");
  });
});
