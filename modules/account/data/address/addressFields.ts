import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";

export type AddressFieldType = {
  id: keyof TUserAddress | "action";
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  action?: () => void;
  value?: string | number;
};
const addressFields: AddressFieldType[] = [
  {
    id: "country",
    label: "Country",
    type: "text",
    required: false,
    placeholder: "Nepal",
  },
  {
    id: "phone",
    label: "Phone No.",
    type: "text",
    required: true,
    placeholder: "Number",
  },
  {
    id: "state",
    label: "State",
    type: "text",
    required: true,
    placeholder: "State",
  },
  {
    id: "zip",
    label: "Zip code",
    type: "text",
    required: true,
    placeholder: "Zip Code",
  },
  {
    id: "city",
    label: "City",
    type: "text",
    required: true,
    placeholder: "City",
  },
  {
    id: "street",
    label: "Street",
    type: "text",
    required: true,
    placeholder: "Landmark",
  },
  {
    id: "action",
    label: "Update",
    action: () => {
      Toast.show({
        position: "bottom",
        text1: "Address Update Successfully!",
        type: "success",
      });
      setTimeout(() => {
        router.back();
      }, 3000);
    },
  },
];

export default addressFields;
