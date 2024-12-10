import { FacebookIcon, GoogleIcon } from "@/components/common/icons";
import React from "react";

export type ProviderMapType = {
  [key in LoginProviderLiteral]: {
    icon: React.ReactNode;
    label: string;
  };
};
export const providerMap: ProviderMapType = {
  google: {
    icon: <GoogleIcon />,
    label: "Google",
  },
  facebook: {
    icon: <FacebookIcon />,
    label: "Facebook",
  },
};

export type LoginProviderLiteral = "google" | "facebook";
