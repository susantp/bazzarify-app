import { router, useLocalSearchParams } from "expo-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  addressListAtom,
  getAddressByUuidAtom,
} from "@/modules/user/atoms/addresessAtom";
import { useRef } from "react";
import { AddressFormRef } from "@/modules/account/components/settings/AddressFormComponent";
import actionUpdateAddress from "@/modules/user/actions/actionUpdateAddress";
import Toast from "react-native-toast-message";
import { GestureResponderEvent } from "react-native";
import { selectedDeliveryAddress } from "@/modules/cart/atoms";

export default function useEditAddressHook() {
  const { uuid } = useLocalSearchParams();
  const setAddress = useSetAtom(addressListAtom);
  const [selectedAddress, setSelectedAddress] = useAtom(
    selectedDeliveryAddress,
  );
  const getAddress = useAtomValue(getAddressByUuidAtom);
  const existingAddress = getAddress(uuid.toString());
  const formRef = useRef<AddressFormRef>(null);
  const handleUpdate = async (e: GestureResponderEvent) => {
    if (formRef.current) {
      const fieldValues = formRef.current.getFieldValues();
      fieldValues.uuid = existingAddress?.uuid;
      const addresses = await actionUpdateAddress(fieldValues);
      if (addresses?.addresses) {
        const updatedSelected =
          selectedAddress?.uuid === existingAddress?.uuid
            ? addresses.addresses.find(
                (address) => address.uuid === existingAddress?.uuid,
              )
            : null;
        Toast.show({
          position: "bottom",
          text1: "Address updated successfully!",
          type: "success",
        });
        setAddress(addresses.addresses);
        if (updatedSelected) {
          setSelectedAddress(updatedSelected);
        }
        router.back();
      }
    }
  };

  return { uuid, existingAddress, formRef, handleUpdate };
}
