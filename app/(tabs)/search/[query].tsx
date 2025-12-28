import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useLocalSearchParams } from "expo-router";
import useSearchBarHook from "@/hooks/useSearchBarHook";
import NormalTopBar from "@/components/common/NormalTopBar";
import ContentWrapper from "@/components/common/ContentWrapper";
import { View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import ProductCard from "@/components/common/ProductCard";
import InfiniteProductGrid from "@/modules/core/components/InfiniteProductGrid";
import { ThemedText } from "@/components/ThemedText";
import useProductSearch from "@/modules/product/hooks/useProductSearch";
import { useAtom } from "jotai";
import { searchFiltersAtom } from "@/atoms/searchFiltersAtom";
import { countAppliedFilters } from "@/modules/product/utils/searchFilters";
import { FilterTriggerButton } from "@/modules/product/components/FilterTriggerButton";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { CustomFilterComponent } from "@/modules/product/components/CustomFilterComponent";

export default function Page() {
  const { query: rawQuery } = useLocalSearchParams();
  const currentQuery = Array.isArray(rawQuery)
    ? (rawQuery[0] ?? "")
    : (rawQuery ?? "");
  const { canGoBack, onSearchSubmit, handleChangeText } =
    useSearchBarHook(currentQuery);
  const { queryResult, metadata } = useProductSearch(currentQuery);
  const [filters] = useAtom(searchFiltersAtom);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const renderBackdrop = useCallback(
    // @ts-ignore
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close" // 🔥 THIS enables outside tap close
      />
    ),
    [],
  );
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const snapPoints = useMemo(() => ["85%"], []);
  const { isSuccess, isLoading, isError } = queryResult;
  const appliedFilterCount = useMemo(
    () => countAppliedFilters(filters),
    [filters],
  );

  const handleFilterDone = () => bottomSheetRef.current?.close();
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
            <FilterTriggerButton
              onPress={() => bottomSheetRef.current?.expand()}
              appliedCount={appliedFilterCount}
            />
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
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        onChange={handleSheetChanges}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 16 }}
        >
          <CustomFilterComponent
            metadata={metadata}
            handleDonePress={handleFilterDone}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaWrapper>
  );
}
