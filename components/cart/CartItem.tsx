import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TCartItem } from "@/modules/order/schemas/orderSchema";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { shouldDisplayVariantLabel } from "@/modules/product/utils/selection";

export type CartItemProps = {
  item: TCartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  incrementDisabled?: boolean;
};

const CartItem = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  incrementDisabled = false,
}: CartItemProps) => {
  const inventoryMessage =
    item.inventory?.available_to_sell === 0
      ? "Out of stock"
      : item.inventory && !item.inventory.can_increment
        ? `Maximum ${item.inventory.max_quantity} in cart`
        : item.inventory && item.inventory.available_to_sell <= 3
          ? `${item.inventory.available_to_sell} item(s) available`
          : null;

  return (
    <View className="flex flex-row items-center py-2">
      <View id="select-action" className="w-1/12">
        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="close-circle" size={30} color={Colors.light.tint} />
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
        {shouldDisplayVariantLabel(item.name, item.variant_attrs?.name) ? (
          <View>
            <Text>{item.variant_attrs?.name.replace("|", "-")}</Text>
          </View>
        ) : null}
        <View id="vendor">
          <Text className="text-sm">item.vendor</Text>
        </View>
        <View id="delivery-info">
          <Text className="text-sm">item.deliveryDate</Text>
        </View>
        <View id="price-action" className="flex-row">
          <View className="w-6/12 flex-col">
            <Text className="text-md text-primary">Rs {item.unit_price}</Text>
            <Text className="text-sm text-gray-600 line-through">
              {item.row_discount ? `Rs ${item.row_discount}` : null}
            </Text>
            {inventoryMessage ? (
              <Text
                className="mt-1 text-xs"
                style={{
                  color:
                    item.inventory?.available_to_sell === 0
                      ? "#B91C1C"
                      : Colors.light.tint,
                }}
              >
                {inventoryMessage}
              </Text>
            ) : null}
          </View>

          <View className="w-6/12 flex-row gap-x-2">
            <TouchableOpacity
              disabled={incrementDisabled}
              onPress={onIncrement}
            >
              <Ionicons
                name="add-circle-outline"
                size={30}
                color={incrementDisabled ? "gray" : Colors.light.tint}
              />
            </TouchableOpacity>
            <View className="px-2 py-2">
              <Text>{item.qty_ordered}</Text>
            </View>
            <TouchableOpacity
              disabled={item.qty_ordered <= 0}
              onPress={onDecrement}
            >
              <Ionicons
                name="remove-circle-outline"
                size={30}
                color={item.qty_ordered > 0 ? "#f47d58" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
