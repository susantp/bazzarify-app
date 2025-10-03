import { useSetAtom } from "jotai";
import { cartAtom } from "@/modules/cart/atoms";
import Toast from "react-native-toast-message";
import { CartItem, TCartItem } from "@/modules/order/schemas/orderSchema";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { TVariantListWithImage } from "@/modules/product/schemas/VariantSchema";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import { addCartItem, makeCartItem } from "@/modules/cart/actions/cartService";

export default function useCart() {
  const addToCartState = useSetAtom(cartAtom);

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
      console.log(formattedIssues(parsed.error.issues));
      return;
    }
    // post request to addToCart api then on success add to cart

    console.log("Adding to cart after parsed:", data);
    addCartItem(parsed.data)
      .then((result) => {
        if (result?.cart) {
          addToCartState(result);
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

  return { handleAddToCart };
}
