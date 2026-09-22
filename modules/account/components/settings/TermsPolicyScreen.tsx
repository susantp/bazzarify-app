import { Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import {
  TermPolicyType,
  termsPolicy,
} from "@/modules/account/data/settings/termsPolicy";
import { Box, Text, useBazarifyTheme } from "@/components/design-system";
import { PageContent } from "@/components/design-system/compositions";

const TermsPolicyScreen = () => {
  const [termsPolicyState, setTermsPolicyState] = useState(termsPolicy);
  const theme = useBazarifyTheme();
  const activeContent: TermPolicyType | undefined = termsPolicyState.find(
    (item) => item.active,
  );
  const handleActiveSwitch = (id: string) => {
    setTermsPolicyState((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false },
      ),
    );
  };
  return (
    <PageContent backgroundColor="background">
      <Box gap="sm">
        <Box direction="row">
          {termsPolicyState.map((item) => (
            <Pressable
              onPress={() => handleActiveSwitch(item.id)}
              key={item.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: item.active }}
              testID={`terms-policy-tab-${item.id}`}
              style={[
                styles.tab,
                {
                  backgroundColor: theme.colors.primarySurface,
                  borderBottomColor: theme.colors.borderStrong,
                  borderBottomWidth: item.active ? 2 : 0,
                },
              ]}
            >
              <Text variant="label" align="center">
                {item.title}
              </Text>
            </Pressable>
          ))}
        </Box>
        <Box paddingX="sm">
          {activeContent && <Text variant="body">{activeContent.content}</Text>}
        </Box>
      </Box>
    </PageContent>
  );
};

const styles = StyleSheet.create({
  tab: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
  },
});

export default TermsPolicyScreen;
