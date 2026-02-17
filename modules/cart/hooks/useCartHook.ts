import { useAtom, useAtomValue } from "jotai";
import { cartAtom } from "@/modules/cart/atoms";
import Toast from "react-native-toast-message";
import {
  CartItem,
  CartItemToUpdateQuantitySchema,
  TCartItem,
  TCartItemToUpdateQuantity,
} from "@/modules/order/schemas/orderSchema";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { TVariantListWithImage } from "@/modules/product/schemas/VariantSchema";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import {
  addCartItem,
  decrementCartItem,
  incrementCartItem,
  makeCartItem,
  removeCartItem,
} from "@/modules/cart/actions/cartService";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import { router } from "expo-router";
import { Alert } from "react-native";
import getCartItemToUpdate from "@/modules/cart/utils/getCartItemToUpdate";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
import { setAuthRedirect } from "@/modules/core/utils/authRedirect";

export default function useCartHook() {
  const [cartState, setCartState] = useAtom(cartAtom);
  const authStatus = useAtomValue(authStatusAtom);
  const isAuthenticated = authStatus === "authenticated";
  const [showAddressModal, setShowAddressModal] = useAtom(addressModalAtom);
  const handleAddressModal = () => {
    setShowAddressModal(!showAddressModal);
  };
  const handleAddToCart = (
    product: TProductWithVariantAndImage,
    selectedVariant?: TVariantListWithImage,
  ) => {
    if (!product) return;

    const data: TCartItem = makeCartItem(product, selectedVariant);

    console.log("Adding to cart before parsed:", data);
    const parsed = CartItem.safeParse(data);
    if (!parsed.success) {
      Toast.show({
        position: "bottom",
        text1: "Cannot add item to cart",
        type: "error",
      });
      console.log("add to cart error: ", formattedIssues(parsed.error.issues));
      return;
    }
    // post request to addToCart api then on success add to cart

    console.log("Adding to cart after parsed:", data);
    addCartItem(parsed.data)
      .then((result) => {
        if (result?.cart) {
          setCartState(result);
        }
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

  const handleCheckoutPress = () => {
    if (!isAuthenticated) {
      setAuthRedirect("/cart/checkout")
        .then(() => {
          router.push("/(guest)/login");
        })
        .catch(() => {
          router.push("/(guest)/login");
        });
      return;
    }

    if (cartState?.cart?.totals.items_count) {
      router.push("/cart/checkout");
      return;
    }

    Alert.alert("Please select item to checkout.");
  };

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
    incrementCartItem(parsed.data)
      .then((result) => {
        if (result?.cart) {
          setCartState(result);
        }
      })
      .catch((error) => {
        console.error("Failed to add item to cart:", error.message);
        Toast.show({
          position: "bottom",
          text1: "Failed to add item to cart",
          text2: "please try again later",
          type: "error",
        });
      });
  };

  const handleLineItemDecrement = (item: TCartItem) => {
    if (!item) return;
    const data = getCartItemToUpdate({ ...item, qty_ordered: 1 });
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
    decrementCartItem(parsed.data)
      .then((result) => {
        console.log("remove item from state called:", result?.cart);
        if (result?.cart) {
          setCartState(result);
        }
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
    const data = getCartItemToUpdate({ ...item, qty_ordered: 0 });
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
          setCartState(result);
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

  return {
    handleAddToCart,
    handleAddressModal,
    cartState,
    showAddressModal,
    handleLineItemIncrement,
    handleLineItemRemove,
    handleLineItemDecrement,
    handleCheckoutPress,
  };
}
