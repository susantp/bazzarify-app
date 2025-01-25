import Toast from "react-native-toast-message";
import { router } from "expo-router";

export type AddressFieldType = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  action?: () => void;
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
    id: "province",
    label: "Province",
    type: "text",
    required: true,
    placeholder: "Province",
  },
  {
    id: "postalCode",
    label: "Postal Code",
    type: "text",
    required: true,
    placeholder: "Postal Code",
  },
  {
    id: "city",
    label: "City",
    type: "text",
    required: true,
    placeholder: "City",
  },
  {
    id: "streetAddress",
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
