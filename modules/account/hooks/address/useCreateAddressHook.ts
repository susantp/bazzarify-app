import { GestureResponderEvent } from "react-native";
import { useRef } from "react";
import { AddressFormRef } from "@/modules/account/components/settings/AddressFormComponent";
import { UserAddressCreate } from "@/modules/user/schemas/UserAddress";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import Toast from "react-native-toast-message";
import actionCreateAddress from "@/modules/user/actions/actionCreateAddress";
import { router } from "expo-router";
import { useAtom, useSetAtom } from "jotai";
import {
  addressDraftAtom,
  addressListAtom,
} from "@/modules/user/atoms/addresessAtom";
import { selectedDeliveryAddress } from "@/modules/cart/atoms";
import { findMatchingAddress } from "@/modules/user/utils/address";

export default function useCreateAddressHook() {
  const formRef = useRef<AddressFormRef>(null);
  const setAddress = useSetAtom(addressListAtom);
  const setSelectedAddress = useSetAtom(selectedDeliveryAddress);
  const [draftAddress, setDraftAddress] = useAtom(addressDraftAtom);
  const handleCreate = async (e: GestureResponderEvent) => {
    if (formRef.current) {
      const fieldValues = formRef.current.getFieldValues();
      const parsed = UserAddressCreate.safeParse(fieldValues);
      if (!parsed.success) {
        Toast.show({
          position: "bottom",
          text1: "Validation Error",
          text2: "Please fill up the form properly",
          type: "error",
        });
        console.log("Validation errors:", formattedIssues(parsed.error.issues));
        return;
      }
      try {
        const addresses = await actionCreateAddress(parsed.data);
        if (addresses?.addresses) {
          const selected =
            findMatchingAddress(addresses.addresses, parsed.data) || null;
          Toast.show({
            position: "bottom",
            text1: "Address created successfully!",
            type: "success",
          });
          setAddress(addresses.addresses);
          setSelectedAddress(selected);
          if (draftAddress) setDraftAddress(null);
          router.back();
        }
      } catch (error) {
        Toast.show({
          position: "bottom",
          text1: "Could not create address",
          text2: error instanceof Error ? error.message : undefined,
          type: "error",
        });
      }
    }
  };
  return {
    handleCreate,
    formRef,
  };
}
