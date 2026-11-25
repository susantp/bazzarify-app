import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Input, Text } from "@/components/design-system";
import { getProductDeliveryQuote } from "@/modules/product/services/product/getProductDeliveryQuote";
import type { TUserAddress } from "@/modules/user/schemas/UserAddress";

const fields = [
  { key: "country", label: "Two-letter country code", limit: 2 },
  { key: "region", label: "State or region", limit: 100 },
  { key: "city", label: "City", limit: 100 },
  { key: "postal_code", label: "Postal code", limit: 32 },
] as const;

export default function ProductDeliveryEstimate({
  productUuid,
  variantUuid,
  minimumQuantity,
  address,
}: {
  productUuid: string;
  variantUuid?: string;
  minimumQuantity: number;
  address: TUserAddress | null;
}) {
  const [destination, setDestination] = useState({
    country:
      address && /^[a-z]{2}$/i.test(address.country) ? address.country : "",
    region: address?.state ?? "",
    city: address?.city ?? "",
    postal_code: address?.zip ?? "",
  });
  const [quantityText, setQuantityText] = useState(String(minimumQuantity));
  const [requested, setRequested] = useState(false);
  const quantity = Number(quantityText);
  const valid =
    /^[a-z]{2}$/i.test(destination.country.trim()) &&
    /^\d+$/.test(quantityText) &&
    quantity >= minimumQuantity &&
    quantity <= 2147483647;
  const quote = useQuery({
    queryKey: [
      "product-delivery-quote",
      productUuid,
      variantUuid,
      quantity,
      destination,
    ],
    queryFn: ({ signal }) => {
      if (!variantUuid) throw new Error("Select an available option.");
      return getProductDeliveryQuote(
        productUuid,
        variantUuid,
        quantity,
        destination,
        signal,
      );
    },
    enabled: requested && valid && Boolean(variantUuid),
    staleTime: 0,
    retry: false,
  });

  if (!variantUuid)
    return <Text>Select an available option for a delivery estimate.</Text>;
  const estimate =
    requested && !quote.isFetching && !quote.isError ? quote.data : undefined;

  return (
    <Box gap="sm">
      {fields.map(({ key, label, limit }) => (
        <Box gap="xs" key={key}>
          <Text>{label}</Text>
          <Input
            accessibilityLabel={label}
            autoCapitalize={key === "country" ? "characters" : "none"}
            maxLength={limit}
            value={destination[key]}
            onChangeText={(value) => {
              setRequested(false);
              setDestination((current) => ({ ...current, [key]: value }));
            }}
          />
        </Box>
      ))}
      <Text>Quantity for estimate</Text>
      <Input
        accessibilityLabel="Quantity for estimate"
        keyboardType="number-pad"
        value={quantityText}
        onChangeText={(value) => {
          setRequested(false);
          setQuantityText(value);
        }}
      />
      <Button
        label={
          requested && quote.isFetching
            ? "Checking delivery…"
            : "Check delivery"
        }
        disabled={!valid || (requested && quote.isFetching)}
        onPress={() => {
          if (requested) void quote.refetch();
          else setRequested(true);
        }}
      />
      {requested && quote.isError ? (
        <Text>Could not check delivery. Try again.</Text>
      ) : null}
      {estimate?.status === "available" ? (
        <Box gap="xs" accessibilityLiveRegion="polite">
          <Text>
            Estimated delivery{" "}
            {estimate.estimate_from === estimate.estimate_to
              ? estimate.estimate_from
              : `${estimate.estimate_from} to ${estimate.estimate_to}`}
          </Text>
          <Text>
            {estimate.amount_minor === 0
              ? "Free delivery"
              : `Estimated fee ${new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: estimate.currency,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(estimate.amount_minor / 100)}`}
          </Text>
        </Box>
      ) : estimate ? (
        <Text accessibilityLiveRegion="polite">{estimate.reason}</Text>
      ) : null}
    </Box>
  );
}
