import { GridWrapper } from "@/components/home/ContentGridSection";
import ProductCard from "@/components/common/ProductCard";
import { IHomeInfiniteCardComponent } from "@/modules/home/types";
import InfiniteProductGrid from "@/modules/core/components/InfiniteProductGrid";
import { TProductSearchPayload } from "@/modules/product/schemas/responsePayloads/ProductSearchPayloadSchema";
import { VendorProductGridFeedback } from "./VendorProductGridFeedback";

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
        listEmptyComponent={
          <VendorProductGridFeedback
            kind="empty"
            title="No products found"
            description="This store has not added any products yet."
          />
        }
        listErrorComponent={
          <VendorProductGridFeedback
            kind="error"
            title="Couldn't load products"
            description="Check your connection and try again."
            retryLabel="Try again"
            onRetry={() => void queryResult.refetch()}
          />
        }
      />
    </GridWrapper>
  );
}
