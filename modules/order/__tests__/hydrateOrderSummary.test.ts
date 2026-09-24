import actionGetOrders from "@/modules/order/actions/actionGetOrders";
import actionGetOrderStatuses from "@/modules/order/actions/actionGetOrderStatuses";
import hydrateOrderSummary from "@/modules/order/utils/hydrateOrderSummary";

jest.mock("@/modules/order/actions/actionGetOrders", () => ({
  __esModule: true,
  default: jest.fn(async () => ({
    orders: {
      data: [
        {
          uuid: "order-1",
          order_number: "1001",
          status: "pending",
        },
      ],
    },
  })),
}));

jest.mock("@/modules/order/actions/actionGetOrderStatuses", () => ({
  __esModule: true,
  default: jest.fn(async () => [
    { code: "all", label: "All" },
    { code: "completed", label: "Completed", statuses: ["completed"] },
  ]),
}));

describe("hydrateOrderSummary", () => {
  beforeEach(() => {
    jest.mocked(actionGetOrders).mockClear();
    jest.mocked(actionGetOrderStatuses).mockClear();
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

    expect(jest.mocked(actionGetOrders)).toHaveBeenCalledWith("token-123");
    expect(jest.mocked(actionGetOrderStatuses)).toHaveBeenCalledWith(
      "token-123",
    );
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
