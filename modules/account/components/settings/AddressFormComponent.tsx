import { FlatList, Text, TouchableOpacity } from "react-native";
import TextInputV1 from "@/components/common/TextInputV1";
import { AddressFieldType } from "@/modules/account/data/address/addressFields";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { RefObject } from "react";

interface Props {
  id?: string;
  fields: AddressFieldType[];
  existingAddress: TUserAddress | null;
  onUpdate: () => void;
  ref: RefObject<HTMLInputElement>;
}

const AddressFormComponent = ({
  id,
  fields,
  existingAddress,
  onUpdate,
  ref
}: Props) => (
  <FlatList
    contentContainerClassName="px-3 gap-y-3 py-3"
    keyExtractor={(item) => item.id}
    data={fields}
    renderItem={({ item }) => {
      if (item.id === "action") {
        return (
          <TouchableOpacity
            onPress={onUpdate}
            activeOpacity={0.6}
            className="mt-4 flex flex-1 items-center rounded-lg bg-orange-600 py-3.5"
          >
            <Text className="text-lg font-semibold text-white">
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TextInputV1

            legend={item.label}
            defaultValue={
              existingAddress ? existingAddress[item.id]?.toString() : ""
            }
            placeholder={
              item.id === "city" && id
                ? id?.toString().toUpperCase()
                : item.placeholder
            }
          />
        );
      }
    }}
  />
);

export default AddressFormComponent;
