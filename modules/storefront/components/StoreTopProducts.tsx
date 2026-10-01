import { GridWrapper } from "@/components/home/ContentGridSection";
import ProductCard from "@/components/common/ProductCard";
import { IHomeInfiniteCardComponent } from "@/modules/home/types";
import InfiniteProductGrid from "@/modules/core/components/InfiniteProductGrid";
import { TProductSearchPayload } from "@/modules/product/schemas/responsePayloads/ProductSearchPayloadSchema";
import { StorefrontProductGridFeedback } from "./StorefrontProductGridFeedback";

const title = "Top Products";
const id = "TopProducts";
const numCols = 2;
export default function StoreTopProducts({
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
          <StorefrontProductGridFeedback
            kind="empty"
            title="No top products yet"
            description="Popular products will appear here when available."
          />
        }
        listErrorComponent={
          <StorefrontProductGridFeedback
            kind="error"
            title="Couldn't load top products"
            description="Check your connection and try again."
            retryLabel="Try again"
            onRetry={() => void queryResult.refetch()}
          />
        }
      />
    </GridWrapper>
  );
}
