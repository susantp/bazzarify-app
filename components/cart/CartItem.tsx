import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { TCartItem } from "@/modules/order/schemas/orderSchema";
import { XCircleIcon } from "react-native-heroicons/solid";
import { Colors } from "@/constants/Colors";

export type CartItemProps = {
  item: TCartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

const CartItem = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) => {
  return (
    <View className="flex flex-row items-center py-2">
      <View id="select-action" className="w-1/12">
        <TouchableOpacity onPress={onRemove}>
          <XCircleIcon size={30} color={Colors.light.tint} />
        </TouchableOpacity>
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
        {item.variant_attrs && (
          <View>
            <Text>{item.variant_attrs.name.replace("|", "-")}</Text>
          </View>
        )}
        <View id="vendor">
          <Text className="text-sm">item.vendor</Text>
        </View>
        <View id="delivery-info">
          <Text className="text-sm">item.deliveryDate</Text>
        </View>
        <View id="price-action" className="flex-row">
          <View className="w-6/12 flex-col">
            <Text className="text-md text-orange-600">
              Rs {item.unit_price}
            </Text>
            <Text className="text-sm text-gray-600 line-through">
              {item.row_discount ? `Rs ${item.row_discount}` : null}
            </Text>
          </View>

          <View className="w-6/12 flex-row gap-x-2">
            <TouchableOpacity onPress={onIncrement}>
              <PlusCircleIcon size={30} color="#f47d58" strokeWidth={2} />
            </TouchableOpacity>
            <View className="px-2 py-2">
              <Text>{item.qty_ordered}</Text>
            </View>
            <TouchableOpacity
              disabled={item.qty_ordered <= 0}
              onPress={onDecrement}
            >
              <MinusCircleIcon
                size={30}
                color={item.qty_ordered > 0 ? "#f47d58" : "gray"}
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
