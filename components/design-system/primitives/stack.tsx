import React from "react";
import { Box, type BoxProps } from "./box";

export type StackProps = Omit<BoxProps, "direction" | "gap"> & {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  space?: BoxProps["gap"];
};

export function Stack({
  direction = "column",
  space = "md",
  ...props
}: StackProps) {
  return <Box {...props} direction={direction} gap={space} />;
}
