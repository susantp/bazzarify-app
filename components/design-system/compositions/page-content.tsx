import React from "react";
import { Box, type BoxProps } from "@/components/design-system/primitives";
import type { BazarifyColorName } from "@/components/design-system/theme";

export type PageContentProps = Omit<BoxProps, "backgroundColor"> & {
  backgroundColor?: BazarifyColorName;
};

export function PageContent({
  backgroundColor = "background",
  flex = 1,
  ...props
}: PageContentProps) {
  return <Box {...props} flex={flex} backgroundColor={backgroundColor} />;
}
