import { TextInputProps } from "react-native";
import { FieldError } from "react-hook-form";

export interface InputProps extends TextInputProps {
  value: string;
  onBlur: () => void;
  onChange: (text: string) => void;
  hasError: FieldError | undefined;
  className?: string;
}
