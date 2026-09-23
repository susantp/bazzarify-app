import { StyleSheet } from "react-native";
import { InputProps } from "@/components/common";
import { AntDesign } from "@expo/vector-icons";
import { Box, Icon, Input, useBazarifyTheme } from "@/components/design-system";

const NameInput = ({
  value,
  onBlur,
  onChange,
  hasError,
  ...rest
}: InputProps) => {
  const theme = useBazarifyTheme();

  return (
    <>
      <Input
        {...rest}
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        placeholder="Your name"
        error={hasError?.message}
        style={styles.input}
      />
      <Box
        align="center"
        justify="center"
        borderRadius="pill"
        style={[
          styles.iconSurface,
          { backgroundColor: theme.colors.surfaceMuted },
        ]}
      >
        <Icon size={20} color="textMuted">
          {({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          )}
        </Icon>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  input: { paddingHorizontal: 64 },
  iconSurface: {
    height: 36,
    left: 16,
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -18 }],
    width: 36,
  },
});

export default NameInput;
