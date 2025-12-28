import { atom } from "jotai";
import { createInitialSelectedOptions } from "@/modules/product/utils/searchFilters";

export const searchFiltersAtom = atom(createInitialSelectedOptions());
