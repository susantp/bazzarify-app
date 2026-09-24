import type { ColorSchemeName } from "react-native";

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const radii = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 32, lineHeight: 40, fontWeight: "700" as const },
  displayCompact: { fontSize: 32, lineHeight: 32, fontWeight: "700" as const },
  heading: { fontSize: 24, lineHeight: 32, fontWeight: "700" as const },
  title: { fontSize: 20, lineHeight: 28, fontWeight: "600" as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: "400" as const },
  bodyMedium: { fontSize: 16, lineHeight: 24, fontWeight: "600" as const },
  bodyCompact: { fontSize: 12, lineHeight: 16, fontWeight: "400" as const },
  bodyCompactMedium: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "600" as const,
  },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: "400" as const },
  label: { fontSize: 14, lineHeight: 20, fontWeight: "600" as const },
  link: { fontSize: 14, lineHeight: 30, fontWeight: "400" as const },
} as const;

export const dimensions = {
  controlSm: 36,
  controlMd: 44,
  controlLg: 52,
  iconSm: 16,
  iconMd: 24,
  iconLg: 32,
} as const;

const lightColors = {
  background: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceMuted: "#F8FAFC",
  text: "#11181C",
  textMuted: "#687076",
  textInverted: "#FFFFFF",
  border: "#E2E8F0",
  borderStrong: "#CBD5E1",
  primary: "#F05625",
  primaryPressed: "#D9481C",
  primarySurface: "#FFF1EB",
  locationBar: "#172554",
  success: "#2E7D32",
  warning: "#B7791F",
  danger: "#C62828",
  overlay: "rgba(15, 23, 42, 0.48)",
} as const;

const darkColors = {
  background: "#0F172A",
  surface: "#172033",
  surfaceMuted: "#1E293B",
  text: "#ECEDEE",
  textMuted: "#9BA1A6",
  textInverted: "#11181C",
  border: "#334155",
  borderStrong: "#475569",
  primary: "#F05625",
  primaryPressed: "#FF754A",
  primarySurface: "#4A2116",
  locationBar: "#172554",
  success: "#81C784",
  warning: "#F6C453",
  danger: "#EF9A9A",
  overlay: "rgba(2, 6, 23, 0.72)",
} as const;

export type BazarifyColorName = keyof typeof lightColors;
export type BazarifyColorScheme = "light" | "dark";

export type BazarifyTheme = {
  mode: BazarifyColorScheme;
  colors: Readonly<Record<BazarifyColorName, string>>;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
  dimensions: typeof dimensions;
};

export function createBazarifyTheme(
  colorScheme: ColorSchemeName | null | undefined,
): BazarifyTheme {
  const mode: BazarifyColorScheme = colorScheme === "dark" ? "dark" : "light";

  return {
    mode,
    colors: mode === "dark" ? darkColors : lightColors,
    spacing,
    radii,
    typography,
    dimensions,
  };
}
