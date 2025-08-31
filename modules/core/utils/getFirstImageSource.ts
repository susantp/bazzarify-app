import { ImageSourcePropType } from "react-native";
import { IProductWithImage } from "@/modules/product/types/product";

interface IGetImageSrc {
  item: IProductWithImage;
  index?: number;
}

export default function getFirstImageSource({
  item,
  index = 0,
}: IGetImageSrc): ImageSourcePropType {
  if (!item.images?.length) {
    return require("@/assets/products/product.png");
  }

  return {
    uri: item.image_base_url?.concat(item.images[index].file),
  };
}
