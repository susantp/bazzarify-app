import { Box, Icon, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import { useAtom } from "jotai";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import DeliveryAddressPicker from "@/modules/user/components/DeliveryAddressPicker";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { formatUserAddress } from "@/modules/user/utils/address";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  user: TUser | null;
  defaultDeliveryAddress: TUserAddress | null;
}
const CheckoutAddressComponent = ({ user, defaultDeliveryAddress }: Props) => {
  const [showModal, setShowModal] = useAtom(addressModalAtom);
  const theme = useBazarifyTheme();
  const addressLabel = defaultDeliveryAddress
    ? formatUserAddress(defaultDeliveryAddress)
    : "Select delivery address";

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={addressLabel}
        style={[
          styles.addressButton,
          { borderColor: theme.colors.borderStrong },
        ]}
        onPress={() => setShowModal(!showModal)}
      >
        <Icon size={26} color="primary">
          {({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          )}
        </Icon>
        <Box flex={1} gap="xs">
          <Text variant="body">{addressLabel}</Text>
          {(defaultDeliveryAddress?.phone || user?.phone) && (
            <Text variant="caption" color="textMuted">
              Phone: {defaultDeliveryAddress?.phone || user?.phone}
            </Text>
          )}
        </Box>
        <Text variant="caption">Change</Text>
      </Pressable>
      <DemoModalComponent
        type="bottom"
        showModal={showModal}
        handlePress={() => setShowModal(!showModal)}
      >
        <DeliveryAddressPicker onClose={() => setShowModal(false)} />
      </DemoModalComponent>
    </>
  );
};

const styles = StyleSheet.create({
  addressButton: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    padding: 16,
  },
});

export default CheckoutAddressComponent;
