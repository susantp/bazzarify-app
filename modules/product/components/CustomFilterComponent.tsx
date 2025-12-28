import { TSearchMetadataPayloadSchema } from "@/modules/product/schemas/responsePayloads/SearchMetadataPayloadSchema";
import { toTitleCase } from "@/modules/core/utils";
import { useMemo, useState } from "react";
import {
  SelectedOptions,
  SpatieFilterQuery,
} from "@/modules/product/types/search";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import cn from "@/utils/tailwindHelper";
import { primaryColor } from "@/constants/Colors";

interface ICustomFilterComponentProps {
  handleDonePress: () => void;
  metadata?: TSearchMetadataPayloadSchema | null;
}

export const CustomFilterComponent = ({
  handleDonePress,
  metadata,
}: ICustomFilterComponentProps) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    single: {},
    multiple: {
      categories: [],
    },
  });

  const handleSelect = (
    filterId: string,
    optionId: string,
    mode: "single" | "multiple",
  ) => {
    setSelectedOptions((prev) => {
      if (mode === "single") {
        return {
          ...prev,
          single: {
            ...prev.single,
            [filterId]: prev.single[filterId] === optionId ? null : optionId,
          },
        };
      }

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
  const resetFilters = () => {
    setSelectedOptions({
      single: {},
      multiple: {
        categories: [],
      },
    });
  };
  const buildSpatieFilterQuery = (
    selectedOptions: SelectedOptions,
  ): SpatieFilterQuery => {
    const filter: Record<string, string> = {};

    // Single-select filters
    Object.entries(selectedOptions.single).forEach(([filterKey, value]) => {
      if (value) {
        filter[filterKey] = value;
      }
    });

    // Multi-select filters
    Object.entries(selectedOptions.multiple).forEach(([filterKey, values]) => {
      if (values.length > 0) {
        filter[filterKey] = values.join(",");
      }
    });

    return { filter };
  };
  const selectedCount = useMemo(() => {
    const singleCount = Object.values(selectedOptions.single).filter(
      Boolean,
    ).length;

    const multiCount = Object.values(selectedOptions.multiple).reduce(
      (acc, arr) => acc + arr.length,
      0,
    );

    return singleCount + multiCount;
  }, [selectedOptions]);

  if (!metadata) return null;
  const FilterView = () => {
    return (
      <>
        {metadata.attributes?.map((attribute) => (
          <View className="flex-col gap-y-2 py-2" key={attribute.uuid}>
            <ThemedText type="subtitle" style={{ color: primaryColor }}>
              {toTitleCase(attribute.name)}
            </ThemedText>

            <View className="flex-row flex-wrap items-center gap-2">
              {attribute.values.map((option) => {
                const isSelected =
                  selectedOptions.single[attribute.name] === option.uuid;

                return (
                  <TouchableOpacity
                    key={option.uuid}
                    onPress={() =>
                      handleSelect(attribute.name, option.uuid, "single")
                    }
                    style={{
                      backgroundColor: isSelected
                        ? primaryColor
                        : "transparent",
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
                  onPress={() =>
                    handleSelect("categories", category.uuid, "multiple")
                  }
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
            onPress={handleDonePress}
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
  return <FilterView />;
};
