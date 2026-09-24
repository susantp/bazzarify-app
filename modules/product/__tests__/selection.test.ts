import {
  getAutoResolvedVariant,
  productRequiresCustomerSelection,
  shouldDisplayVariantLabel,
} from "@/modules/product/utils/selection";

const baseProduct = {
  uuid: "11111111-1111-1111-1111-111111111111",
  type: "retail" as const,
  image_base_path: "",
  image_base_url: "",
  id: null,
  name: "Face Wash",
  sku: "FACE-WASH",
  slug: "face-wash",
  base_price: 110,
  description: {},
  highlights: {},
  box_items: null,
  status_text: "Draft",
  available_to_sell: 8,
  can_purchase: true,
  low_stock: false,
  brand_uuid: null,
  status: 4,
  brand: null,
  images: [],
  specifications: {},
  created_at: undefined,
  updated_at: undefined,
  deleted_at: undefined,
  variants: [
    {
      uuid: "22222222-2222-2222-2222-222222222222",
      product_uuid: "11111111-1111-1111-1111-111111111111",
      name: "Face Wash",
      sku: "FACE-WASH-01",
      price: 110,
      stock: 8,
      available: true,
      available_to_sell: 8,
      image_base_path: "",
      image_base_url: "",
      product: {} as never,
      images: [],
    },
  ],
};

describe("product selection", () => {
  it("uses the automatically resolved variant when customer choice is unnecessary", () => {
    expect(
      getAutoResolvedVariant({
        ...baseProduct,
        selection: {
          requires_customer_selection: false,
          auto_resolvable_variant_uuid: "22222222-2222-2222-2222-222222222222",
        },
      } as never)?.uuid,
    ).toBe("22222222-2222-2222-2222-222222222222");
  });

  it("requires customer choice when the product selection says so", () => {
    expect(
      productRequiresCustomerSelection({
        ...baseProduct,
        variants: [
          ...baseProduct.variants,
          {
            ...baseProduct.variants[0],
            uuid: "33333333-3333-3333-3333-333333333333",
            sku: "FACE-WASH-02",
            name: "Large",
          },
        ],
        selection: {
          requires_customer_selection: true,
          auto_resolvable_variant_uuid: null,
        },
      } as never),
    ).toBe(true);
  });

  it("hides a redundant variant label and shows a distinct one", () => {
    expect(shouldDisplayVariantLabel("Face Wash", "Face Wash")).toBe(false);
    expect(shouldDisplayVariantLabel("Face Wash", "Large")).toBe(true);
  });
});
