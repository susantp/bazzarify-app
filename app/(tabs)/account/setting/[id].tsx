import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useLocalSearchParams } from "expo-router";
import { settingList } from "@/components/account/setting/data/settingList";
import ScreenHeader from "@/components/common/ScreenHeader";
import { getById } from "@/utils/getById";

const SettingItemScreen = () => {
  const { id } = useLocalSearchParams();
  const setting = getById(id.toString(), settingList);
  return (
    <SafeAreaWrapper>
      <ScreenHeader title={setting?.label} />
      {setting?.screen && setting.screen}
    </SafeAreaWrapper>
  );
};
export default SettingItemScreen;
