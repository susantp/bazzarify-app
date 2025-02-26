import { View } from "react-native";
import { Controller } from "react-hook-form";
import React from "react";

const ControlledInput = ({ ...props }) => {
  if (props.name === undefined) {
    console.error("controlled input name required");
    return <></>;
  }
  console.log(props.name);
  return (
    <View className={props.className}>
      <Controller
        control={props.control}
        rules={{
          required: true,
        }}
        render={props.formField}
        name={props.name}
      />
    </View>
  );
};

export default ControlledInput;
