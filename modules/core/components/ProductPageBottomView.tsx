import React, { Suspense, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import PolygonButton from "@/components/common/PolygonButton";
import { useAtomValue } from "jotai";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
import { routeGuestToLoginForProtectedTarget } from "@/modules/core/utils/protectedNavigation";

interface IProductPageBottomView {
  onCartAdd: () => void;
  canPurchase?: boolean;
  inventoryMessage?: string;
  onStorePress?: () => void;
}

const ProductPageBottomView = ({
  onCartAdd,
  canPurchase = true,
  inventoryMessage,
  onStorePress,
}: IProductPageBottomView) => {
  const authStatus = useAtomValue(authStatusAtom);
  const isAuthenticated = authStatus === "authenticated";
  const [leftBtnDimension, setLeftButtonDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [rightBtnDimension, setRightButtonDimensions] = useState({
    width: 0,
    height: 0,
  });

  return (
    <Suspense fallback={<Text>Item is adding to cart</Text>}>
      <View className="w-full flex-row justify-center">
        <Text>{inventoryMessage || "512+ sold in last month"}</Text>
      </View>
      <View className="flex-row">
        <View className="w-3/12 flex-row justify-between pl-1">
          <TouchableOpacity
            className="flex-col items-center"
            onPress={onStorePress}
          >
            <FontAwesome5 name="apple-alt" color="black" size={24} />
            <Text>Store</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <Octicons name="dependabot" color="black" size={24} />
            <Text>Chat</Text>
          </TouchableOpacity>
        </View>
        {isAuthenticated ? (
          <View className="w-9/12 flex-row justify-end">
            <PolygonButton
              dimensions={leftBtnDimension}
              setDimensions={setLeftButtonDimensions}
              onPress={canPurchase ? onCartAdd : () => undefined}
              disabled={!canPurchase}
              color="#1A202C"
              isLeft={true}
              label={canPurchase ? "Add To Cart" : "Unavailable"}
            />
            <PolygonButton
              isLeft={false}
              dimensions={rightBtnDimension}
              setDimensions={setRightButtonDimensions}
              onPress={
                canPurchase ? () => router.push("/cart/checkout") : () => undefined
              }
              disabled={!canPurchase}
              color={Colors.light.tint}
              label={canPurchase ? "Buy Now" : "Out of Stock"}
            />
          </View>
        ) : (
          <View className="w-9/12 flex-row justify-end">
            <PolygonButton
              dimensions={leftBtnDimension}
              setDimensions={setLeftButtonDimensions}
              onPress={() => {
                routeGuestToLoginForProtectedTarget("/cart/checkout").then(
                  () => undefined,
                );
              }}
              color="#1A202C"
              isLeft={true}
              label="Login To Buy"
            />
          </View>
        )}
      </View>
    </Suspense>
  );
};

export default ProductPageBottomView;
