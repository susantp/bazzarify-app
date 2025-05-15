import { ItemProps } from "@/components";
import { ImageSourcePropType } from "react-native";

interface IGetImageSrc {
  item: ItemProps;
  index?: number;
}

export default function getImageSrc({
  item,
  index = 0,
}: IGetImageSrc): ImageSourcePropType {
  return item?.images?.length
    ? { uri: item.images[index].s3_path_url }
    : require("@/assets/products/product.png");
}
