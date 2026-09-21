import { GridWrapper } from "@/components/home/ContentGridSection";
import { ThemedText } from "@/components/ThemedText";
import { FlatList } from "react-native";
import FlashDealsProductCard from "@/components/home/FlashDealsProductCard";
import { IHomeCardComponent } from "@/modules/home/types";
import { TFlashDealsPayload } from "@/modules/product/schemas/responsePayloads/FlashDealsPayloadSchema";

const className = "bg-white px-1 py-3";
const title = "Flash Deals";
// const seeMorePath = "/(tabs)/categories/flashDeal";
const id = "flashDeals";
const numCols = 3;
export default function FlashDealCard({
  queryResult,
}: IHomeCardComponent<TFlashDealsPayload>) {
  const { data, isLoading, isError, error } = queryResult;
  return (
    <GridWrapper className={className} title={title}>
      {isLoading ? (
        <ThemedText>Loading</ThemedText>
      ) : isError ? (
        <ThemedText>{error?.message}</ThemedText>
      ) : (
        <FlatList
          id={id}
          data={data?.flashDeals?.data}
          renderItem={({ item }) => <FlashDealsProductCard item={item} />}
          keyExtractor={(item) => item.uuid}
          horizontal={false}
          numColumns={numCols}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </GridWrapper>
  );
}
