import { TextInput, View } from "react-native";
import { UserCircleIcon } from "react-native-heroicons/solid";

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
      <UserCircleIcon size={28} strokeWidth={1} color="gray" />
    </View>
  </View>
);

export default FullNameInput;
