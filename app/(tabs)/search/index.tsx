import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { Text, TouchableOpacity, View } from "react-native";
import ContentWrapper from "@/components/common/ContentWrapper";
import { TrashIcon } from "react-native-heroicons/outline";
import { randomUUID } from "expo-crypto";
import { useState } from "react";
import useSearchBarHook from "@/hooks/useSearchBarHook";
import { Link } from "expo-router";
import NormalTopBar from "@/components/common/NormalTopBar";

export default function Page() {
  const [searchHistory, setSearchHistory] = useState([
    "women dress",
    "ramen noodels",
    "tennis bat",
    "shoes",
    "tteobokki",
  ]);
  const { canGoBack, onSearchSubmit, handleChangeText } = useSearchBarHook();
  return (
    <SafeAreaWrapper>
      <NormalTopBar
        onChangeText={handleChangeText}
        canGoBack={canGoBack}
        searchPlaceHolder="Hoodie for men"
        handleSubmitEditing={onSearchSubmit}
      />
      <ContentWrapper className="gap-y-3 bg-white p-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xl font-semibold">Search History</Text>
          </View>
          <TouchableOpacity
            className="flex-row items-center gap-x-2 rounded-full bg-gray-100 px-2 py-1"
            onPress={() => setSearchHistory([])}
          >
            <Text className="text-sm font-extralight">Clear all</Text>
            <TrashIcon size={18} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-wrap gap-4">
          {searchHistory.map((item) => (
            <TouchableOpacity
              key={randomUUID()}
              className="rounded-md bg-gray-200 px-2 py-1"
            >
              <Link
                href={{ pathname: "/search/[query]", params: { query: item } }}
              >
                <Text>{item}</Text>
              </Link>
            </TouchableOpacity>
          ))}
        </View>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
