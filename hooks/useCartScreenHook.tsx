import { Alert, View } from "react-native";
import React from "react";
import { useAtom, useAtomValue } from "jotai";
import { cartAtom } from "@/modules/cart/atoms";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import { router } from "expo-router";
import CartItem from "@/components/cart/CartItem";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "react-native-paper";

export default function useCartScreenHook() {
  const cartData = useAtomValue(cartAtom);
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
  };
}
