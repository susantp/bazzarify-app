import { Image, Text, TouchableOpacity, View } from "react-native";
import { HeartIcon, ShoppingCartIcon } from "react-native-heroicons/outline";
import { HeaderIconsProps, HeaderProps, SearchBoxProps } from "@/components";
import { ArrowLeftIcon } from "react-native-heroicons/micro";
import { router } from "expo-router";

export const SearchBox = ({ classes }: SearchBoxProps) => {
  const canGoBack = router.canGoBack();
  return (
    <TouchableOpacity
      onPress={() => router.push("/search")}
      className={classes}
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

export const HeaderIcons = ({ classes }: HeaderIconsProps) => (
  <View className={classes}>
    <TouchableOpacity>
      <HeartIcon size={36} strokeWidth={2} color="white" />
    </TouchableOpacity>
    <TouchableOpacity>
      <ShoppingCartIcon size={36} strokeWidth={2} color="white" />
    </TouchableOpacity>
  </View>
);

export default function Header({ classes }: HeaderProps) {
  return (
    <View className={classes}>
      <SearchBox classes="flex-1 rounded-full bg-white px-4" />
      <HeaderIcons classes="flex-row items-center w-3/12 md:w-2/12  justify-between px-2 md:px-4" />
    </View>
  );
}
