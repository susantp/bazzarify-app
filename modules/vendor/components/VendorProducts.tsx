import { GridWrapper } from "@/components/home/ContentGridSection";
import ProductCard from "@/components/common/ProductCard";
import React from "react";
import { IHomeInfiniteCardComponent } from "@/modules/home/types";
import InfiniteProductGrid from "@/modules/core/components/InfiniteProductGrid";
import { TProductSearchPayload } from "@/modules/product/schemas/responsePayloads/ProductSearchPayloadSchema";
import { randomUUID } from "expo-crypto";

const className = "bg-white px-1 py-3";
const title = "Products";
// const seeMorePath = "/(tabs)/categories/just-for-you";
const id = "VendorProducts";
const numCols = 2;
export default function VendorProducts({
  queryResult,
}: IHomeInfiniteCardComponent<TProductSearchPayload | null>) {
  return (
    <GridWrapper className={className} title={title}>
      <InfiniteProductGrid
        id={id}
        numColumns={numCols}
        queryResult={queryResult}
        selectItems={(p) => p?.products?.data || []}
        renderItem={({ item, index }) =>
          item ? <ProductCard item={item} key={index} cols={numCols} /> : null
        }
        keyExtractor={(item) => item?.uuid || randomUUID()}
      />
    </GridWrapper>
  );
}
