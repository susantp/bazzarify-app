import { router } from "expo-router";
import { TopBarIcons } from "@/components/home/TopBar";
import { SearchAppBar } from "@/components/design-system";

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
    <SearchAppBar
      actions={
        <TopBarIcons className="w-full flex-row items-center justify-between" />
      }
      canGoBack={canGoBack}
      onBackPress={() => (canGoBack ? router.back() : router.replace("/"))}
      onChangeText={onChangeText}
      onSubmitEditing={handleSubmitEditing}
      placeholder={searchPlaceHolder}
      value={searchValue}
    />
  );
}
