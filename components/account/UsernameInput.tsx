import { StyleSheet } from "react-native";
import { InputProps } from "@/components/common";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Input, useBazarifyTheme } from "@/components/design-system";

const UsernameInput = ({
  value,
  onBlur,
  onChange,
  hasError,
  className: _className,
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
            <Ionicons name="mail-outline" size={size} color={color} />
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

export default UsernameInput;
