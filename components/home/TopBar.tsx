import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { router } from "expo-router";
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
      <Pressable
        accessibilityLabel="Favorites"
        accessibilityRole="button"
        hitSlop={8}
      >
        <Icon size={32} color="textInverted">
          {({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          )}
        </Icon>
      </Pressable>
      <Pressable
        accessibilityLabel="Cart"
        accessibilityRole="button"
        testID={testID ? `${testID}-cart` : undefined}
        hitSlop={8}
        onPress={() => router.push("/cart")}
      >
        <Icon size={32} color="textInverted">
          {({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          )}
        </Icon>
        {cart?.cart?.totals.items_count ? (
          <Badge
            style={[
              styles.cartBadge,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.primary,
              },
            ]}
          >
            {cart?.cart?.totals.items_count}
          </Badge>
        ) : null}
      </Pressable>
    </Box>
  );
};

type TopBarProps = {
  style?: StyleProp<ViewStyle>;
};

export default function TopBar({ style }: TopBarProps) {
  return (
    <Box
      direction="row"
      align="center"
      backgroundColor="primary"
      paddingX="sm"
      paddingY="xl"
      style={style}
    >
      {/* Give SearchBox the flex so it owns the horizontal space */}
      <SearchBox style={styles.searchBox} />
      <TopBarIcons style={styles.homeActions} />
    </Box>
  );
}

const styles = StyleSheet.create({
  cartBadge: {
    position: "absolute",
    right: -4,
    top: -4,
  },
  homeActions: { width: "25%" },
  searchBox: { flex: 1 },
  topBarIcons: { minHeight: 44 },
});
