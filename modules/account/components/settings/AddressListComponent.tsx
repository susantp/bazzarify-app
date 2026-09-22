import { FlatList, StyleSheet, Switch } from "react-native";
import { Box, Text, useBazarifyTheme } from "@/components/design-system";
import { Link } from "expo-router";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";

interface IAddressListComponentProps {
  addresses: TUserAddress[];
  onSwitchChange: (address: TUserAddress) => void;
}

const AddressListComponent = ({
  addresses,
  onSwitchChange,
}: IAddressListComponentProps) => {
  const theme = useBazarifyTheme();

  return (
    <FlatList
      data={addresses}
      renderItem={({ item, index }) => {
        return (
          <Box
            direction="row"
            align="center"
            style={[
              styles.row,
              index < addresses.length - 1
                ? {
                    borderBottomColor: theme.colors.borderStrong,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }
                : null,
            ]}
          >
            <Box style={styles.switchColumn}>
              <Switch
                value={item.is_default}
                thumbColor={
                  item.is_default
                    ? theme.colors.textInverted
                    : theme.colors.textMuted
                }
                trackColor={{ true: theme.colors.primary }}
                onValueChange={(value) =>
                  onSwitchChange({
                    ...item,
                    is_default: value,
                  })
                }
              />
            </Box>
            <Box style={styles.addressColumn}>
              <Text variant="bodyMedium">
                {[item.street, item.city, item.state].join(", ")}
              </Text>
            </Box>
            <Box style={styles.editColumn}>
              <Link
                style={[
                  styles.editLink,
                  {
                    backgroundColor: theme.colors.primary,
                    borderRadius: theme.radii.md,
                  },
                ]}
                href={{
                  pathname: "/account/setting/address/edit/[uuid]",
                  params: { uuid: item.uuid },
                }}
              >
                <Text variant="link" color="textInverted" align="center">
                  Edit
                </Text>
              </Link>
            </Box>
          </Box>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 8,
    paddingVertical: 24,
  },
  switchColumn: {
    alignItems: "flex-start",
    width: "16.666667%",
  },
  addressColumn: {
    width: "58.333333%",
  },
  editColumn: {
    width: "25%",
  },
  editLink: {
    paddingVertical: 8,
  },
});

export default AddressListComponent;
