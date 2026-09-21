import {
  SelectedOptions,
  SpatieFilterQuery,
} from "@/modules/product/types/search";

export const createInitialSelectedOptions = (): SelectedOptions => ({
  multiple: {
    categories: [],
  },
  range: {
    price_range: {
      min: "",
      max: "",
    },
  },
});

export const buildSpatieFilterQuery = (
  selectedOptions: SelectedOptions,
  searchQuery?: string,
): SpatieFilterQuery => {
  const filter: SpatieFilterQuery = {};

  if (searchQuery) {
    filter["filter[name]"] = searchQuery;
  }

  Object.entries(selectedOptions.multiple).forEach(([filterKey, values]) => {
    if (values.length > 0) {
      filter[`filter[${filterKey}]`] = values.join(",");
    }
  });

  Object.entries(selectedOptions.range).forEach(([filterKey, range]) => {
    if (range.min) {
      filter[`filter[${filterKey}][min]`] = range.min;
    }
    if (range.max) {
      filter[`filter[${filterKey}][max]`] = range.max;
    }
  });

  return filter;
};

export const serializeSpatieFilters = (filters: SpatieFilterQuery): string => {
  const orderedFilters = Object.keys(filters)
    .sort()
    .reduce<SpatieFilterQuery>((acc, key) => {
      acc[key] = filters[key];
      return acc;
    }, {});

  return JSON.stringify(orderedFilters);
};

export const countAppliedFilters = (selectedOptions: SelectedOptions): number => {
  const multiCount = Object.values(selectedOptions.multiple).reduce(
    (acc, arr) => acc + arr.length,
    0,
  );

  const rangeCount = Object.values(selectedOptions.range).reduce(
    (acc, range) => acc + (range.min ? 1 : 0) + (range.max ? 1 : 0),
    0,
  );

  return multiCount + rangeCount;
};
