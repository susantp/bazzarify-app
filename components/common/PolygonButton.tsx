import { Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { LayoutRectangle, Pressable, StyleProp, ViewStyle } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import React from "react";

interface PolygonButtonProps {
  dimensions: { width: number; height: number };
  setDimensions: (e: LayoutRectangle) => void;
  onPress: () => void;
  color: string;
  label: string;
  isLeft: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const PolygonButton = ({
  onPress,
  label,
  color,
  dimensions,
  setDimensions,
  isLeft,
  disabled = false,
  style,
}: PolygonButtonProps) => {
  const theme = useBazarifyTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      onLayout={(e) => setDimensions(e.nativeEvent.layout)}
      style={[styles.button, { opacity: disabled ? 0.55 : 1 }, style]}
    >
      <Svg
        width={dimensions.width}
        height={dimensions.height}
        style={styles.background}
      >
        <Polygon
          points={
            isLeft
              ? `
              0,0 
              ${dimensions.width},0 
              ${dimensions.width * 0.88},${dimensions.height} 
              0,${dimensions.height}
            `
              : `
              ${dimensions.width * 0.12},0 
              ${dimensions.width},0 
              ${dimensions.width},${dimensions.height} 
              0,${dimensions.height}
            `
          }
          fill={disabled ? theme.colors.borderStrong : color}
        />
      </Svg>
      <Text variant="label" color="textInverted">
        {label}
      </Text>
    </Pressable>
  );
};

const styles = {
  button: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingHorizontal: 32,
  },
  background: {
    left: 0,
    position: "absolute" as const,
    top: 0,
  },
};

export default PolygonButton;
