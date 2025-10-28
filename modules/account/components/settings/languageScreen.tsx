import { FlatList, Image, Switch, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useAtom } from "jotai";
import { languageAtom } from "@/atoms/languageAtom";
import ContentWrapper from "@/components/common/ContentWrapper";

const LanguageSettingScreen = () => {
  const [languages, setLanguages] = useAtom(languageAtom);

  const handleSwitchChange = (id: string, value: boolean) => {
    setLanguages((prevLanguages) =>
      prevLanguages.map((language) =>
        language.id === id
          ? { ...language, default: value }
          : { ...language, default: !value },
      ),
    );
  };

  return (
    languages.length > 0 && (
      <ContentWrapper className="bg-white">
        <FlatList
          data={languages}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-items-center border-b border-gray-400 px-2 py-2">
              <View className="w-2/12 items-start">
                <Switch
                  value={item.default}
                  thumbColor={item.default ? "white" : "gray"}
                  trackColor={{ true: Colors.light.tint }}
                  onValueChange={(value) => handleSwitchChange(item.id, value)}
                />
              </View>
              <View className="w-8/12 flex-col gap-y-2">
                <Text className="text-md font-semibold">{item.label}</Text>
              </View>
              <View className="w-2/12 items-end">
                <Image source={item.imgSource} />
              </View>
            </View>
          )}
        />
      </ContentWrapper>
    )
  );
};

export default LanguageSettingScreen;
