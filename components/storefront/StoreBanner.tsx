import { StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchStore } from "@/modules/storefront/data/services/storefrontService";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import {
  Box,
  ErrorState,
  Text,
  useBazarifyTheme,
} from "@/components/design-system";

interface StoreBannerProps {
  storeUuid?: string;
}

const StoreBanner = ({ storeUuid }: StoreBannerProps) => {
  const theme = useBazarifyTheme();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["store", storeUuid, "store"],
    queryFn: () => fetchStore(storeUuid as string),
    staleTime: 5 * 60 * 1000,
  });
  if (isLoading) {
    return <ThemedLoader />;
  }

  if (isError && !data) {
    return (
      <ErrorState
        title="Store details unavailable"
        description="We couldn't load this store. Check your connection and try again."
        action={{ label: "Retry", onPress: () => void refetch() }}
        testID="store-banner-error"
      />
    );
  }

  return (
    <Box
      direction="column"
      gap="sm"
      paddingX="xxl"
      style={[styles.banner, { backgroundColor: theme.colors.locationBar }]}
    >
      <Text variant="title" color="locationBarText">
        {data?.store?.name || "Store"}
      </Text>
      {data?.store?.short_description ? (
        <Text variant="body" color="locationBarText">
          {data.store.short_description}
        </Text>
      ) : null}
    </Box>
  );
};

const styles = StyleSheet.create({
  banner: { minHeight: 120, justifyContent: "center", paddingVertical: 16 },
});

export default StoreBanner;
