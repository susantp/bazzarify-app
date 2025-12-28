import { TSearchMetadataPayloadSchema } from "@/modules/product/schemas/responsePayloads/SearchMetadataPayloadSchema";
import { toTitleCase } from "@/modules/core/utils";
import { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import cn from "@/utils/tailwindHelper";
import { primaryColor } from "@/constants/Colors";
import { useAtom } from "jotai";
import { searchFiltersAtom } from "@/atoms/searchFiltersAtom";
import { createInitialSelectedOptions } from "@/modules/product/utils/searchFilters";
import TextInputV1 from "@/components/common/TextInputV1";

interface ICustomFilterComponentProps {
  handleDonePress: () => void;
  metadata?: TSearchMetadataPayloadSchema | null;
}

export const CustomFilterComponent = ({
  handleDonePress,
  metadata,
}: ICustomFilterComponentProps) => {
  const [storedOptions, setStoredOptions] = useAtom(searchFiltersAtom);
  const [selectedOptions, setSelectedOptions] = useState(storedOptions);

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
            ? categoryLabelMap[value] ?? value
            : attributeLabelMap[filterKey]?.[value] ?? value;
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
    <>
      <View className="flex-col gap-y-2 py-2">
        <ThemedText type="subtitle" style={{ color: primaryColor }}>
          Applied Filters
        </ThemedText>
        {appliedChips.length === 0 ? (
          <ThemedText style={{ color: "#64748B" }}>
            No filters applied.
          </ThemedText>
        ) : (
          <View className="flex-row flex-wrap gap-2">
            {appliedChips.map((chip) => (
              <TouchableOpacity
                key={chip.key}
                onPress={chip.onRemove}
                style={{
                  backgroundColor: "transparent",
                  borderColor: primaryColor,
                }}
                className={cn(
                  "flex-row items-center rounded-full border px-3 py-2",
                )}
              >
                <ThemedText style={{ color: primaryColor }}>
                  {chip.label}
                </ThemedText>
                <ThemedText style={{ color: primaryColor }}> x</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View className="flex-col gap-y-2 py-2">
        <ThemedText type="subtitle" style={{ color: primaryColor }}>
          Price Range
        </ThemedText>
        <View className="flex-row gap-x-3">
          <View className="flex-1">
            <TextInputV1
              legend="Min"
              placeholder={`Min (${metadata.price_range.min})`}
              keyboardType="numeric"
              value={selectedOptions.range.price_range.min}
              onChangeText={(value) =>
                handleRangeChange("price_range", "min", value)
              }
            />
          </View>
          <View className="flex-1">
            <TextInputV1
              legend="Max"
              placeholder={`Max (${metadata.price_range.max})`}
              keyboardType="numeric"
              value={selectedOptions.range.price_range.max}
              onChangeText={(value) =>
                handleRangeChange("price_range", "max", value)
              }
            />
          </View>
        </View>
      </View>

      {metadata.attributes?.map((attribute) => (
        <View className="flex-col gap-y-2 py-2" key={attribute.uuid}>
          <ThemedText type="subtitle" style={{ color: primaryColor }}>
            {toTitleCase(attribute.name)}
          </ThemedText>

          <View className="flex-row flex-wrap items-center gap-2">
            {attribute.values.map((option) => {
              const isSelected = selectedOptions.multiple[
                attribute.name
              ]?.includes(option.uuid);

              return (
                <TouchableOpacity
                  key={option.uuid}
                  onPress={() => handleSelect(attribute.name, option.uuid)}
                  style={{
                    backgroundColor: isSelected ? primaryColor : "transparent",
                    borderColor: isSelected ? primaryColor : "#94A3B8",
                  }}
                  className={cn("rounded-full border px-3 py-2")}
                >
                  <ThemedText
                    style={{ color: isSelected ? "#FFFFFF" : primaryColor }}
                  >
                    {option.value}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}

      {/* Categories (MULTI SELECT) */}
      <View className="flex-col gap-y-2 py-2">
        <ThemedText type="subtitle" style={{ color: primaryColor }}>
          Categories
        </ThemedText>

        <View className="flex-row flex-wrap items-center gap-2">
          {metadata.categories?.map((category) => {
            const isSelected = selectedOptions.multiple.categories?.includes(
              category.uuid,
            );

            return (
              <TouchableOpacity
                key={category.uuid}
                onPress={() => handleSelect("categories", category.uuid)}
                style={{
                  backgroundColor: isSelected ? primaryColor : "transparent",
                  borderColor: isSelected ? primaryColor : "#94A3B8",
                }}
                className={cn("rounded-full border px-3 py-2")}
              >
                <ThemedText
                  style={{ color: isSelected ? "#FFFFFF" : primaryColor }}
                  className={isSelected ? "text-white" : undefined}
                >
                  {category.name}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View className="flex-row justify-between gap-x-4 py-4">
        <TouchableOpacity
          onPress={resetFilters}
          disabled={selectedCount === 0}
          className={cn(
            "flex-1 items-center rounded-full py-4",
            selectedCount === 0 ? "bg-slate-300" : "bg-primary",
          )}
        >
          <ThemedText
            style={{
              color: selectedCount ? "#fff" : primaryColor,
            }}
          >
            Reset
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setStoredOptions(selectedOptions);
            handleDonePress();
          }}
          activeOpacity={0.4}
          disabled={selectedCount === 0}
          className={cn(
            "flex-1 items-center rounded-full py-4",
            selectedCount === 0 ? "bg-slate-300" : "bg-primary",
          )}
        >
          <ThemedText
            style={{
              color: selectedCount ? "#fff" : primaryColor,
            }}
          >
            Done{selectedCount > 0 ? ` (${selectedCount})` : ""}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </>
  );
};
