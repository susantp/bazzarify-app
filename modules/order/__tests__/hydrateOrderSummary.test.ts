import { beforeEach, describe, expect, it, mock } from "bun:test";

const actionGetOrders = mock(async () => ({
  orders: {
    data: [
      {
        uuid: "order-1",
        order_number: "1001",
        status: "pending",
      },
    ],
  },
}));

const actionGetOrderStatuses = mock(async () => [
  {
    code: "all",
    label: "All",
  },
  {
    code: "completed",
    label: "Completed",
    statuses: ["completed"],
  },
]);

mock.module("@/modules/order/actions/actionGetOrders", () => ({
  default: actionGetOrders,
}));

mock.module("@/modules/order/actions/actionGetOrderStatuses", () => ({
  default: actionGetOrderStatuses,
}));

const hydrateOrderSummary = (
  await import("@/modules/order/utils/hydrateOrderSummary")
).default;

describe("hydrateOrderSummary", () => {
  beforeEach(() => {
    actionGetOrders.mockClear();
    actionGetOrderStatuses.mockClear();
  });

  it("hydrates both recent orders and available statuses", async () => {
    let orders: unknown = "unset";
    let statuses: unknown = "unset";

    await hydrateOrderSummary({
      token: "token-123",
      setOrders: (value) => {
        orders = value;
      },
      setOrderStatuses: (value) => {
        statuses = value;
      },
    });

    expect(actionGetOrders).toHaveBeenCalledWith("token-123");
    expect(actionGetOrderStatuses).toHaveBeenCalledWith("token-123");
    expect(orders).toEqual({
      orders: {
        data: [
          {
            uuid: "order-1",
            order_number: "1001",
            status: "pending",
          },
        ],
      },
    });
    expect(statuses).toEqual([
      {
        code: "all",
        label: "All",
      },
      {
        code: "completed",
        label: "Completed",
        statuses: ["completed"],
      },
    ]);
  });
});
