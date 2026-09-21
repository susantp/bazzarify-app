interface ResolveTrackingOrderRefInput {
  orderUuid?: string | null;
  itemOrderUuid?: string | null;
  orderNumber?: string | null;
  routeOrderId?: string | null;
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const normalize = (value?: string | null) =>
  typeof value === "string" ? value.trim() : "";

export const isUuid = (value?: string | null) =>
  UUID_REGEX.test(normalize(value));

export default function resolveTrackingOrderRef(
  input: ResolveTrackingOrderRefInput,
) {
  const uuidRef = [input.orderUuid, input.itemOrderUuid, input.routeOrderId]
    .map(normalize)
    .find((value) => isUuid(value));

  if (uuidRef) {
    return uuidRef;
  }

  return [input.orderNumber, input.routeOrderId]
    .map(normalize)
    .find((value) => value.length > 0);
}
