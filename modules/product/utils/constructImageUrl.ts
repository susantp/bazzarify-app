import { ImageSliderType } from "@/constants/SliderData";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";

export default function constructProductImagesUrl(
  product: TProductWithVariantAndImage,
): ImageSliderType[] | undefined {
  if (!product.images || product.images.length === 0) return undefined;
  return product.images.map((img) => ({
    title: "",
    description: "",
    image: { uri: product.image_base_url.concat(img.file) },
  }));
}
