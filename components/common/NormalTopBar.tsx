import { TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { ArrowLeftIcon } from "react-native-heroicons/micro";
import { TopBarIcons } from "@/components/home/TopBar";

export interface NormalHeaderProps {
  canGoBack: boolean;
  searchPlaceHolder: string;
  handleSubmitEditing: () => void;
  onChangeText: ((text: string) => void) | undefined;
  searchValue?: string;
}

export default function NormalTopBar({
  canGoBack,
  searchPlaceHolder,
  handleSubmitEditing,
  onChangeText,
  searchValue,
}: NormalHeaderProps) {
  return (
    <View className="flex-row items-center justify-between bg-primary px-2 py-5">
      <View
        className={`flex-1 flex-row items-center gap-x-2 rounded-full bg-white pl-4`}
      >
        <TouchableOpacity
          onPress={() => (canGoBack ? router.back() : router.replace("/"))}
        >
          <ArrowLeftIcon size={24} strokeWidth={9} color="black" />
        </TouchableOpacity>
        <TextInput
          value={searchValue}
          onChangeText={onChangeText}
          autoCorrect={true}
          keyboardType="default"
          returnKeyType="next"
          className="flex-1 rounded-r-full py-3 text-black"
          placeholder={searchPlaceHolder}
          focusable={true}
          onSubmitEditing={handleSubmitEditing}
        />
      </View>

      <TopBarIcons className="w-3/12 flex-row items-center justify-between px-2 md:w-2/12 md:px-4" />
    </View>
  );
}
