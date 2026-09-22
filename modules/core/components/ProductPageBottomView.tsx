import React, { Suspense, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import PolygonButton from "@/components/common/PolygonButton";
import { useAtomValue } from "jotai";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
import { routeGuestToLoginForProtectedTarget } from "@/modules/core/utils/protectedNavigation";
import { Box, Icon, Text, useBazarifyTheme } from "@/components/design-system";

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
  const theme = useBazarifyTheme();
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
      <Box align="center" justify="center" style={styles.inventory}>
        <Text variant="bodyCompact">
          {inventoryMessage || "512+ sold in last month"}
        </Text>
      </Box>
      <Box direction="row" style={styles.footer}>
        <Box
          direction="row"
          justify="space-between"
          style={styles.storeActions}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Store"
            style={styles.iconAction}
            onPress={onStorePress}
          >
            <Icon size={24} color="text">
              <FontAwesome5
                name="apple-alt"
                color={theme.colors.text}
                size={24}
              />
            </Icon>
            <Text variant="bodyCompact">Store</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Chat"
            style={styles.iconAction}
          >
            <Icon size={24} color="text">
              <Octicons name="dependabot" color={theme.colors.text} size={24} />
            </Icon>
            <Text variant="bodyCompact">Chat</Text>
          </Pressable>
        </Box>
        {isAuthenticated ? (
          <Box
            direction="row"
            justify="flex-end"
            style={styles.purchaseActions}
          >
            <PolygonButton
              dimensions={leftBtnDimension}
              setDimensions={setLeftButtonDimensions}
              onPress={canPurchase ? onCartAdd : () => undefined}
              disabled={!canPurchase}
              color={theme.colors.text}
              isLeft={true}
              label={canPurchase ? "Add To Cart" : "Unavailable"}
            />
            <PolygonButton
              isLeft={false}
              dimensions={rightBtnDimension}
              setDimensions={setRightButtonDimensions}
              onPress={
                canPurchase
                  ? () => router.push("/cart/checkout")
                  : () => undefined
              }
              disabled={!canPurchase}
              color={theme.colors.primary}
              label={canPurchase ? "Buy Now" : "Out of Stock"}
            />
          </Box>
        ) : (
          <Box
            direction="row"
            justify="flex-end"
            style={styles.purchaseActions}
          >
            <PolygonButton
              dimensions={leftBtnDimension}
              setDimensions={setLeftButtonDimensions}
              onPress={() => {
                routeGuestToLoginForProtectedTarget("/cart/checkout").then(
                  () => undefined,
                );
              }}
              color={theme.colors.text}
              isLeft={true}
              label="Login To Buy"
            />
          </Box>
        )}
      </Box>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  inventory: { width: "100%" },
  footer: { width: "100%" },
  storeActions: { paddingLeft: 4, width: "25%" },
  purchaseActions: { width: "75%" },
  iconAction: { alignItems: "center", justifyContent: "center" },
});

export default ProductPageBottomView;
