import { useSetAtom } from "jotai";
import { cartItemsAtom } from "@/modules/cart/atoms";
import Toast from "react-native-toast-message";
import { CartItem, TCartItem } from "@/modules/order/schemas/orderSchema";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { TVariantListWithImage } from "@/modules/product/schemas/VariantSchema";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import { addCartItem } from "@/modules/cart/actions/cartService";

export default function useCart() {
  const addToCart = useSetAtom(cartItemsAtom);

  const handleAddToCart = (
    product: TProductWithVariantAndImage,
    selectedVariant?: TVariantListWithImage,
  ) => {
    if (!product) return;

    const data: TCartItem = {
      name: product.name,
      uuid: product.uuid,
      sku: product.sku,
      variant_attrs: selectedVariant
        ? {
            uuid: selectedVariant.uuid,
            name: selectedVariant.name,
            sku: selectedVariant.sku,
          }
        : null,
      qty_ordered: 1,
      unit_price: selectedVariant?.price ?? product.base_price,
      row_tax: 0,
      row_discount: 0,
      row_total: selectedVariant?.price ?? product.base_price,
    };

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
    // post request to addToCart api the on success add to cart
    addCartItem(parsed.data).then((result) => {
      console.log(result);
      // addToCart(parsed.data);
    });
  };

  return { handleAddToCart };
}
