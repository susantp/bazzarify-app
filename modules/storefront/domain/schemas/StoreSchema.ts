import { z } from "zod";

export const StoreSchema = z
  .object({
    uuid: z.uuid(),
    name: z.string(),
    slug: z.string(),
    short_name: z.string().nullable(),
    short_description: z.string().nullable(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    country: z.string().nullable(),
    city: z.string().nullable(),
    province: z.string().nullable(),
    created_at: z.string().optional(),
    updated_at: z.string().nullable().optional(),
    deleted_at: z.string().optional().nullable(),
  })
  .strip();
