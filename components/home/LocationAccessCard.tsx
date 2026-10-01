import { StyleSheet } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import { Box, Button, Icon, Surface, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

type LocationAccessCardProps = {
  denied: boolean;
  canAskAgain: boolean;
  isRequesting: boolean;
  onRequestAccess: () => void;
  onOpenSettings: () => void;
  onDismiss: () => void;
};

export default function LocationAccessCard({
  denied,
  canAskAgain,
  isRequesting,
  onRequestAccess,
  onOpenSettings,
  onDismiss,
}: LocationAccessCardProps) {
  const theme = useBazarifyTheme();
  const settingsRequired = denied && !canAskAgain;

  return (
    <Surface
      bordered
      radius="lg"
      padding="lg"
      style={[
        styles.card,
        {
          marginHorizontal: theme.spacing.lg,
          marginTop: theme.spacing.md,
        },
      ]}
    >
      <Box direction="row" align="center" gap="md">
        <Box
          align="center"
          justify="center"
          backgroundColor="primarySurface"
          borderRadius="pill"
          style={{
            height: theme.dimensions.controlMd,
            width: theme.dimensions.controlMd,
          }}
        >
          <Icon size={theme.dimensions.iconMd} color="primary">
            {({ color, size }) => (
              <Ionicons name="location-outline" color={color} size={size} />
            )}
          </Icon>
        </Box>
        <Box flex={1} gap="xs" style={styles.copy}>
          <Text variant="title">Set your delivery area</Text>
          <Text variant="caption" color="textMuted">
            {settingsRequired
              ? "You can keep browsing. Enable location in Settings whenever you want nearby delivery details."
              : "Use your location to see local delivery options. You can keep browsing without it."}
          </Text>
        </Box>
      </Box>

      <Box direction="row" gap="sm" style={{ marginTop: theme.spacing.lg }}>
        <Button
          label={
            settingsRequired
              ? "Open Settings"
              : denied
                ? "Try again"
                : "Use my location"
          }
          loading={isRequesting}
          onPress={settingsRequired ? onOpenSettings : onRequestAccess}
          style={styles.action}
        />
        <Button
          label="Not now"
          variant="secondary"
          onPress={onDismiss}
          style={styles.action}
        />
      </Box>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: {
    borderCurve: "continuous",
  },
  copy: {
    minWidth: 0,
  },
  action: {
    flex: 1,
  },
});
