import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FullNameInput = ({
  inputPadding,
  defaultValue,
}: {
  inputPadding: string;
  defaultValue: string;
}) => (
  <View className="relative w-full px-6">
    <TextInput
      defaultValue={defaultValue}
      placeholder="Your email/number"
      className={`rounded-md bg-white pl-14 ${inputPadding}`}
    />
    <View className="absolute inset-x-9 inset-y-3">
      <Ionicons name="person-circle-outline" size={28} color="gray" />
    </View>
  </View>
);

export default FullNameInput;
