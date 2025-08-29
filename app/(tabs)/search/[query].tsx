import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useLocalSearchParams } from "expo-router";
import useSearchBarHook from "@/hooks/useSearchBarHook";
import NormalTopBar from "@/components/common/NormalTopBar";
import ContentWrapper from "@/components/common/ContentWrapper";
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import { useAtom } from "jotai";
import { customFilterModalAtom } from "@/atoms/customFilterModalAtom";
import cn from "@/utils/tailwindHelper";

enum FilterMenuItemEnum {
  BEST_Selling = "bestSelling",
  PRICE = "price",
  FREE_DELIVERY = "freeDelivery",
  CUSTOM_FILTER = "customFilter",
}

interface IFilterMenuItem {
  id: string;
  label: string;
  sortable?: boolean;
  component?: React.ReactNode;
}

const filterMenuItems: IFilterMenuItem[] = [
  {
    id: FilterMenuItemEnum.BEST_Selling,
    label: "Best Selling",
  },
  {
    id: FilterMenuItemEnum.PRICE,
    label: "price",
    sortable: true,
  },
  {
    id: FilterMenuItemEnum.FREE_DELIVERY,
    label: "free delivery",
  },
  {
    id: FilterMenuItemEnum.CUSTOM_FILTER,
    label: "customFilter",
    component: (
      <Ionicons name="options" size={20} color="black" className="rotate-90" />
    ),
  },
];

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
  const { query } = useLocalSearchParams();
  const { canGoBack, onSearchSubmit, handleChangeText } = useSearchBarHook();
  const [filter, setFilter] = useState<IFilterMenuItem | undefined>();
  const [priceSortAsc, setPriceSortAsc] = useState(true);
  const [showCustomFilter, setShowCustomFilter] = useAtom(
    customFilterModalAtom,
  );
  const { height } = useWindowDimensions();
  const handleFilterPress = (item: IFilterMenuItem) => {
    setFilter(item);
    item.id === FilterMenuItemEnum.PRICE && setPriceSortAsc(!priceSortAsc);
    item.id === FilterMenuItemEnum.CUSTOM_FILTER &&
      setShowCustomFilter(!showCustomFilter);
  };
  const handleFilterDone = () => setShowCustomFilter(!showCustomFilter);
  const renderFilterItem = ({ item }: ListRenderItemInfo<IFilterMenuItem>) => (
    <TouchableOpacity
      activeOpacity={0.4}
      className={`flex-row items-center gap-x-2 rounded-md border border-slate-300 px-4 py-1 ${item.id === filter?.id ? "bg-orange-600 text-white" : undefined}`}
      onPress={() => handleFilterPress(item)}
    >
      {item.component ? (
        item.component
      ) : (
        <Text
          className={`text-md ${item.id === filter?.id ? "text-white" : undefined}`}
        >
          {item.label}
        </Text>
      )}

      {item.sortable && (
        <Ionicons
          name={
            filter?.id !== item.id
              ? "chevron-expand"
              : priceSortAsc
                ? "chevron-up"
                : "chevron-down"
          }
          size={16}
          color={item.id === filter?.id ? "white" : "black"}
        />
      )}
    </TouchableOpacity>
  );
  return (
    <SafeAreaWrapper>
      <NormalTopBar
        textInputDefaultValue={query.toString()}
        onChangeText={handleChangeText}
        canGoBack={canGoBack}
        searchPlaceHolder="Hoodie for men"
        handleSubmitEditing={onSearchSubmit}
      />
      <ContentWrapper>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerClassName="p-1 flex gap-x-2 items-center"
            data={filterMenuItems}
            renderItem={renderFilterItem}
            keyExtractor={(item: IFilterMenuItem) => item.id}
          />
        </View>
        {/*<ContentGridSection*/}
        {/*  className="align-center flex-col bg-white"*/}
        {/*  title={"Popular Items"}*/}
        {/*  items={popularItemsData}*/}
        {/*  horizontal={false}*/}
        {/*  cols={2}*/}
        {/*/>*/}
      </ContentWrapper>
      <DemoModalComponent
        type="bottom"
        height={height * 0.4}
        showModal={showCustomFilter}
        handlePress={() => {
          setShowCustomFilter(!showCustomFilter);
          setFilter(undefined);
        }}
      >
        <CustomFilterComponent
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
}

const CustomFilterComponent = ({
  filterItems,
  handleDonePress,
}: ICustomFilterComponentProps) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string | null>
  >({});

  const handleSelect = (filterId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [filterId]: prev[filterId] === optionId ? null : optionId, // Toggle selection
    }));
  };
  return (
    <ScrollView className="flex-col" showsVerticalScrollIndicator={false}>
      {filterItems.map((item) => (
        <View className="flex-col gap-y-2 py-2" key={item.id}>
          <Text>{item.label}</Text>
          <View className="flex-row flex-wrap items-center gap-2">
            {item.options.map((option) => {
              const isSelected = selectedOptions[item.id] === option.id;
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(item.id, option.id)}
                  className={cn(
                    "rounded-full",
                    "border",
                    "px-3",
                    "py-2",
                    isSelected ? "bg-orange-500" : "border-slate-400",
                  )}
                  key={option.id}
                >
                  <Text className={cn(isSelected ? "text-white" : undefined)}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
      <View className="flex-row justify-between gap-x-4 py-4">
        <TouchableOpacity
          onPress={() => setSelectedOptions({})} // Reset selections
          className="flex-1 items-center rounded-full bg-orange-600 py-4"
        >
          <Text className="text-white">Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDonePress}
          activeOpacity={0.4}
          className="flex-1 items-center rounded-full bg-orange-600 py-4"
        >
          <Text className="text-white">Done (200)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
