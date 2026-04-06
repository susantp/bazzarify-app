import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { Text, TouchableOpacity, View } from "react-native";
import ContentWrapper from "@/components/common/ContentWrapper";
import useSearchBarHook from "@/hooks/useSearchBarHook";
import { router } from "expo-router";
import NormalTopBar from "@/components/common/NormalTopBar";
import useSearchHistory from "@/modules/search/hooks/useSearchHistory";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const { history, clearAll, removeEntry, addEntry, actor } =
    useSearchHistory();
  const { canGoBack, onSearchSubmit, handleChangeText, searchQuery } =
    useSearchBarHook();
  return (
    <SafeAreaWrapper>
      <NormalTopBar
        searchValue={searchQuery}
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
            onPress={() => void clearAll()}
          >
            <Text className="text-sm font-extralight">Clear all</Text>
            <Ionicons name="trash-outline" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-wrap gap-4">
          {history.length === 0 ? (
            <View className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3">
              <Text className="text-sm text-gray-500">
                {actor?.type === "user"
                  ? "Your synced searches will appear here."
                  : "Your recent searches will appear here once you start browsing."}
              </Text>
            </View>
          ) : (
            history.map((item) => (
              <View
                key={item}
                className="flex-row items-center gap-x-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2"
              >
                <TouchableOpacity
                  onPress={() => {
                    void addEntry(item);
                    router.replace({
                      pathname: "/search/[query]",
                      params: { query: item },
                    });
                  }}
                >
                  <Text className="text-sm font-medium text-gray-700">
                    {item}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => void removeEntry(item)}>
                  <Ionicons name="close" size={16} color={Colors.light.icon} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
