import {
  StyleSheet,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { HeaderProps } from "@/components";
import { router } from "expo-router";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { cartAtom } from "@/modules/cart/atoms";
import { Badge } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, SearchLauncher } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

type SearchBoxProps = {
  style?: StyleProp<ViewStyle>;
};

export const SearchBox = ({ style }: SearchBoxProps) => {
  const canGoBack = router.canGoBack();

  const goSearch = () => router.push("/search");
  const goBack = () => {
    try {
      router.back();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      router.replace("/");
    }
  };
  return (
    <SearchLauncher
      canGoBack={canGoBack}
      onBackPress={goBack}
      onSearchPress={goSearch}
      style={style}
    />
  );
};

type TopBarIconsProps = {
  className?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const TopBarIcons = ({ style, testID }: TopBarIconsProps) => {
  const cart = useAtomValue(cartAtom);
  const theme = useBazarifyTheme();

  return (
    <Box
      testID={testID}
      direction="row"
      align="center"
      justify="space-between"
      gap="sm"
      style={[styles.topBarIcons, style]}
    >
      <TouchableOpacity accessibilityRole="button">
        <Icon size={32} color="textInverted">
          {({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          )}
        </Icon>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        testID={testID ? `${testID}-cart` : undefined}
        onPress={() => router.push("/cart")}
      >
        <Icon size={32} color="textInverted">
          {({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          )}
        </Icon>
        {cart?.cart?.totals.items_count ? (
          <Badge
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              backgroundColor: theme.colors.surface,
              color: theme.colors.primary,
            }}
          >
            {cart?.cart?.totals.items_count}
          </Badge>
        ) : null}
      </TouchableOpacity>
    </Box>
  );
};

export default function TopBar({ className }: HeaderProps) {
  return (
    <View className={clsx("flex-row items-center bg-primary", className)}>
      {/* Give SearchBox the flex so it owns the horizontal space */}
      <SearchBox style={styles.searchBox} />
      <TopBarIcons style={styles.homeActions} />
    </View>
  );
}

const styles = StyleSheet.create({
  homeActions: { width: "25%" },
  searchBox: { flex: 1 },
  topBarIcons: { minHeight: 44 },
});
