import { Text, TextInput, TextInputProps, View } from "react-native";
import { forwardRef } from "react";

interface TextInputV1Props extends TextInputProps {
  legend?: string;
}

const TextInputV1 = forwardRef<TextInput, TextInputV1Props>((props, ref) => {
  return (
    <View>
      {props.legend && (
        <View className="py-2">
          <Text className="font-semibold">{props.legend}</Text>
        </View>
      )}
      <View className="flex-col gap-y-2 rounded-xl border border-slate-300 px-1 py-3">
        <TextInput ref={ref} className="px-2" {...props} />
      </View>
    </View>
  );
});

TextInputV1.displayName = "TextInputV1";

export default TextInputV1;
