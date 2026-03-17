import { LayoutRectangle, Text, TouchableOpacity } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import React from "react";
import cn from "@/utils/tailwindHelper";

interface PolygonButtonProps {
  dimensions: { width: number; height: number };
  setDimensions: (e: LayoutRectangle) => void;
  onPress: () => void;
  color: string;
  label: string;
  isLeft: boolean;
  disabled?: boolean;
  className?: string;
}

const PolygonButton = ({
  onPress,
  label,
  color,
  dimensions,
  setDimensions,
  isLeft,
  disabled = false,
  className,
}: PolygonButtonProps) => (
  <TouchableOpacity
    onPress={disabled ? undefined : onPress}
    disabled={disabled}
    className={cn("flex", "items-center", "justify-center", "px-8", className)}
    onLayout={(e) => setDimensions(e.nativeEvent.layout)}
    style={{ opacity: disabled ? 0.55 : 1 }}
  >
    <Svg
      width={dimensions.width}
      height={dimensions.height}
      className="absolute"
      style={{ position: "absolute", top: 0, left: 0 }}
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
        fill={disabled ? "#9CA3AF" : color}
      />
    </Svg>
    <Text className="font-bold text-white">{label}</Text>
  </TouchableOpacity>
);

export default PolygonButton;
