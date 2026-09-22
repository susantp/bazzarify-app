import { FlatList, StyleSheet, Switch } from "react-native";
import { useState } from "react";
import {
  permissionSetting,
  PermissionType,
} from "@/modules/account/data/settings/permissions";
import { Box, Text, useBazarifyTheme } from "@/components/design-system";
import { PageContent } from "@/components/design-system/compositions";

const PermissionSettingScreen = () => {
  const [permissions, setPermissions] = useState(permissionSetting);
  const theme = useBazarifyTheme();
  const handleSwitchChange = (id: string, value: boolean) => {
    setPermissions((prevPermissions: PermissionType[]) =>
      prevPermissions.map((permission: PermissionType) =>
        permission.id === id ? { ...permission, active: value } : permission,
      ),
    );
  };
  return (
    permissions.length > 0 && (
      <PageContent backgroundColor="background">
        <FlatList
          data={permissions}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <Box
                direction="row"
                align="center"
                justify="space-between"
                style={[
                  styles.row,
                  index < permissions.length - 1
                    ? {
                        borderBottomColor: theme.colors.borderStrong,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }
                    : null,
                ]}
              >
                <Box style={styles.labelColumn}>
                  <Text variant="bodyMedium">{item.label}</Text>
                </Box>
                <Box align="flex-end" style={styles.switchColumn}>
                  <Switch
                    value={item.active}
                    thumbColor={
                      item.active
                        ? theme.colors.textInverted
                        : theme.colors.textMuted
                    }
                    trackColor={{ true: theme.colors.primary }}
                    onValueChange={(value) =>
                      handleSwitchChange(item.id, value)
                    }
                  />
                </Box>
              </Box>
            );
          }}
        />
      </PageContent>
    )
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 8,
    paddingVertical: 24,
  },
  labelColumn: {
    width: "83.333333%",
  },
  switchColumn: {
    width: "16.666667%",
  },
});

export default PermissionSettingScreen;
