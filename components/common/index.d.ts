import { TextInputProps } from "react-native";
import { FieldError } from "react-hook-form";
import { ReactElement } from "react";

export interface InputProps extends TextInputProps {
  value: string;
  onBlur: () => void;
  onChange: (text: string) => void;
  hasError: FieldError | undefined;
  icon?: ReactElement;
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

export type TForgetPasswordFormField = {
  email: string;
  phone: string;
};

export type TForgetPasswordVerificationFormField = {
  email: string;
  phone: string;
  verification_code: string;
  password: string;
  password_confirmation: string;
};
