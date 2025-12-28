import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useLocalSearchParams } from "expo-router";
import useSearchBarHook from "@/hooks/useSearchBarHook";
import NormalTopBar from "@/components/common/NormalTopBar";
import ContentWrapper from "@/components/common/ContentWrapper";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import cn from "@/utils/tailwindHelper";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import ProductCard from "@/components/common/ProductCard";
import InfiniteProductGrid from "@/modules/core/components/InfiniteProductGrid";
import { ThemedText } from "@/components/ThemedText";
import {
  IFilterMenuItem,
  SelectedOptions,
  SpatieFilterQuery,
} from "@/modules/product/types/search";
import useProductSearch from "@/modules/product/hooks/useProductSearch";
import { primaryColor } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { TSearchMetadataPayloadSchema } from "@/modules/product/schemas/responsePayloads/SearchMetadataPayloadSchema";
import { toTitleCase } from "@/modules/core/utils";

interface ICustomFilterItem extends IFilterMenuItem {
  options: IFilterMenuItem[];
}

const customFilterItems: ICustomFilterItem[] = [
  {
    id: "price",
    label: "Price",
    options: [
      { id: "min", label: "Min" },
      { id: "max", label: "Max" },
    ],
  },
  {
    id: "rating",
    label: "Rating",
    options: [
      { id: "rating-5", label: "5" },
      { id: "rating-4", label: "4" },
      {
        id: "rating-3",
        label: "3",
      },
      { id: "rating-2", label: "2" },
      { id: "rating-1", label: "1" },
    ],
  },
  {
    id: "servicePromotion",
    label: "Service & Promotion",
    options: [
      { id: "bestSelling", label: "Best Selling" },
      { id: "freeDelivery", label: "Free Delivery" },
      { id: "flashSale", label: "Flash Sale" },
      { id: "voucherMax", label: "Voucher Max" },
    ],
  },
  {
    id: "category",
    label: "Category",
    options: [{ id: "wirelessEarbud", label: "Wireless Earbud" }],
  },
  {
    id: "warrantyType",
    label: "Warrant Type",
    options: [
      { id: "noWarranty", label: "No Warranty" },
      { id: "sellerWarranty", label: "Seller Warranty" },
      { id: "brandWarranty", label: "Brand Warranty" },
    ],
  },
];

export default function Page() {
  const { query: rawQuery } = useLocalSearchParams();
  const currentQuery = Array.isArray(rawQuery)
    ? (rawQuery[0] ?? "")
    : (rawQuery ?? "");
  const { canGoBack, onSearchSubmit, handleChangeText } =
    useSearchBarHook(currentQuery);
  const {
    setFilter,
    showCustomFilter,
    setShowCustomFilter,
    queryResult,
    metadata,
  } = useProductSearch(currentQuery);

  const { isSuccess, isLoading, isError } = queryResult;

  const handleFilterDone = () => setShowCustomFilter(!showCustomFilter);
  return (
    <SafeAreaWrapper>
      <NormalTopBar
        textInputDefaultValue={currentQuery}
        onChangeText={handleChangeText}
        canGoBack={canGoBack}
        searchPlaceHolder="Hoodie for men"
        handleSubmitEditing={onSearchSubmit}
      />
      <ContentWrapper>
        {isLoading ? <ThemedLoader /> : null}
        {isError ? (
          <ThemedText>
            An error occurred while fetching search results.
          </ThemedText>
        ) : null}
        {metadata ? (
          <View className="p-2">
            <TouchableOpacity
              onPress={() => setShowCustomFilter(true)}
              className="w-32 flex-row items-center justify-center gap-x-2 rounded-2xl bg-slate-200"
            >
              <AntDesign name="filter" color={primaryColor} size={20} />
              <ThemedText
                type="defaultSemiBold"
                className="py-2"
                darkColor={primaryColor}
                style={{ fontSize: 20 }}
              >
                Filter
              </ThemedText>
            </TouchableOpacity>
          </View>
        ) : null}
        {!isSuccess ? null : (
          <InfiniteProductGrid
            id="SearchResults"
            numColumns={2}
            queryResult={queryResult}
            selectItems={(p) => p?.products?.data ?? []}
            renderItem={({ item, index }) => (
              <ProductCard item={item} key={index} cols={2} />
            )}
            keyExtractor={(item) => item?.uuid}
          />
        )}
      </ContentWrapper>
      <DemoModalComponent
        type="bottom"
        showModal={showCustomFilter}
        handlePress={() => {
          setShowCustomFilter(!showCustomFilter);
          setFilter(undefined);
        }}
      >
        <CustomFilterComponent
          metadata={metadata}
          filterItems={customFilterItems}
          handleDonePress={handleFilterDone}
        />
      </DemoModalComponent>
    </SafeAreaWrapper>
  );
}

interface ICustomFilterComponentProps {
  filterItems: ICustomFilterItem[];
  handleDonePress: () => void;
  metadata?: TSearchMetadataPayloadSchema | null;
}

const CustomFilterComponent = ({
  filterItems,
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

  const FilterView = () => (
    <ScrollView className="flex-col" showsVerticalScrollIndicator={false}>
      {metadata.attributes?.map((attribute) => (
        <View className="flex-col gap-y-2 py-2" key={attribute.uuid}>
          <Text>{toTitleCase(attribute.name)}</Text>

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
                  className={cn(
                    "rounded-full border px-3 py-2",
                    isSelected
                      ? "border-orange-500 bg-orange-500"
                      : "border-slate-400",
                  )}
                >
                  <Text className={isSelected ? "text-white" : undefined}>
                    {option.value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}

      {/* Categories (MULTI SELECT) */}
      <View className="flex-col gap-y-2 py-2">
        <Text>Categories</Text>

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
                className={cn(
                  "rounded-full border px-3 py-2",
                  isSelected
                    ? "border-orange-500 bg-orange-500"
                    : "border-slate-400",
                )}
              >
                <Text className={isSelected ? "text-white" : undefined}>
                  {category.name}
                </Text>
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
          <Text className="text-white">Reset</Text>
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
          <Text className="text-white">
            Done{selectedCount > 0 ? ` (${selectedCount})` : ""}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  console.log("selected Options: ", buildSpatieFilterQuery(selectedOptions));
  return <FilterView />;
};
