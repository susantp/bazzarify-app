import React from "react";
import { Href } from "expo-router";

export type ProfileMenuBoxType = {
  label: string;
  id: string;
  status?: string | string[];
  icon: React.ReactNode;
  action?: {
    label: string;
    route?: Href;
  };
};
