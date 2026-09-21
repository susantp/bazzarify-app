import React from "react";

export interface IFilterMenuItem {
  id: string;
  label: string;
  sortable?: boolean;
  component?: React.ReactNode;
}

export enum FilterMenuItemEnum {
  BEST_Selling = "bestSelling",
  PRICE = "price",
  FREE_DELIVERY = "freeDelivery",
  CUSTOM_FILTER = "customFilter",
}

export type SelectedOptions = {
  multiple: Record<string, string[]>; // filterId → optionUuids[]
  range: Record<string, { min: string; max: string }>;
};
export type SpatieFilterQuery = Record<string, string>;
export interface ICustomFilterItem extends IFilterMenuItem {
  options: IFilterMenuItem[];
}
