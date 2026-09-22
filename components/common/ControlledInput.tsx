import { Box } from "@/components/design-system";
import type { StyleProp, ViewStyle } from "react-native";
import { Controller } from "react-hook-form";
import React from "react";

const ControlledInput = ({ ...props }) => {
  if (props.name === undefined) {
    console.error("controlled input name required");
    return <></>;
  }
  return (
    <Box style={props.style as StyleProp<ViewStyle>}>
      <Controller name={props.name} render={props.formField} {...props} />
    </Box>
  );
};

export default ControlledInput;
