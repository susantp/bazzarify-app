import { Text, View } from "react-native";
import React from "react";
import { TCart } from "@/modules/order/schemas/orderSchema";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getCartInventoryState } from "@/modules/cart/utils/getCartInventoryState";

interface Props {
  cart: TCart;
}
const OrderDetailsComponent = ({ cart }: Props) => {
  if (!cart) return null;
  const inventory = getCartInventoryState(cart);
  return (
    <View className="flex-row">
      <View className="flex-col gap-y-2 rounded-2xl border border-gray-300 p-4">
        <View className="border-b border-b-gray-300 py-2">
          <Text className="text-xl font-bold">Order Details</Text>
        </View>
        {inventory.hasBlockingIssue ? (
          <View className="rounded-xl border border-red-200 bg-red-50 px-3 py-3">
            <Text className="font-semibold text-red-700">
              Some items are no longer available.
            </Text>
            <Text className="mt-1 text-sm text-red-700">
              Remove or update unavailable items before placing the order.
            </Text>
          </View>
        ) : inventory.lowStockItems.length > 0 ? (
          <View className="rounded-xl border border-orange-200 bg-orange-50 px-3 py-3">
            <Text className="font-semibold text-orange-700">
              Some items are low in stock.
            </Text>
            <Text className="mt-1 text-sm text-orange-700">
              Inventory may change before payment is completed.
            </Text>
          </View>
        ) : null}
        {cart.items.map((item) => (
          <View
            key={item.uuid}
            className="flex-col gap-y-4 border-b border-gray-300 py-4"
          >
            <View className="w-full flex-row items-center justify-between">
              <View className="w-7/12">
                <ThemedText type="subtitle">{item.name}</ThemedText>
                <ThemedText style={{ fontStyle: "italic" }}>
                  {item.variant_attrs?.name.replace("|", "-")}
                </ThemedText>
                {item.inventory?.available_to_sell === 0 ? (
                  <Text className="mt-1 text-xs font-medium text-red-700">
                    Out of stock
                  </Text>
                ) : item.inventory &&
                  item.inventory.available_to_sell > 0 &&
                  item.inventory.available_to_sell <= 3 ? (
                  <Text
                    className="mt-1 text-xs font-medium"
                    style={{ color: Colors.light.tint }}
                  >
                    {item.inventory.available_to_sell} item(s) left
                  </Text>
                ) : null}
              </View>
              <View className="w-1/12 items-end">
                <Text>x{item.qty_ordered}</Text>
              </View>
              <View className="flex w-4/12 items-end">
                <Text className="text-md text-primary">
                  Rs. {item.row_total}
                </Text>
              </View>
            </View>
            <View className="w-full flex-row items-center justify-between">
              <View className="w-8/12">
                <ThemedText type="default">Discount</ThemedText>
              </View>
              <View className="flex w-4/12 items-end">
                <ThemedText type="default">Rs. {item.row_discount}</ThemedText>
              </View>
            </View>
            {/*<View className="w-full flex-row items-center justify-between">*/}
            {/*  <View className="w-8/12">*/}
            {/*    <ThemedText type="default">Voucher</ThemedText>*/}
            {/*  </View>*/}
            {/*  <View className="flex w-4/12 items-end">*/}
            {/*    <ThemedText type="default">Rs. 0</ThemedText>*/}
            {/*  </View>*/}
            {/*</View>*/}
            <View className="w-full flex-row items-center justify-between">
              <View className="w-8/12 flex-col gap-y-2">
                <ThemedText type="default">Delivery Charge</ThemedText>
                <ThemedText
                  style={{ fontSize: 11 }}
                  className="font-extralight text-gray-700"
                >
                  Get By Dec Mon 2nd - Wed 4th
                </ThemedText>
              </View>
              <View className="flex w-4/12 items-end">
                <Text className="text-sm">Rs. {item.row_shipping}</Text>
              </View>
            </View>
          </View>
        ))}

        {/*<View className="w-full flex-row">*/}
        {/*  <View className="w-full items-center">*/}
        {/*    <Text className="text-lg text-primary">*/}
        {/*      You're saving Upto Rs.2000 60% off*/}
        {/*    </Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
      </View>
    </View>
  );
};

export default OrderDetailsComponent;
