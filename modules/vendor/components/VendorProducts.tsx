import { GridWrapper } from "@/components/home/ContentGridSection";
import ProductCard from "@/components/common/ProductCard";
import { IHomeInfiniteCardComponent } from "@/modules/home/types";
import InfiniteProductGrid from "@/modules/core/components/InfiniteProductGrid";
import { TProductSearchPayload } from "@/modules/product/schemas/responsePayloads/ProductSearchPayloadSchema";

const title = "Products";
const id = "VendorProducts";
const numCols = 2;
export default function VendorProducts({
  queryResult,
}: IHomeInfiniteCardComponent<TProductSearchPayload | null>) {
  return (
    <GridWrapper title={title}>
      <InfiniteProductGrid
        id={id}
        numColumns={numCols}
        queryResult={queryResult}
        selectItems={(p) => p?.products?.data || []}
        renderItem={({ item }) =>
          item ? <ProductCard item={item} cols={numCols} /> : null
        }
        keyExtractor={(item) => item.uuid}
      />
    </GridWrapper>
  );
}
