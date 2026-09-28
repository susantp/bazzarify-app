import { describe, expect, it } from "bun:test";
import { OrderItemRefundCaseSchema } from "./orderSchema";

const refundCase = {
  uuid: "123e4567-e89b-42d3-a456-426614174000",
  requested_quantity: 1,
  amount_minor: 1250,
  status: "approved",
  reason: "Item arrived damaged",
  created_at: "2026-09-28T12:00:00.000Z",
  decision_at: "2026-09-28T13:00:00.000Z",
  returned_at: null,
};

describe("OrderItemRefundCaseSchema", () => {
  it("accepts buyer-visible refund status and strips internal evidence", () => {
    const parsed = OrderItemRefundCaseSchema.parse({
      ...refundCase,
      decision_note: "Internal note",
      return_receipt_reference: "cash-desk-42",
    });

    expect(parsed.status).toBe("approved");
    expect(parsed).not.toHaveProperty("decision_note");
    expect(parsed).not.toHaveProperty("return_receipt_reference");
  });

  it("rejects invalid statuses and non-integer money", () => {
    expect(
      OrderItemRefundCaseSchema.safeParse({ ...refundCase, status: "pending" })
        .success,
    ).toBe(false);
    expect(
      OrderItemRefundCaseSchema.safeParse({ ...refundCase, amount_minor: 1.5 })
        .success,
    ).toBe(false);
  });
});
