import { GridWrapper } from "@/components/home/ContentGridSection";
import ProductCard from "@/components/common/ProductCard";
import { TJustForYouProductsPayload } from "@/modules/product/schemas/responsePayloads/JustForYouProductsPayloadSchema";
import { IHomeInfiniteCardComponent } from "@/modules/home/types";
import InfiniteProductGrid from "@/modules/core/components/InfiniteProductGrid";
import { EmptyState, ErrorState } from "@/components/design-system";

const title = "Just For You";
// const seeMorePath = "/(tabs)/categories/just-for-you";
const id = "JustForYou";
const numCols = 2;
export default function JustForYou({
  queryResult,
}: IHomeInfiniteCardComponent<TJustForYouProductsPayload | null>) {
  return (
    <GridWrapper title={title}>
      <InfiniteProductGrid
        id={id}
        numColumns={numCols}
        queryResult={queryResult}
        selectItems={(p) =>
          p?.justForYouProducts.data?.filter(
            (item): item is NonNullable<typeof item> => item !== null,
          ) ?? []
        }
        renderItem={({ item }) => <ProductCard item={item} cols={numCols} />}
        keyExtractor={(item) => item.uuid}
        listEmptyComponent={
          <EmptyState
            title="No recommendations yet"
            description="Check back later for products picked for you."
            testID="just-for-you-empty"
          />
        }
        listErrorComponent={
          <ErrorState
            title="Couldn't load recommendations"
            description="Check your connection and try again."
            action={{
              label: "Retry",
              onPress: () => void queryResult.refetch(),
            }}
            testID="just-for-you-error"
          />
        }
      />
    </GridWrapper>
  );
}
