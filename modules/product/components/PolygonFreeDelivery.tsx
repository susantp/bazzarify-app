import React, { useState } from "react";
import Svg, { Polygon } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Icon, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

const PolygonFreeDelivery = () => {
  const theme = useBazarifyTheme();
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  return (
    <Box direction="row" justify="flex-start" style={{ position: "relative" }}>
      <Svg
        width={dimension.width}
        height={dimension.height}
        style={{ left: 0, position: "absolute", top: 0 }}
      >
        <Polygon
          points={`
              0,0 
              ${dimension.width * 0.88},0 
              ${dimension.width},${dimension.height} 
              0,${dimension.height}
            `}
          fill={theme.colors.primary}
        />
      </Svg>
      <Box
        direction="row"
        align="center"
        gap="sm"
        paddingX="sm"
        paddingY="xs"
        borderRadius="md"
        style={{ width: "83.333333%" }}
        onLayout={(event) => setDimension(event.nativeEvent.layout)}
      >
        <Icon size={16} color="textInverted">
          {({ color, size }) => (
            <MaterialCommunityIcons
              name="truck-delivery"
              size={size}
              color={color}
            />
          )}
        </Icon>
        <Text color="textInverted" variant="bodyCompactMedium">
          FREE DELIVERY
        </Text>
      </Box>
    </Box>
  );
};

export default PolygonFreeDelivery;
