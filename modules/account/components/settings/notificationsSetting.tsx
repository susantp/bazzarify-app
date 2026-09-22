import { FlatList, StyleSheet, Switch } from "react-native";
import { useState } from "react";
import {
  notificationSettingList,
  NotificationSettingType,
} from "@/modules/account/data/settings/notification";
import { Box, Text, useBazarifyTheme } from "@/components/design-system";
import { PageContent } from "@/components/design-system/compositions";

const NotificationSettingScreen = () => {
  const [notifications, setNotifications] = useState(notificationSettingList);
  const theme = useBazarifyTheme();
  const handleSwitchChange = (id: string, value: boolean) => {
    setNotifications((prevNotification: NotificationSettingType[]) =>
      prevNotification.map((notification: NotificationSettingType) =>
        notification.id === id
          ? { ...notification, active: value }
          : notification,
      ),
    );
  };
  return (
    notifications.length > 0 && (
      <PageContent backgroundColor="background">
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <Box
                direction="row"
                align="center"
                style={[
                  styles.row,
                  index < notifications.length - 1
                    ? {
                        borderBottomColor: theme.colors.borderStrong,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }
                    : null,
                ]}
              >
                <Box gap="sm" style={styles.copyColumn}>
                  <Text variant="bodyMedium">{item.label}</Text>
                  <Text variant="caption" color="textMuted">
                    {item.helperText}
                  </Text>
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
    paddingVertical: 16,
  },
  copyColumn: {
    width: "83.333333%",
  },
  switchColumn: {
    width: "16.666667%",
  },
});

export default NotificationSettingScreen;
