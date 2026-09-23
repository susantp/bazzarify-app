import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { Pressable } from "react-native";
import { Box, Icon, PageContent, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import useSearchBarHook from "@/hooks/useSearchBarHook";
import { router } from "expo-router";
import NormalTopBar from "@/components/common/NormalTopBar";
import useSearchHistory from "@/modules/search/hooks/useSearchHistory";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const theme = useBazarifyTheme();
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
      <PageContent backgroundColor="surface" gap="md" padding="lg">
        <Box direction="row" align="center" justify="space-between">
          <Text variant="title">Search History</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear all search history"
            style={{
              alignItems: "center",
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radii.pill,
              flexDirection: "row",
              gap: theme.spacing.xs,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
            }}
            onPress={() => void clearAll()}
          >
            <Text variant="bodyCompact" color="textMuted">
              Clear all
            </Text>
            <Icon size={18} color="text">
              {({ color, size }) => (
                <Ionicons name="trash-outline" size={size} color={color} />
              )}
            </Icon>
          </Pressable>
        </Box>
        <Box direction="row" gap="lg" style={{ flexWrap: "wrap" }}>
          {history.length === 0 ? (
            <Box
              backgroundColor="surfaceMuted"
              borderRadius="xl"
              paddingX="lg"
              paddingY="md"
              style={{
                borderColor: theme.colors.border,
                borderStyle: "dashed",
                borderWidth: 1,
              }}
            >
              <Text variant="bodyCompact" color="textMuted">
                {actor?.type === "user"
                  ? "Your synced searches will appear here."
                  : "Your recent searches will appear here once you start browsing."}
              </Text>
            </Box>
          ) : (
            history.map((item) => (
              <Box
                key={item}
                direction="row"
                align="center"
                gap="sm"
                backgroundColor="surfaceMuted"
                borderRadius="pill"
                paddingX="md"
                paddingY="sm"
                style={{ borderColor: theme.colors.border, borderWidth: 1 }}
              >
                <Pressable
                  onPress={() => {
                    void addEntry(item);
                    router.replace({
                      pathname: "/search/[query]",
                      params: { query: item },
                    });
                  }}
                >
                  <Text variant="bodyCompactMedium" color="textMuted">
                    {item}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${item}`}
                  onPress={() => void removeEntry(item)}
                >
                  <Icon size={16} color="textMuted">
                    {({ color, size }) => (
                      <Ionicons name="close" size={size} color={color} />
                    )}
                  </Icon>
                </Pressable>
              </Box>
            ))
          )}
        </Box>
      </PageContent>
    </SafeAreaWrapper>
  );
}
