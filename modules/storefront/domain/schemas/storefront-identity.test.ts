import { describe, expect, it } from "bun:test";
import { ProductSchema } from "@/modules/product/schemas/ProductSchema";
import { StorefrontStorePayloadSchema } from "@/modules/storefront/domain/schemas/responsePayloads/StorefrontStorePayloadSchema";

const storeUuid = "7c80f48d-793c-415d-bace-2d44fb166866";

describe("storefront identity contracts", () => {
  it("keys product storefront identity by store UUID", () => {
    expect(ProductSchema.shape.store_uuid.parse(storeUuid)).toBe(storeUuid);
    expect("user_uuid" in ProductSchema.shape).toBe(false);
  });

  it("accepts the public store projection without tenant or vendor ownership fields", () => {
    const parsed = StorefrontStorePayloadSchema.parse({
      store: {
        uuid: storeUuid,
        name: "Store",
        slug: "store",
        short_name: null,
        short_description: "Description",
        country: null,
        city: null,
        province: null,
        tenant_uuid: "private-tenant-value",
        assigned_vendor_user_uuid: "private-vendor-value",
      },
      currency: { code: "NPR" },
    });

    expect(parsed.store?.uuid).toBe(storeUuid);
    expect("tenant_uuid" in (parsed.store ?? {})).toBe(false);
    expect("assigned_vendor_user_uuid" in (parsed.store ?? {})).toBe(false);
  });
});
