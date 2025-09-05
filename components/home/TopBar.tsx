import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { HeartIcon, ShoppingCartIcon } from "react-native-heroicons/outline";
import { HeaderIconsProps, HeaderProps, SearchBoxProps } from "@/components";
import { ArrowLeftIcon } from "react-native-heroicons/micro";
import { router } from "expo-router";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { cartItemsAtom } from "@/modules/cart/atoms";
import { Badge, Tooltip } from "react-native-paper";
import { Colors } from "@/constants/Colors";

export const SearchBox = ({ className }: SearchBoxProps) => {
  const canGoBack = router.canGoBack();

  const goSearch = () => router.push("/search");
  const goBack = () => router.back();

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
            <ArrowLeftIcon size={20} strokeWidth={2} color="black" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export const TopBarIcons = ({ className }: HeaderIconsProps) => {
  const cartItems = useAtomValue(cartItemsAtom);
  return (
    <View className={className}>
      <TouchableOpacity>
        <HeartIcon size={36} strokeWidth={2} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/cart")}>
        <ShoppingCartIcon size={36} strokeWidth={2} color="white" />
        <Badge
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            backgroundColor: "#fff",
            color: Colors.light.tint,
          }}
        >
          {cartItems.length!}
        </Badge>
      </TouchableOpacity>
    </View>
  );
};

export default function TopBar({ className }: HeaderProps) {
  return (
    <View className={clsx("flex-row items-center", className)}>
      {/* Give SearchBox the flex so it owns the horizontal space */}
      <SearchBox className="flex-1" />
      <TopBarIcons className="w-3/12 flex-row items-center justify-between px-2 md:w-2/12 md:px-4" />
    </View>
  );
}
