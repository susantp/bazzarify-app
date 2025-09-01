import { GridWrapper } from "@/components/home/ContentGridSection";
import { IFlashDealsPayload } from "@/modules/product/types/payloads";
import { ThemedText } from "@/components/ThemedText";
import { FlatList } from "react-native";
import FlashDealsProductCard from "@/components/home/FlashDealsProductCard";
import * as Crypto from "expo-crypto";
import { IHomeCardComponent } from "@/modules/home/types";

const className = "bg-white px-1 py-3";
const title = "Flash Deals";
const seeMorePath = "/(tabs)/categories/flashDeal";
const id = "flashDeals";
const numCols = 3;
export default function FlashDealCard({
  queryResult,
}: IHomeCardComponent<IFlashDealsPayload | undefined>) {
  const { data, isLoading, isError, error } = queryResult;
  return (
    <GridWrapper className={className} title={title} seeMorePath={seeMorePath}>
      {isLoading ? (
        <ThemedText>Loading</ThemedText>
      ) : isError ? (
        <ThemedText>{error?.message}</ThemedText>
      ) : (
        <FlatList
          id={id}
          data={data?.flashDeals.data}
          renderItem={({ item }) => <FlashDealsProductCard item={item} />}
          keyExtractor={() => Crypto.randomUUID()}
          horizontal={false}
          numColumns={numCols}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </GridWrapper>
  );
}
