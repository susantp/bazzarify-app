import React from "react";
import { StyleSheet } from "react-native";
import { InputProps } from "@/components/common";
import { Box, Input } from "@/components/design-system";

const NumberInput = ({
  value,
  onBlur,
  onChange,
  hasError,
  icon,
  ...props
}: InputProps) => {
  return (
    <>
      <Input
        {...props}
        keyboardType="number-pad"
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        error={hasError?.message}
        style={styles.input}
      />
      {icon ? <Box style={styles.icon}>{icon}</Box> : null}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 56,
  },
  icon: {
    left: 36,
    position: "absolute",
    top: 16,
  },
});

export default NumberInput;
