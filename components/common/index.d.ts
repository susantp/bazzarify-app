import { TextInputProps } from "react-native";
import { FieldError } from "react-hook-form";

export interface InputProps extends TextInputProps {
  value: string;
  onBlur: () => void;
  onChange: (text: string) => void;
  hasError: FieldError | undefined;
  className?: string;
}

export interface IControlledFormFieldProps {
  field: {
    onChange: () => void;
    onBlur: () => void;
    value: string;
  };
}

export type TRegisterFormField = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type TLoginFormField = {
  email: string;
  password: string;
};
