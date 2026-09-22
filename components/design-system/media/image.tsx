import React from "react";
import {
  Image as ExpoImage,
  type ImageProps as ExpoImageProps,
} from "expo-image";
import type { ImageStyle, StyleProp } from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";
import type { BazarifyTheme } from "@/components/design-system/theme";

type RadiusToken = keyof BazarifyTheme["radii"];

export type ImageProps = Omit<ExpoImageProps, "style"> & {
  size?: number;
  radius?: RadiusToken | number;
  style?: StyleProp<ImageStyle>;
};

export function Image({ size, radius = "md", style, ...props }: ImageProps) {
  const theme = useBazarifyTheme();

  return (
    <ExpoImage
      {...props}
      contentFit={props.contentFit ?? "cover"}
      style={[
        size ? { height: size, width: size } : null,
        {
          borderRadius:
            typeof radius === "number" ? radius : theme.radii[radius],
        },
        style,
      ]}
    />
  );
}
