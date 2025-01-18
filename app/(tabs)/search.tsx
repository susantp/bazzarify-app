import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderIcons } from "@/components/home/Header";
import ContentWrapper from "@/components/common/ContentWrapper";
import { router } from "expo-router";
import { ArrowLeftIcon } from "react-native-heroicons/micro";
import { TrashIcon } from "react-native-heroicons/outline";
import { randomUUID } from "expo-crypto";
import { useState } from "react";

export default function SearchScreen() {
  const canGoBack = router.canGoBack();
  const ios = Platform.OS === "ios";
  const [searchHistory, setSearchHistory] = useState([
    "women dress",
    "ramen noodels",
    "tennis bat",
    "shoes",
    "tteobokki",
  ]);
  return (
    <SafeAreaWrapper>
      <View className="flex-row items-center justify-between px-2 py-5">
        <View
          className={`flex-1 flex-row items-center gap-x-2 rounded-full bg-white pl-4`}
        >
          {canGoBack ? (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeftIcon size={24} strokeWidth={9} color="black" />
            </TouchableOpacity>
          ) : null}
          <TextInput
            autoCorrect={true}
            keyboardType="default"
            returnKeyType="next"
            className="flex-1 rounded-r-full py-3"
            placeholder={"Hoodie for men"}
            focusable={true}
          />
        </View>

        <HeaderIcons classes="flex-row items-center w-3/12 md:w-2/12  justify-between px-2 md:px-4" />
      </View>
      <ContentWrapper className="gap-y-3 p-4">
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
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
