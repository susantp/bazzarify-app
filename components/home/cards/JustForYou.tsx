import { GridWrapper } from "@/components/home/ContentGridSection";
import ProductCard from "@/components/common/ProductCard";
import React from "react";
import { IJustForYouProductsPayload } from "@/modules/product/types/payloads";
import { IHomeInfiniteCardComponent } from "@/modules/home/types";
import InfiniteProductGrid from "@/components/common/InfiniteProductGrid";

const className = "bg-white px-1 py-3";
const title = "Just For You";
const seeMorePath = "/(tabs)/categories/just-for-you";
const id = "JustForYou";
const numCols = 2;
export default function JustForYou({
  queryResult,
}: IHomeInfiniteCardComponent<IJustForYouProductsPayload>) {
  return (
    <GridWrapper className={className} title={title} seeMorePath={seeMorePath}>
      <InfiniteProductGrid
        id={id}
        numColumns={numCols}
        queryResult={queryResult}
        selectItems={(p) => p.justForYouProducts.data}
        renderItem={({ item, index }) => (
          <ProductCard item={item} key={index} cols={numCols} />
        )}
        keyExtractor={(item) => item?.uuid}
      />
    </GridWrapper>
  );
}
