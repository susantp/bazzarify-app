import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { primaryColor } from "@/constants/Colors";

interface FilterTriggerButtonProps {
  onPress: () => void;
  appliedCount: number;
}

export const FilterTriggerButton = ({
  onPress,
  appliedCount,
}: FilterTriggerButtonProps) => {
  const hasActiveFilters = appliedCount > 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 999,
        backgroundColor: hasActiveFilters ? primaryColor : "#F8FAFC",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: hasActiveFilters
          ? primaryColor
          : "rgba(2, 132, 199, 0.25)",
        shadowColor: "#0F172A",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: hasActiveFilters ? "#FFFFFF" : primaryColor,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AntDesign
          name="filter"
          color={hasActiveFilters ? primaryColor : "#FFFFFF"}
          size={16}
        />
      </View>
      <ThemedText
        type="defaultSemiBold"
        darkColor={hasActiveFilters ? "#FFFFFF" : primaryColor}
        style={{
          fontSize: 16,
          letterSpacing: 0.6,
          includeFontPadding: false,
        }}
      >
        Filters
      </ThemedText>
      {hasActiveFilters ? (
        <View
          style={{
            minWidth: 24,
            height: 24,
            borderRadius: 12,
            paddingHorizontal: 6,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ThemedText style={{ color: "#FFFFFF", fontSize: 12 }}>
            {appliedCount}
          </ThemedText>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
