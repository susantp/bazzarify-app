import {
  Text as BazarifyText,
  type BazarifyTextProps,
} from "@/components/design-system/primitives";
import type { TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

type LegacyTextVariant = NonNullable<ThemedTextProps["type"]>;

const variantMap: Record<LegacyTextVariant, BazarifyTextProps["variant"]> = {
  default: "bodyCompact",
  title: "displayCompact",
  defaultSemiBold: "bodyCompactMedium",
  subtitle: "bodyMedium",
  link: "link",
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <BazarifyText
      variant={variantMap[type]}
      style={[
        lightColor || darkColor
          ? { color: lightColor ?? darkColor }
          : undefined,
        type === "subtitle" ? { color: "#f47d58" } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
