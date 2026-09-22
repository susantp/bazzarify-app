import { TextInput, TextInputProps } from "react-native";
import { forwardRef } from "react";
import { Input } from "@/components/design-system/controls";

interface TextInputV1Props extends TextInputProps {
  legend?: string;
}

const TextInputV1 = forwardRef<TextInput, TextInputV1Props>((props, ref) => {
  const { legend, ...inputProps } = props;

  return <Input ref={ref} label={legend} {...inputProps} />;
});

TextInputV1.displayName = "TextInputV1";

export default TextInputV1;
