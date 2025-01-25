import { Text, TextInput, TextInputProps, View } from "react-native";

interface TextInputV1Props extends TextInputProps {
  legend?: string;
}

const TextInputV1 = (props: TextInputV1Props) => {
  return (
    <View>
      {props.legend && (
        <View className="py-2">
          <Text className="font-semibold">{props.legend}</Text>
        </View>
      )}
      <View className="flex-col gap-y-2 rounded-xl border border-slate-300 px-1 py-3">
        <TextInput className="px-2" {...props} />
      </View>
    </View>
  );
};
export default TextInputV1;
