import { FlatList, GestureResponderEvent } from "react-native";
import { Button } from "@/components/design-system";
import TextInputV1 from "@/components/common/TextInputV1";
import { AddressFieldType } from "@/modules/account/data/address/addressFields";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface Props {
  id?: string;
  fields: AddressFieldType[];
  existingAddress: TUserAddress | null;
  initialValues?: Partial<TUserAddress> | null;
  onSubmit: (e: GestureResponderEvent) => void;
}

export interface AddressFormRef {
  getFieldValues: () => Partial<TUserAddress>;
}

const AddressFormComponent = forwardRef<AddressFormRef, Props>(
  ({ id, fields, existingAddress, initialValues, onSubmit }, ref) => {
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
        setFieldValues(initialValues || {});
      }
    }, [fields, existingAddress, initialValues]);

    useImperativeHandle(
      ref,
      () => ({
        getFieldValues: () => fieldValues,
      }),
      [fieldValues],
    );

    return (
      <FlatList
        contentContainerStyle={styles.content}
        keyExtractor={(item) => item.id}
        data={fields}
        renderItem={({ item }) => {
          if (item.id === "action") {
            return (
              <Button
                onPress={(e: GestureResponderEvent) => onSubmit(e)}
                label={item.label}
                size="lg"
                style={styles.action}
              />
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

const styles = {
  content: {
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  action: {
    marginTop: 16,
    width: "100%" as const,
  },
};

export default AddressFormComponent;
