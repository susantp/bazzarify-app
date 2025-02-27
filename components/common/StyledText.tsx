import { Text, TextProps } from "react-native";
import React from "react";

const StyledText = (props: TextProps) => (
  <Text {...props}>{props.children}</Text>
);

export default StyledText;
