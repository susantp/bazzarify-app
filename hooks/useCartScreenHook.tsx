import { Alert, View } from "react-native";
import React from "react";
import { useAtom } from "jotai";
import { cartAtom } from "@/modules/cart/atoms";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import { router } from "expo-router";
import CartItem from "@/components/cart/CartItem";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "react-native-paper";
import {
  CartItemToUpdateQuantitySchema,
  TCartItem,
  TCartItemToUpdateQuantity,
} from "@/modules/order/schemas/orderSchema";
import Toast from "react-native-toast-message";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
} from "@/modules/cart/actions/cartService";

export default function useCartScreenHook() {
  const [cartData, setCartData] = useAtom(cartAtom);

  const [showAddressModal, setShowAddressModal] = useAtom(addressModalAtom);
  const handleAddressModal = () => {
    setShowAddressModal(!showAddressModal);
  };
  const handleAddressPress = () => {
    setShowAddressModal(!showAddressModal);
    router.push(`/account/setting/address/create`);
  };

  const handleCheckoutPress = () =>
    cartData?.cart?.totals.items_count
      ? Alert.alert("Please select item to checkout.")
      : router.push("/cart/checkout");

  const handleLineItemIncrement = (item: TCartItem) => {
    if (!item) return;
    const data: TCartItemToUpdateQuantity = {
      line_id: item.line_id,
      uuid: item.uuid,
      variant_attrs: item.variant_attrs
        ? {
            uuid: item.variant_attrs.uuid,
            name: item.variant_attrs.name,
            sku: item.variant_attrs.sku,
          }
        : null,
      qty_ordered: 1,
    };
    const parsed = CartItemToUpdateQuantitySchema.safeParse(data);
    if (!parsed.success) {
      Toast.show({
        position: "bottom",
        text1: "Cannot add item to cart",
        type: "error",
      });
      console.log(formattedIssues(parsed.error.issues));
      return;
    }

    console.log("updating cart after parsed:", data);

    incrementCartItem(parsed.data)
      .then((result) => {
        if (result?.cart) {
          setCartData(result);
        }
        console.log("add item to state:", result);
      })
      .catch((error) => {
        console.error("Failed to add item to cart:", error.message);
        Toast.show({
          position: "bottom",
          text1: "Failed to add item to cart",
          text2: error.message,
          type: "error",
        });
      });
  };

  const handleLineItemDecrement = (item: TCartItem) => {
    if (!item) return;
    const data: TCartItemToUpdateQuantity = {
      line_id: item.line_id,
      uuid: item.uuid,
      variant_attrs: item.variant_attrs
        ? {
            uuid: item.variant_attrs.uuid,
            name: item.variant_attrs.name,
            sku: item.variant_attrs.sku,
          }
        : null,
      qty_ordered: 1,
    };
    const parsed = CartItemToUpdateQuantitySchema.safeParse(data);
    if (!parsed.success) {
      Toast.show({
        position: "bottom",
        text1: "Cannot add item to cart",
        type: "error",
      });
      console.log(formattedIssues(parsed.error.issues));
      return;
    }

    console.log("updating cart after parsed:", data);

    decrementCartItem(parsed.data)
      .then((result) => {
        if (result?.cart) {
          setCartData(result);
        }
        console.log("add item to state:", result);
      })
      .catch((error) => {
        console.error("Failed to add item to cart:", error.message);
        Toast.show({
          position: "bottom",
          text1: "Failed to add item to cart",
          text2: error.message,
          type: "error",
        });
      });
  };

  const handleLineItemRemove = (item: TCartItem) => {
    if (!item) return;
    const data: TCartItemToUpdateQuantity = {
      line_id: item.line_id,
      uuid: item.uuid,
      variant_attrs: item.variant_attrs
        ? {
            uuid: item.variant_attrs.uuid,
            name: item.variant_attrs.name,
            sku: item.variant_attrs.sku,
          }
        : null,
      qty_ordered: 0,
    };
    console.log("remove item from state:", item);
    const parsed = CartItemToUpdateQuantitySchema.safeParse(data);
    if (!parsed.success) {
      Toast.show({
        position: "bottom",
        text1: "Cannot add item to cart",
        type: "error",
      });
      console.log(formattedIssues(parsed.error.issues));
      return;
    }

    console.log("removing cart after parsed:", data);

    removeCartItem(parsed.data)
      .then((result) => {
        if (result?.cart) {
          setCartData(result);
        }
        console.log("remove item to state:", result);
      })
      .catch((error) => {
        console.error("Failed to remove item to cart:", error.message);
        Toast.show({
          position: "bottom",
          text1: "Failed to add item to cart",
          text2: error.message,
          type: "error",
        });
      });
  };
  const CARDS = [
    {
      title: "wel",
      component: <View className="h-3 bg-gray-100" />,
    },
    {
      title: "cart-items",
      component: cartData?.cart?.totals.items_count ? (
        <Card className="flex-1">
          {cartData?.cart?.items.map((item) => (
            <CartItem key={item.variant_attrs?.uuid ?? item.uuid} item={item} />
          ))}
        </Card>
      ) : (
        <ThemedText type="title">No Items on cart</ThemedText>
      ),
    },
    {
      title: "other-products",
      component: (
        <ThemedText>Popular Items section</ThemedText>
        // <ContentGridSection
        //   className="align-center flex-col pl-4"
        //   title={"Just for you"}
        //   items={popularItemsData}
        //   cols={2}
        //   horizontal={false}
        //   renderItem={(item, index, cols) => (
        //     <ProductCard item={item} key={index} cols={cols} />
        //   )}
        // />
      ),
    },
  ];
  return {
    CARDS,
    cartData,
    showAddressModal,
    handleAddressModal,
    handleAddressPress,
    handleCheckoutPress,
    handleLineItemIncrement,
    handleLineItemDecrement,
    handleLineItemRemove,
  };
}
