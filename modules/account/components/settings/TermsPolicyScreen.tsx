import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import {
  TermPolicyType,
  termsPolicy,
} from "@/modules/account/data/settings/termsPolicy";
import ContentWrapper from "@/components/common/ContentWrapper";

const TermsPolicyScreen = () => {
  const [termsPolicyState, setTermsPolicyState] = useState(termsPolicy);
  const [activeContent, setActiveContent] = useState<TermPolicyType | null>();
  const handleActiveSwitch = (id: string) => {
    setTermsPolicyState((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false },
      ),
    );
  };
  useEffect(() => {
    const activeTermsPolicy = termsPolicyState.filter((item) => item.active);
    setActiveContent(activeTermsPolicy[0]);
  }, [termsPolicyState]);
  return (
    <ContentWrapper className="gap-y-2 bg-white">
      <View className="flex-row">
        {termsPolicyState.map((item, key) => (
          <TouchableOpacity
            onPress={() => handleActiveSwitch(item.id)}
            key={item.id}
            className={`w-6/12 items-center bg-orange-300 py-2 ${item.active && "border-b-2 border-gray-400"}`}
          >
            <Text className="font-semibold">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="px-2">
        {activeContent && <Text>{activeContent.content}</Text>}
      </View>
    </ContentWrapper>
  );
};

export default TermsPolicyScreen;
