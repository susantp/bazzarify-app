import { GridWrapper } from "@/components/home/ContentGridSection";
import ProductCard from "@/components/common/ProductCard";
import React from "react";
import { TJustForYouProductsPayload } from "@/modules/product/schemas/responsePayloads/JustForYouProductsPayloadSchema";
import { IHomeInfiniteCardComponent } from "@/modules/home/types";
import InfiniteProductGrid from "@/modules/core/components/InfiniteProductGrid";
import { randomUUID } from "expo-crypto";

const className = "bg-white px-1 py-3";
const title = "Just For You";
// const seeMorePath = "/(tabs)/categories/just-for-you";
const id = "JustForYou";
const numCols = 2;
export default function JustForYou({
  queryResult,
}: IHomeInfiniteCardComponent<TJustForYouProductsPayload | null>) {
  return (
    <GridWrapper className={className} title={title}>
      <InfiniteProductGrid
        id={id}
        numColumns={numCols}
        queryResult={queryResult}
        selectItems={(p) => p?.justForYouProducts.data || []}
        renderItem={({ item, index }) =>
          item ? <ProductCard item={item} key={index} cols={numCols} /> : null
        }
        keyExtractor={(item) => item?.uuid ?? randomUUID()}
      />
    </GridWrapper>
  );
}
