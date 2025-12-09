import {
  FlatList,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
} from "react-native";
import TextInputV1 from "@/components/common/TextInputV1";
import { AddressFieldType } from "@/modules/account/data/address/addressFields";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface Props {
  id?: string;
  fields: AddressFieldType[];
  existingAddress: TUserAddress | null;
  onSubmit: (e: GestureResponderEvent) => void;
}

export interface AddressFormRef {
  getFieldValues: () => Partial<TUserAddress>;
}

const AddressFormComponent = forwardRef<AddressFormRef, Props>(
  ({ id, fields, existingAddress, onSubmit }, ref) => {
    const [fieldValues, setFieldValues] = useState<Partial<TUserAddress>>({});

    useEffect(() => {
      // Initialize field values with existing address data
      if (existingAddress) {
        const initialValues: Partial<TUserAddress> = {};
        fields.forEach((field) => {
          if (field.id !== "action") {
            const fieldKey = field.id;
            initialValues[fieldKey] = existingAddress[fieldKey];
          }
        });
        setFieldValues(initialValues);
      } else {
        setFieldValues({});
      }
    }, [fields, existingAddress]);

    useImperativeHandle(
      ref,
      () => ({
        getFieldValues: () => fieldValues,
      }),
      [fieldValues],
    );

    return (
      <FlatList
        contentContainerClassName="px-3 gap-y-3 py-3"
        keyExtractor={(item) => item.id}
        data={fields}
        renderItem={({ item }) => {
          if (item.id === "action") {
            return (
              <TouchableOpacity
                onPress={(e: GestureResponderEvent) => onSubmit(e)}
                activeOpacity={0.6}
                className="mt-4 flex flex-1 items-center rounded-lg bg-primary py-3.5"
              >
                <Text className="text-lg font-semibold text-white">
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TextInputV1
                inputMode={item.type}
                legend={item.label}
                value={
                  fieldValues[item.id as keyof TUserAddress]?.toString() || ""
                }
                onChangeText={(text) =>
                  setFieldValues((prev) => ({
                    ...prev,
                    [item.id]: text,
                  }))
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
  },
);

AddressFormComponent.displayName = "AddressFormComponent";

export default AddressFormComponent;
