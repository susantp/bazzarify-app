import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useLocalSearchParams } from "expo-router";
import useSearchBarHook from "@/hooks/useSearchBarHook";
import NormalTopBar from "@/components/common/NormalTopBar";
import ContentWrapper from "@/components/common/ContentWrapper";
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ContentGridSection from "@/components/home/ContentGridSection";
import { popularItemsData } from "@/constants/popularItemsData";

enum FilterMenuItemEnum {
  BEST_Selling = "bestSelling",
  PRICE = "price",
  FREE_DELIVERY = "freeDelivery",
}

type FilterMenuItemType = {
  id: string;
  label: string;
  sortable?: boolean;
};
const filterMenuItems: FilterMenuItemType[] = [
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
];

export default function Page() {
  const { query } = useLocalSearchParams();
  const { canGoBack, onSearchSubmit, handleChangeText } = useSearchBarHook();
  const [filter, setFilter] = useState<FilterMenuItemType | undefined>();
  const [priceSortAsc, setPriceSortAsc] = useState(true);
  const handleFilterPress = (item: FilterMenuItemType) => {
    setFilter(item);
    item.id === FilterMenuItemEnum.PRICE && setPriceSortAsc(!priceSortAsc);
  };
  const renderFilterItem = ({
    item,
  }: ListRenderItemInfo<FilterMenuItemType>) => (
    <TouchableOpacity
      activeOpacity={0.4}
      className={`flex-row items-center gap-x-2 rounded-md border border-slate-300 px-6 py-1 ${item.id === filter?.id ? "bg-orange-600 text-white" : undefined}`}
      onPress={() => handleFilterPress(item)}
    >
      <Text
        className={`text-md ${item.id === filter?.id ? "text-white" : undefined}`}
      >
        {item.label}
      </Text>
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
            horizontal={true}
            contentContainerClassName="p-1 flex gap-x-2 items-center"
            data={filterMenuItems}
            renderItem={renderFilterItem}
            keyExtractor={(item: FilterMenuItemType) => item.id}
          />
        </View>
        <ContentGridSection
          className="align-center flex-col bg-white"
          title={"Popular Items"}
          items={popularItemsData}
          horizontal={false}
          cols={2}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
