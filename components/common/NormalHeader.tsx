import { TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { ArrowLeftIcon } from "react-native-heroicons/micro";
import { HeaderIcons } from "@/components/home/Header";

export interface NormalHeaderProps {
  canGoBack: boolean;
  searchPlaceHolder: string;
}

const NormalHeader = ({ canGoBack, searchPlaceHolder }: NormalHeaderProps) => (
  <View className="flex-row items-center justify-between px-2 py-5">
    <View
      className={`flex-1 flex-row items-center gap-x-2 rounded-full bg-white pl-4`}
    >
      {canGoBack ? (
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon size={24} strokeWidth={9} color="black" />
        </TouchableOpacity>
      ) : null}
      <TextInput
        autoCorrect={true}
        keyboardType="default"
        returnKeyType="next"
        className="flex-1 rounded-r-full py-3"
        placeholder={searchPlaceHolder}
        focusable={true}
      />
    </View>

    <HeaderIcons classes="flex-row items-center w-3/12 md:w-2/12  justify-between px-2 md:px-4" />
  </View>
);

export default NormalHeader;
