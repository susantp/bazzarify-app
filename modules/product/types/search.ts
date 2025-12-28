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
  single: Record<string, string | null>; // attributeUuid → optionUuid
  multiple: Record<string, string[]>; // filterId → optionUuids[]
};
export type SpatieFilterQuery = {
  filter: Record<string, string>;
};
