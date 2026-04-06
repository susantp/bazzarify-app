export default function resolveOrderStatusSelection({
  routeStatusId,
  currentStatus,
  availableStatuses,
}: {
  routeStatusId: string | string[] | undefined;
  currentStatus: string | null;
  availableStatuses: string[];
}): string | null {
  const firstStatus = availableStatuses[0] ?? null;

  if (typeof routeStatusId === "string") {
    return availableStatuses.includes(routeStatusId) ? routeStatusId : firstStatus;
  }

  if (currentStatus && availableStatuses.includes(currentStatus)) {
    return currentStatus;
  }

  return firstStatus;
}
