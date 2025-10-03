import { GestureResponderEvent } from "react-native";
import { useRef } from "react";
import { AddressFormRef } from "@/modules/account/components/settings/AddressFormComponent";
import { UserAddressCreate } from "@/modules/user/schemas/UserAddress";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import Toast from "react-native-toast-message";
import actionCreateAddress from "@/modules/user/actions/actionCreateAddress";
import { router } from "expo-router";
import { useSetAtom } from "jotai";
import { addressListAtom } from "@/modules/user/atoms/addresessAtom";

export default function useCreateAddressHook() {
  const formRef = useRef<AddressFormRef>(null);
  const setAddress = useSetAtom(addressListAtom);
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
      const addresses = await actionCreateAddress(parsed.data);
      if (addresses?.addresses) {
        Toast.show({
          position: "bottom",
          text1: "Address created successfully!",
          type: "success",
        });
        setAddress(addresses.addresses);
        router.back();
      }
    }
  };
  return {
    handleCreate,
    formRef,
  };
}
