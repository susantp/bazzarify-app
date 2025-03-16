import { View } from "react-native";
import { Controller } from "react-hook-form";
import React from "react";

const ControlledInput = ({ ...props }) => {
  if (props.name === undefined) {
    console.error("controlled input name required");
    return <></>;
  }
  return (
    <View className={props.className}>
      <Controller name={props.name} render={props.formField} {...props} />
    </View>
  );
};

export default ControlledInput;
