import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import { useAtom } from "jotai";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import React from "react";

export const CartHeaderActions = () => {
  const [showModal, setShowModal] = useAtom(addressModalAtom);

  return <></>;
};
