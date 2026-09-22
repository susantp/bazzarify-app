import { StyleSheet, type StyleProp, type TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Input } from "@/components/design-system";

const FullNameInput = ({
  inputPadding,
  defaultValue,
}: {
  inputPadding?: StyleProp<TextStyle>;
  defaultValue: string;
}) => {
  return (
    <Box paddingX="xxl" style={styles.container}>
      <Input
        defaultValue={defaultValue}
        placeholder="Your email/number"
        style={[styles.input, inputPadding]}
      />
      <Icon size={28} color="textMuted">
        {({ color, size }) => (
          <Ionicons name="person-circle-outline" size={size} color={color} />
        )}
      </Icon>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { position: "relative", width: "100%" },
  input: { paddingLeft: 56 },
});

export default FullNameInput;
