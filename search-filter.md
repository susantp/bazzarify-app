# Task: Add price_range filter with correct Spatie alignment and cache handling

You are working in a **React Native Expo** app.

## Goal
Extend product search to support a `price_range` filter (`min` / `max`) and ensure it aligns with **Spatie Laravel Query Builder** on the backend.

## Context
- `useProductSearch` currently searches by product name.
- A filter UI already exists for **attributes** and **categories**.
- Add `price_range` using the same filter pattern.
- Backend already supports: filter[price_range][min], filter[price_range][max] via `AllowedFilter::custom()` (refer to latest Spatie Query Builder docs).
- Filter values are stored as **strings** in state.
- `buildSpatieFilterQuery` already exists and must be updated to emit correct Spatie-compatible query params.

## Requirements
1. Add `price_range` (`min`, `max`) support to filters.
2. Update `buildSpatieFilterQuery` to output nested Spatie filters.
3. Merge generated filters into the existing `getProductByQuery` call.
4. Reuse the existing `useInfiniteQuery` logic.
5. **Fix cache behavior** by including filters in the `queryKey`:
- Use a **serialized Spatie filter object** so cache keys are stable and deterministic.


## Cache Key Rule (Important)
Any value that affects the result set **must** be part of the `queryKey`.

Correct approach:
- Build Spatie filters first
- Serialize them
- Include them in `queryKey`
Example:
```ts
const spatieFilters = buildSpatieFilterQuery(filters);

queryKey: ["product", currentQuery, JSON.stringify(spatieFilters)]
```
This prevents stale or incorrect cached results when filters or search terms change

## Existing Code (must reuse)
```ts
const queryResult = useInfiniteQuery({
  queryKey: ["product", currentQuery],
  initialPageParam: 1,
  queryFn: ({ pageParam }) =>
    getProductByQuery({
      perPage: "10",
      page: String(pageParam),
      "filter[name]": currentQuery,
    }),
  getNextPageParam: (lastPage) => {
    const p = lastPage?.products;
    return p?.next_page_url ? Number(p.current_page) + 1 : undefined;
  },
  enabled: Boolean(currentQuery),
});

```
```ts
export default async function getProductByQuery(
  params?: Record<string, string>,
): Promise<TProductSearchPayload | null> {
  const response = await fetchDataAndValidate(
    "/search/product",
    DataSchema(ProductSearchPayloadSchema),
    "Unable to just for you products",
    params,
  );
  return response.payload;
}
```
## Expected Output
- Updated buildSpatieFilterQuery with price_range support
- Updated queryKey including serialized filters
- price_range sent as: filter[price_range][min], filter[price_range][max]
- Behavior consistent with existing attribute and category filters
