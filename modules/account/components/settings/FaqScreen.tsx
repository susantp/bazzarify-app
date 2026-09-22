import { useState } from "react";
import { FaqList } from "@/modules/account/data/settings/faqList";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Text, useBazarifyTheme } from "@/components/design-system";
import { PageContent } from "@/components/design-system/compositions";

const FaqScreen = () => {
  const [list, setList] = useState(FaqList);
  const theme = useBazarifyTheme();
  const handlePress = (id: string) => {
    setList((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item,
      ),
    );
  };
  return (
    <PageContent backgroundColor="background">
      <Box gap="sm" padding="sm">
        {list.map((item) => (
          <Box
            key={item.id}
            gap="sm"
            borderRadius="xl"
            style={[styles.card, { borderColor: theme.colors.borderStrong }]}
          >
            <Pressable
              onPress={() => handlePress(item.id)}
              accessibilityRole="button"
              accessibilityState={{ expanded: item.active }}
              testID={`faq-question-${item.id}`}
              style={styles.question}
            >
              <Text variant="body">{item.question}</Text>
              {item.active ? (
                <Icon size={20} color="text">
                  {({ color, size }) => (
                    <Ionicons name="chevron-down" size={size} color={color} />
                  )}
                </Icon>
              ) : (
                <Icon size={20} color="text">
                  {({ color, size }) => (
                    <Ionicons name="chevron-back" size={size} color={color} />
                  )}
                </Icon>
              )}
            </Pressable>
            <Box style={item.active ? styles.answer : styles.collapsed}>
              <Text variant="bodyCompact">{item.answer}</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </PageContent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    padding: 12,
  },
  question: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  answer: {},
  collapsed: { height: 0, overflow: "hidden" },
});
export default FaqScreen;
