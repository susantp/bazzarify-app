import { ProfileMenuBoxType } from "@/modules/order/types";

const PROFILE_ORDER_STATUS_PREVIEW_LIMIT = 4;

export function getProfileOrderStatusPreview(
  statuses: ProfileMenuBoxType[],
): ProfileMenuBoxType[] {
  return statuses
    .filter((status) => status.id !== "all")
    .slice(0, PROFILE_ORDER_STATUS_PREVIEW_LIMIT);
}

export { PROFILE_ORDER_STATUS_PREVIEW_LIMIT };
