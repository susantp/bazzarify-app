import { Image, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { TCartItem } from "@/modules/order/schemas/orderSchema";

interface OrderItemProps {
  items: TCartItem[] | undefined;
}
interface WrapperProps {
  children: ReactNode;
}

const OrderItem = ({ items }: OrderItemProps) => (
  <View className="flex-row items-center bg-white">
    <View id="content-thumbnail" className="flex w-4/12 items-center">
      <Image
        source={require("@/assets/products/product.png")}
        className={`h-32 w-32`}
      />
    </View>

    {items?.map((item) => (
      <Wrapper key={item.uuid}>
        <View id="cart-item-title">
          <Text className="text-md">{item.name}</Text>
        </View>
        <View id="vendor">
          <Text className="text-sm">item.vendor</Text>
        </View>
        <View
          id="price-action"
          className="w-full flex-row items-center justify-between"
        >
          <View className="flex-col">
            <Text className="text-md text-primary">{item.unit_price}</Text>
            {/*<Text className="text-sm text-gray-600 line-through">Rs 1999</Text>*/}
          </View>

          <View className="gap-x-2">
            <Text className="text-gray-700">x {item.qty_ordered}</Text>
          </View>
        </View>
      </Wrapper>
    ))}
  </View>
);
export default OrderItem;

const Wrapper = ({ children }: WrapperProps) => (
  <View id="content" className="flex w-8/12 flex-col items-start gap-y-2">
    {children}
  </View>
);
