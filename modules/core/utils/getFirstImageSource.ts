import { ItemImage } from "@/components";
import { ImageSourcePropType } from "react-native";

interface IGetImageSrc {
  itemImages?: ItemImage[];
  index?: number;
}

export default function getFirstImageSource({
  itemImages,
  index = 0,
}: IGetImageSrc): ImageSourcePropType {
  return itemImages?.length
    ? { uri: itemImages[index].s3_path_url }
    : require("@/assets/products/product.png");
}
