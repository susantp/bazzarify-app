import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useLocalSearchParams } from "expo-router";
import useSearchBarHook from "@/hooks/useSearchBarHook";
import NormalTopBar from "@/components/common/NormalTopBar";
import ContentWrapper from "@/components/common/ContentWrapper";
import { Box, Text } from "@/components/design-system";
import React, { useEffect, useMemo, useRef } from "react";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import ProductCard from "@/components/common/ProductCard";
import InfiniteProductGrid from "@/modules/core/components/InfiniteProductGrid";
import useProductSearch from "@/modules/product/hooks/useProductSearch";
import { useAtom, useSetAtom } from "jotai";
import {
  activeSearchQueryAtom,
  searchFiltersAtom,
} from "@/atoms/searchFiltersAtom";
import {
  countAppliedFilters,
  createInitialSelectedOptions,
} from "@/modules/product/utils/searchFilters";
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
  const { canGoBack, onSearchSubmit, handleChangeText, searchQuery } =
    useSearchBarHook(currentQuery);
  const { queryResult, metadata } = useProductSearch(currentQuery);
  const [filters] = useAtom(searchFiltersAtom);
  const [activeSearchQuery, setActiveSearchQuery] = useAtom(
    activeSearchQueryAtom,
  );
  const setFilters = useSetAtom(searchFiltersAtom);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (activeSearchQuery !== currentQuery) {
      setFilters(createInitialSelectedOptions());
      bottomSheetRef.current?.close();
      setActiveSearchQuery(currentQuery);
    }
  }, [activeSearchQuery, currentQuery, setActiveSearchQuery, setFilters]);

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
        searchValue={searchQuery}
        onChangeText={handleChangeText}
        canGoBack={canGoBack}
        searchPlaceHolder="Hoodie for men"
        handleSubmitEditing={onSearchSubmit}
      />
      <ContentWrapper>
        {isLoading ? <ThemedLoader /> : null}
        {isError ? (
          <Text>An error occurred while fetching search results.</Text>
        ) : null}
        {metadata ? (
          <Box padding="sm">
            <FilterTriggerButton
              onPress={() => bottomSheetRef.current?.expand()}
              appliedCount={appliedFilterCount}
            />
          </Box>
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
        backdropComponent={
          // @ts-ignore
          (props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close"
            />
          )
        }
        enablePanDownToClose
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
