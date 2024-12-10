import React from "react";
import { cartItemsTotalAtom } from "@/atoms/cartScreen/cartAction.atom";
import { useRecoilState, useRecoilValue } from "recoil";
import CartHeader from "@/components/cart/CartHeader";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import BottomActionView from "@/components/cart/BottomActionView";
import CheckoutBottomActionView from "@/components/cart/CheckoutBottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import useBottomViewHook from "@/hooks/useBottomViewHook";
import useCartScreenHook from "@/hooks/useCartScreenHook";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import AddressSettingScreen from "@/components/account/setting/screens/addressSettingScreen";
import { addressModalAtom } from "@/atoms/addressModalAtom";

export default function CartScreen() {
  const totalCartPrice = useRecoilValue(cartItemsTotalAtom);
  const { CARDS, cartItems } = useCartScreenHook();
  const { paddingAfterBottomView, handleBottomViewLayoutEvent } =
    useBottomViewHook();
  const [showModal, setShowModal] = useRecoilState(addressModalAtom);

  return (
    <SafeAreaWrapper>
      <CartHeader />
      <ContentWrapper styles={{ paddingBottom: paddingAfterBottomView }}>
        <FlatList
          className="bg-white"
          data={CARDS}
          renderItem={({ item }) => item.component}
        />
      </ContentWrapper>
      <BottomActionView
        items={cartItems}
        onLayoutEvent={handleBottomViewLayoutEvent}
      >
        <CheckoutBottomActionView
          totalPrice={totalCartPrice}
          btnLabel="Checkout"
          actionLink={{ pathname: "/cart/checkout" }}
        />
      </BottomActionView>
      <DemoModalComponent
        showModal={showModal}
        handlePress={() => setShowModal(!showModal)}
      >
        <View className="flex-col gap-y-2">
          <View className="w-full">
            <Text className="text-2xl font-bold">Choose delivery address</Text>
          </View>
          <AddressSettingScreen />
          <View className="flex-row items-center justify-center">
            <TouchableOpacity className="rounded-full bg-orange-600 px-4 py-2">
              <Text className="text-xl text-white">Add another address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DemoModalComponent>
    </SafeAreaWrapper>
  );
}
