import { ImageSourcePropType } from "react-native";
import { TImage } from "@/modules/product/schemas/ImageSchema";

interface IGetImageSrc {
  images: TImage[] | undefined | null;
  baseUrl: string;
  index?: number;
}

export default function getFirstImageSource({
  images,
  baseUrl,
  index = 0,
}: IGetImageSrc): ImageSourcePropType {
  const defaultImage = require("@/assets/images/iconSquare.png");

  if (!images?.length) return defaultImage;

  const safeIndex = index < 0 || index >= images.length ? 0 : index;

  return { uri: baseUrl.concat(images[safeIndex].file) };
}
