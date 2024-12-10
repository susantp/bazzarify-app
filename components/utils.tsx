import { ItemProps, titleKey } from "@/components/index";
import FlashDealsProductCard from "@/components/home/FlashDealsProductCard";
import ProductCard from "@/components/common/ProductCard";
import React from "react";
import CategoryCard from "@/components/common/CategoryCard";

export type ComponentMapperProps = {
  item: ItemProps;
  index: number;
  titleKey: titleKey;
  cols: 2 | 3 | 4;
};
export const componentMapper = ({
  item,
  index,
  titleKey,
  cols,
}: ComponentMapperProps) => {
  const mapper = {
    "Flash Deals": <FlashDealsProductCard item={item} />,
    "Popular Items": <ProductCard item={item} key={index} cols={cols} />,
    "Just for you": <ProductCard item={item} key={index} cols={cols} />,
    Categories: <CategoryCard cols={cols} item={item} index={index} />,
  };

  if (!mapper[titleKey]) return <></>;
  return mapper[titleKey];
};
