import { TSearchMetadataPayloadSchema } from "@/modules/product/schemas/responsePayloads/SearchMetadataPayloadSchema";
import { toTitleCase } from "@/modules/core/utils";
import { useEffect, useMemo, useState } from "react";
import { Pressable } from "react-native";
import { useAtom } from "jotai";
import { searchFiltersAtom } from "@/atoms/searchFiltersAtom";
import { createInitialSelectedOptions } from "@/modules/product/utils/searchFilters";
import TextInputV1 from "@/components/common/TextInputV1";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

interface ICustomFilterComponentProps {
  handleDonePress: () => void;
  metadata?: TSearchMetadataPayloadSchema | null;
}

export const CustomFilterComponent = ({
  handleDonePress,
  metadata,
}: ICustomFilterComponentProps) => {
  const theme = useBazarifyTheme();
  const [storedOptions, setStoredOptions] = useAtom(searchFiltersAtom);
  const [selectedOptions, setSelectedOptions] = useState(storedOptions);

  useEffect(() => {
    setSelectedOptions(storedOptions);
  }, [storedOptions]);

  const handleSelect = (filterId: string, optionId: string) => {
    setSelectedOptions((prev) => {
      const current = prev.multiple[filterId] ?? [];
      const exists = current.includes(optionId);

      return {
        ...prev,
        multiple: {
          ...prev.multiple,
          [filterId]: exists
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        },
      };
    });
  };

  const handleRangeChange = (
    filterId: string,
    key: "min" | "max",
    value: string,
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      range: {
        ...prev.range,
        [filterId]: {
          ...prev.range[filterId],
          [key]: value,
        },
      },
    }));
  };

  const resetFilters = () => {
    setSelectedOptions(createInitialSelectedOptions());
  };

  const handleRemoveValue = (filterId: string, value: string) => {
    setSelectedOptions((prev) => {
      const next = {
        ...prev,
        multiple: {
          ...prev.multiple,
          [filterId]: (prev.multiple[filterId] ?? []).filter(
            (id) => id !== value,
          ),
        },
      };
      setStoredOptions(next);
      return next;
    });
  };

  const handleClearPriceRange = () => {
    setSelectedOptions((prev) => {
      const next = {
        ...prev,
        range: {
          ...prev.range,
          price_range: { min: "", max: "" },
        },
      };
      setStoredOptions(next);
      return next;
    });
  };

  const categoryLabelMap = useMemo(() => {
    const categories = metadata?.categories ?? [];
    return categories.reduce<Record<string, string>>((acc, category) => {
      acc[category.uuid] = category.name;
      return acc;
    }, {});
  }, [metadata?.categories]);

  const attributeLabelMap = useMemo(() => {
    const attributes = metadata?.attributes ?? [];
    return attributes.reduce<Record<string, Record<string, string>>>(
      (acc, attribute) => {
        acc[attribute.name] = attribute.values.reduce<Record<string, string>>(
          (valueAcc, value) => {
            valueAcc[value.uuid] = value.value;
            return valueAcc;
          },
          {},
        );
        return acc;
      },
      {},
    );
  }, [metadata?.attributes]);
  const selectedCount = useMemo(() => {
    const multiCount = Object.values(selectedOptions.multiple).reduce(
      (acc, arr) => acc + arr.length,
      0,
    );

    const rangeCount = Object.values(selectedOptions.range).reduce(
      (acc, range) => acc + (range.min ? 1 : 0) + (range.max ? 1 : 0),
      0,
    );

    return multiCount + rangeCount;
  }, [selectedOptions]);

  const appliedChips = useMemo(() => {
    const chips: Array<{
      key: string;
      label: string;
      onRemove: () => void;
    }> = [];

    const priceRange = selectedOptions.range.price_range;
    if (priceRange.min || priceRange.max) {
      const label =
        priceRange.min && priceRange.max
          ? `Price: ${priceRange.min} - ${priceRange.max}`
          : priceRange.min
            ? `Price: ${priceRange.min}+`
            : `Price: up to ${priceRange.max}`;
      chips.push({
        key: "price_range",
        label,
        onRemove: handleClearPriceRange,
      });
    }

    Object.entries(selectedOptions.multiple).forEach(([filterKey, values]) => {
      values.forEach((value) => {
        const labelValue =
          filterKey === "categories"
            ? (categoryLabelMap[value] ?? value)
            : (attributeLabelMap[filterKey]?.[value] ?? value);
        chips.push({
          key: `${filterKey}:${value}`,
          label: `${toTitleCase(filterKey)}: ${labelValue}`,
          onRemove: () => handleRemoveValue(filterKey, value),
        });
      });
    });

    return chips;
  }, [
    selectedOptions.multiple,
    selectedOptions.range.price_range,
    attributeLabelMap,
    categoryLabelMap,
  ]);

  if (!metadata) return null;
  return (
    <Box gap="sm">
      <Box gap="sm" paddingY="sm">
        <Text variant="title" color="primary">
          Applied Filters
        </Text>
        {appliedChips.length === 0 ? (
          <Text color="textMuted">No filters applied.</Text>
        ) : (
          <Box direction="row" gap="sm" style={{ flexWrap: "wrap" }}>
            {appliedChips.map((chip) => (
              <Pressable
                key={chip.key}
                onPress={chip.onRemove}
                style={{
                  backgroundColor: "transparent",
                  borderColor: theme.colors.primary,
                  borderRadius: theme.radii.pill,
                  borderWidth: 1,
                  flexDirection: "row",
                  paddingHorizontal: theme.spacing.md,
                  paddingVertical: theme.spacing.sm,
                }}
              >
                <Text color="primary">{chip.label}</Text>
                <Text color="primary"> x</Text>
              </Pressable>
            ))}
          </Box>
        )}
      </Box>

      <Box gap="sm" paddingY="sm">
        <Text variant="title" color="primary">
          Price Range
        </Text>
        <Box direction="row" gap="md">
          <Box flex={1}>
            <TextInputV1
              legend="Min"
              placeholder={`Min (${metadata.price_range.min})`}
              keyboardType="numeric"
              value={selectedOptions.range.price_range.min}
              onChangeText={(value) =>
                handleRangeChange("price_range", "min", value)
              }
            />
          </Box>
          <Box flex={1}>
            <TextInputV1
              legend="Max"
              placeholder={`Max (${metadata.price_range.max})`}
              keyboardType="numeric"
              value={selectedOptions.range.price_range.max}
              onChangeText={(value) =>
                handleRangeChange("price_range", "max", value)
              }
            />
          </Box>
        </Box>
      </Box>

      {metadata.attributes?.map((attribute) => (
        <Box gap="sm" paddingY="sm" key={attribute.uuid}>
          <Text variant="title" color="primary">
            {toTitleCase(attribute.name)}
          </Text>

          <Box
            direction="row"
            align="center"
            gap="sm"
            style={{ flexWrap: "wrap" }}
          >
            {attribute.values.map((option) => {
              const isSelected = selectedOptions.multiple[
                attribute.name
              ]?.includes(option.uuid);

              return (
                <Pressable
                  key={option.uuid}
                  onPress={() => handleSelect(attribute.name, option.uuid)}
                  style={{
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : "transparent",
                    borderColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.borderStrong,
                    borderRadius: theme.radii.pill,
                    borderWidth: 1,
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: theme.spacing.sm,
                  }}
                >
                  <Text color={isSelected ? "textInverted" : "primary"}>
                    {option.value}
                  </Text>
                </Pressable>
              );
            })}
          </Box>
        </Box>
      ))}

      {/* Categories (MULTI SELECT) */}
      <Box gap="sm" paddingY="sm">
        <Text variant="title" color="primary">
          Categories
        </Text>

        <Box
          direction="row"
          align="center"
          gap="sm"
          style={{ flexWrap: "wrap" }}
        >
          {metadata.categories?.map((category) => {
            const isSelected = selectedOptions.multiple.categories?.includes(
              category.uuid,
            );

            return (
              <Pressable
                key={category.uuid}
                onPress={() => handleSelect("categories", category.uuid)}
                testID={`filter-category-${category.uuid}`}
                style={{
                  backgroundColor: isSelected
                    ? theme.colors.primary
                    : "transparent",
                  borderColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.borderStrong,
                  borderRadius: theme.radii.pill,
                  borderWidth: 1,
                  paddingHorizontal: theme.spacing.md,
                  paddingVertical: theme.spacing.sm,
                }}
              >
                <Text color={isSelected ? "textInverted" : "primary"}>
                  {category.name}
                </Text>
              </Pressable>
            );
          })}
        </Box>
      </Box>
      <Box direction="row" justify="space-between" gap="lg" paddingY="lg">
        <Pressable
          onPress={resetFilters}
          disabled={selectedCount === 0}
          accessibilityRole="button"
          style={{
            alignItems: "center",
            backgroundColor:
              selectedCount === 0
                ? theme.colors.borderStrong
                : theme.colors.primary,
            borderRadius: theme.radii.pill,
            flex: 1,
            paddingVertical: theme.spacing.lg,
          }}
        >
          <Text color={selectedCount ? "textInverted" : "primary"}>Reset</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setStoredOptions(selectedOptions);
            handleDonePress();
          }}
          disabled={selectedCount === 0}
          accessibilityRole="button"
          style={{
            alignItems: "center",
            backgroundColor:
              selectedCount === 0
                ? theme.colors.borderStrong
                : theme.colors.primary,
            borderRadius: theme.radii.pill,
            flex: 1,
            paddingVertical: theme.spacing.lg,
          }}
        >
          <Text color={selectedCount ? "textInverted" : "primary"}>
            Done{selectedCount > 0 ? ` (${selectedCount})` : ""}
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};
