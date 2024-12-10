import { TextInput, View } from "react-native";
import { EnvelopeIcon } from "react-native-heroicons/outline";

const UsernameInput = ({
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
      <EnvelopeIcon size={28} strokeWidth={1} color="gray" />
    </View>
  </View>
);

export default UsernameInput;
