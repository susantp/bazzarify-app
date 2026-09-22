import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { HeaderProps, SearchBoxProps } from "@/components";
import { router } from "expo-router";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { cartAtom } from "@/modules/cart/atoms";
import { Badge } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export const SearchBox = ({ className }: SearchBoxProps) => {
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
    <View className={clsx("relative", className)}>
      {/* Make the entire pill tappable */}
      <Pressable
        onPress={goSearch}
        accessibilityRole="button"
        accessibilityLabel="Search"
        hitSlop={6}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        className="h-12 w-full flex-row items-center rounded-full bg-white px-4"
      >
        {/* Reserve space so text doesn't jump when back appears */}
        <View className="flex-1 flex-row items-center pl-8">
          <Text className="mr-2 text-lg">Search on</Text>
          <Image source={require("@/assets/images/iconSmall.png")} />
        </View>
      </Pressable>

      {/* Independent back button layered above the pill */}
      {canGoBack && (
        <View
          pointerEvents="box-none"
          className="absolute left-0 top-0 h-12 w-12"
        >
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={12}
            className="h-full w-full items-center justify-center"
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons name="arrow-back" size={20} color="black" />
          </Pressable>
        </View>
      )}
    </View>
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
      <SearchBox className="flex-1" />
      <TopBarIcons style={styles.homeActions} />
    </View>
  );
}

const styles = StyleSheet.create({
  homeActions: { width: "25%" },
  topBarIcons: { minHeight: 44 },
});
