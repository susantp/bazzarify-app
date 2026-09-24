import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { fetchStore } from "@/modules/vendor/data/services/vendorService";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import {
  Box,
  ErrorState,
  Icon,
  Text,
  useBazarifyTheme,
} from "@/components/design-system";

interface VendorHeaderProps {
  vendorUuid?: string;
}

const VendorBanner = ({ vendorUuid }: VendorHeaderProps) => {
  const theme = useBazarifyTheme();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["vendor", vendorUuid, "store"],
    queryFn: () => fetchStore(vendorUuid as string),
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
        testID="vendor-banner-error"
      />
    );
  }

  return (
    <>
      <ImageBackground
        style={[styles.banner, { backgroundColor: theme.colors.locationBar }]}
        imageStyle={{ opacity: 0.3 }}
        // source={{
        //   uri: vendor.bgImgPath,
        // }}
      >
        <Box direction="row" align="center" paddingX="xxl">
          <Box direction="row" align="center" gap="sm" style={styles.identity}>
            <Box>
              {/*<Image*/}
              {/*  source={{ uri: vendor.logo }}*/}
              {/*  style={{ width: 40, height: 40 }}*/}
              {/*/>*/}
            </Box>
            <Box gap="xs">
              <Text variant="title" color="locationBarText">
                {data?.store?.name || "N/A"}
              </Text>
              <Box direction="row" align="center" gap="xs">
                <Text variant="caption" color="primary">
                  100% Authentic
                </Text>
                <Icon size={12} color="primary">
                  {({ color, size }) => (
                    <Ionicons
                      name="shield-checkmark"
                      size={size}
                      color={color}
                    />
                  )}
                </Icon>
              </Box>
              <Box direction="row" align="center" gap="xs">
                <Icon size={12} color="locationBarText">
                  {({ color, size }) => (
                    <FontAwesome size={size} name="user" color={color} />
                  )}
                </Icon>
                <Text variant="caption" color="locationBarText">
                  xxk
                </Text>
              </Box>
            </Box>
          </Box>
          <Box gap="sm" style={styles.actions}>
            <Pressable
              style={[styles.action, { backgroundColor: theme.colors.primary }]}
            >
              <Text variant="label" color="textInverted">
                Follow
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.action,
                styles.chatAction,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Icon size={15} color="textInverted">
                {({ color, size }) => (
                  <Entypo name="chat" size={size} color={color} />
                )}
              </Icon>
              <Text variant="label" color="textInverted">
                Chat
              </Text>
            </Pressable>
          </Box>
        </Box>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  banner: { height: 150, justifyContent: "center" },
  identity: { flex: 3 },
  actions: { flex: 1 },
  action: { alignItems: "center", borderRadius: 6, paddingVertical: 4 },
  chatAction: { flexDirection: "row", justifyContent: "center", gap: 4 },
});

export default VendorBanner;
