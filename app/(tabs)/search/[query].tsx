import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useLocalSearchParams } from "expo-router";
import useSearchBarHook from "@/hooks/useSearchBarHook";
import NormalTopBar from "@/components/common/NormalTopBar";
import ContentWrapper from "@/components/common/ContentWrapper";
import { TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import ProductCard from "@/components/common/ProductCard";
import InfiniteProductGrid from "@/modules/core/components/InfiniteProductGrid";
import { ThemedText } from "@/components/ThemedText";
import useProductSearch from "@/modules/product/hooks/useProductSearch";
import { primaryColor } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

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
  const {
    setFilter,
    showCustomFilter,
    setShowCustomFilter,
    queryResult,
    metadata,
  } = useProductSearch(currentQuery);
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
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.expand()}
              // className="w-32 flex-row items-center justify-center gap-x-2 rounded-2xl bg-slate-200 p-5"
              style={{
                width: 120,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                borderRadius: 24,
                backgroundColor: "#E2E8F0",
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <AntDesign name="filter" color={primaryColor} size={20} />
              <ThemedText
                type="defaultSemiBold"
                darkColor={primaryColor}
                style={{
                  fontSize: 20,
                  includeFontPadding: false,
                  lineHeight: 22,
                }}
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
