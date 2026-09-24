import {
  getProfileOrderStatusPreview,
  PROFILE_ORDER_STATUS_PREVIEW_LIMIT,
} from "@/components/account/profile/getProfileOrderStatusPreview";
import { ProfileMenuBoxType } from "@/modules/order/types";

const makeStatus = (id: string): ProfileMenuBoxType => ({
  id,
  label: id,
  status: id,
  icon: null,
});

describe("getProfileOrderStatusPreview", () => {
  it("limits the profile strip to a single-row preview", () => {
    const statuses = [
      makeStatus("all"),
      makeStatus("pending"),
      makeStatus("confirmed"),
      makeStatus("shipped"),
      makeStatus("completed"),
      makeStatus("returned"),
    ];

    expect(getProfileOrderStatusPreview(statuses)).toEqual(
      statuses.slice(1, PROFILE_ORDER_STATUS_PREVIEW_LIMIT + 1),
    );
  });
});
