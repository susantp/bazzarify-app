import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TrashIcon } from "react-native-heroicons/outline";
import React from "react";
import {
  CartItemObject,
  cartItemsAtom,
} from "@/atoms/cartScreen/cartAction.atom";
import { useRecoilState } from "recoil";
import ScreenHeader from "@/components/common/ScreenHeader";
import { addressModalAtom } from "@/atoms/addressModalAtom";

const CartHeader = () => {
  const [_, setCartItems] = useRecoilState(cartItemsAtom);
  const handleDelete = () => {
    if (_.filter((item) => item.isSelected).length < 1) {
      alert("No item selected");
      return;
    }
    setCartItems(_.filter((item) => !item.isSelected));
  };
  return (
    <View className="flex flex-row justify-between pr-2">
      <View className="w-3/12">
        <ScreenHeader title="My Cart" />
      </View>
      <View className="flex w-9/12 flex-row items-center justify-end gap-x-4">
        <CartActions cartItems={_} onPress={handleDelete} />
      </View>
    </View>
  );
};

export default CartHeader;

interface ICartActions {
  cartItems: CartItemObject[];
  onPress: (event: GestureResponderEvent) => void;
}

export const CartActions = ({ cartItems, onPress }: ICartActions) => {
  const [showModal, setShowModal] = useRecoilState(addressModalAtom);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setShowModal(!showModal)}
      >
        <Text className="rounded-xl bg-white px-2 py-1 text-sm text-orange-600">
          Choose delivery address
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <TrashIcon
          size={36}
          color={
            cartItems.filter((item) => item.isSelected).length > 0
              ? "white"
              : "gray"
          }
        />
      </TouchableOpacity>
    </>
  );
};
