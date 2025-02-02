import { Image, Text, TouchableOpacity, View } from "react-native";
import { HeartIcon, ShoppingCartIcon } from "react-native-heroicons/outline";
import { HeaderIconsProps, HeaderProps, SearchBoxProps } from "@/components";
import { ArrowLeftIcon } from "react-native-heroicons/micro";
import { router } from "expo-router";

export const SearchBox = ({ className }: SearchBoxProps) => {
  const canGoBack = router.canGoBack();
  return (
    <TouchableOpacity
      onPress={() => router.push("/search")}
      className={className}
    >
      <View className="h-12 flex-row items-center">
        {canGoBack ? (
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeftIcon size={20} strokeWidth={9} color="black" />
          </TouchableOpacity>
        ) : null}
        <View className="flex-row items-center pl-9">
          <Text className="text-lg">Search on</Text>
          <Image source={require("@/assets/images/iconSmall.png")} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TopBarIcons = ({ className }: HeaderIconsProps) => (
  <View className={className}>
    <TouchableOpacity>
      <HeartIcon size={36} strokeWidth={2} color="white" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => router.push("/cart")}>
      <ShoppingCartIcon size={36} strokeWidth={2} color="white" />
    </TouchableOpacity>
  </View>
);

export default function TopBar({ className }: HeaderProps) {
  return (
    <View className={className}>
      <SearchBox className="flex-1 rounded-full bg-white px-4" />
      <TopBarIcons className="w-3/12 flex-row items-center justify-between px-2 md:w-2/12 md:px-4" />
    </View>
  );
}
