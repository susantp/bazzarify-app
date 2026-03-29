import ProductCard from "@/components/common/ProductCard";
import { TOmittedProductWithImages } from "@/modules/product/schemas/ProductSchema";

export interface SingleProductCardProps {
  item: TOmittedProductWithImages | null;
}
const SingleProductCard = ({ item }: SingleProductCardProps) => {
  return <ProductCard item={item} cols={2} />;
};
export default SingleProductCard;
