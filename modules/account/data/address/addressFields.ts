import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { InputModeOptions } from "react-native";

export type AddressFieldType = {
  id: keyof Omit<TUserAddress, "uuid" | "user_uuid" | "is_default"> | "action";
  label: string;
  type: InputModeOptions;
  required?: boolean;
  placeholder?: string;
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
    label: "Phone",
    type: "numeric",
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
    type: "none",
  },
];

export default addressFields;
