import { FlatList, StyleSheet, Switch } from "react-native";
import { useAtom } from "jotai";
import { languageAtom } from "@/atoms/languageAtom";
import {
  Box,
  Image as DesignImage,
  Text,
  useBazarifyTheme,
} from "@/components/design-system";
import { PageContent } from "@/components/design-system/compositions";

const LanguageSettingScreen = () => {
  const [languages, setLanguages] = useAtom(languageAtom);
  const theme = useBazarifyTheme();

  const handleSwitchChange = (id: string, value: boolean) => {
    setLanguages((prevLanguages) =>
      prevLanguages.map((language) =>
        language.id === id
          ? { ...language, default: value }
          : { ...language, default: !value },
      ),
    );
  };

  return (
    languages.length > 0 && (
      <PageContent backgroundColor="background">
        <FlatList
          data={languages}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Box
              direction="row"
              align="center"
              style={[
                styles.row,
                index < languages.length - 1
                  ? {
                      borderBottomColor: theme.colors.borderStrong,
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }
                  : null,
              ]}
            >
              <Box style={styles.switchColumn}>
                <Switch
                  value={item.default}
                  thumbColor={
                    item.default
                      ? theme.colors.textInverted
                      : theme.colors.textMuted
                  }
                  trackColor={{ true: theme.colors.primary }}
                  onValueChange={(value) => handleSwitchChange(item.id, value)}
                />
              </Box>
              <Box style={styles.labelColumn}>
                <Text variant="bodyMedium">{item.label}</Text>
              </Box>
              <Box align="flex-end" style={styles.flagColumn}>
                <DesignImage source={item.imgSource} size={32} radius="sm" />
              </Box>
            </Box>
          )}
        />
      </PageContent>
    )
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  switchColumn: {
    alignItems: "flex-start",
    width: "16.666667%",
  },
  labelColumn: {
    gap: 8,
    width: "66.666667%",
  },
  flagColumn: {
    width: "16.666667%",
  },
});

export default LanguageSettingScreen;
