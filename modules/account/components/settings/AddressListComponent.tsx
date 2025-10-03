import { FlatList, Switch, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { ThemedText } from "@/components/ThemedText";

interface IAddressListComponentProps {
  addresses: TUserAddress[];
  onSwitchChange: (id: string, value: boolean) => void;
}

const AddressListComponent = ({
  addresses,
  onSwitchChange,
}: IAddressListComponentProps) => {
  return (
    <View className="bg-white">
      {addresses.length > 0 ? (
        <FlatList
          data={addresses}
          renderItem={({ item, index }) => {
            return (
              <View
                className={`flex-row items-center ${addresses.length - 1 !== index ? "border-b" : undefined} border-b-gray-400 px-2 py-6`}
              >
                <View className="w-2/12 items-start">
                  <Switch
                    value={item.is_default}
                    thumbColor={item.is_default ? "white" : "gray"}
                    trackColor={{ true: Colors.light.tint }}
                    onValueChange={(value) => onSwitchChange(item.uuid, value)}
                  />
                </View>
                <View className="w-7/12">
                  <Text className="text-md font-semibold">
                    {[item.street, item.city, item.state].join(", ")}
                  </Text>
                </View>
                <View className="w-3/12">
                  <Link
                    className="rounded-lg bg-orange-600 py-2"
                    href={{
                      pathname: "/account/setting/address/edit/[uuid]",
                      params: { uuid: item.uuid },
                    }}
                  >
                    <Text className="text-center text-xl text-white">Edit</Text>
                  </Link>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <ThemedText type="defaultSemiBold">Create new address</ThemedText>
      )}
    </View>
  );
};

export default AddressListComponent;
