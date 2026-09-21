import { OrderStatus } from "@/modules/order/enums/OrderStatus";

const ORDER_STATUS_RANK: Record<string, number> = {
  [OrderStatus.DRAFT]: 10,
  [OrderStatus.CONFIRMED]: 20,
  [OrderStatus.ALLOCATED]: 30,
  [OrderStatus.PARTIALLY_SHIPPED]: 40,
  [OrderStatus.SHIPPED]: 50,
  [OrderStatus.DELIVERED]: 60,
  [OrderStatus.COMPLETED]: 70,
  [OrderStatus.CANCELED]: 80,
  [OrderStatus.RETURNED]: 90,
};

const getStatusRank = (status: string) =>
  Object.hasOwn(ORDER_STATUS_RANK, status)
    ? ORDER_STATUS_RANK[status]
    : Number.MAX_SAFE_INTEGER;

export default function sortOrderStatuses(statuses: string[]): string[] {
  return [...statuses].sort((left, right) => {
    const rankDifference = getStatusRank(left) - getStatusRank(right);

    if (rankDifference !== 0) {
      return rankDifference;
    }

    return left.localeCompare(right);
  });
}
