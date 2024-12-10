import {
  CartItemObject,
  cartItemsAtom,
} from "@/atoms/cartScreen/cartAction.atom";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { Checkbox } from "expo-checkbox";

export type CartItemProps = {
  item: CartItemObject;
};

const CartItem = ({ item }: CartItemProps) => {
  const [itemCount, setItemCount] = useState(1);
  const [_, setSelectedCartItem] = useRecoilState(cartItemsAtom);
  const handleCartIncrement = () => setItemCount(itemCount + 1);
  const handleCartDecrement = () => setItemCount(itemCount - 1);

  const toggleSelectItem = (selectedCartItem: CartItemObject) => {
    setSelectedCartItem(
      _.map((item) =>
        item.id === selectedCartItem.id
          ? { ...item, isSelected: !item.isSelected }
          : item,
      ),
    );
  };
  return (
    <View className="flex flex-row items-center py-2">
      <View id="select-action" className="w-1/12">
        <Checkbox
          value={item.isSelected}
          onValueChange={() => toggleSelectItem(item)}
          color={"#f47d58"}
        />
      </View>

      <View id="content-thumbnail" className="flex w-4/12 items-center">
        <Image
          source={require("@/assets/products/product.png")}
          className={`h-32 w-32`}
        />
      </View>

      <View id="content" className="flex w-7/12 flex-col items-start gap-y-1">
        <View id="cart-item-title">
          <Text className="text-md">{item.name}</Text>
        </View>
        <View id="vendor">
          <Text className="text-sm">{item.vendor}</Text>
        </View>
        <View id="delivery-info">
          <Text className="text-sm">{item.deliveryDate}</Text>
        </View>
        <View id="price-action" className="flex-row">
          <View className="w-6/12 flex-col">
            <Text className="text-md text-orange-600">
              Rs {item.discountedPrice}
            </Text>
            <Text className="text-sm text-gray-600 line-through">
              Rs {item.price}
            </Text>
          </View>

          <View className="w-6/12 flex-row gap-x-2">
            <TouchableOpacity onPress={handleCartIncrement}>
              <PlusCircleIcon size={30} color="#f47d58" strokeWidth={2} />
            </TouchableOpacity>
            <View className="px-2 py-2">
              <Text>{itemCount}</Text>
            </View>
            <TouchableOpacity
              disabled={itemCount <= 0}
              onPress={handleCartDecrement}
            >
              <MinusCircleIcon
                size={30}
                color={itemCount > 0 ? "#f47d58" : "gray"}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
