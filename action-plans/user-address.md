# User Address Flow - Analysis and Plan

Date: 2026-01-25

## Current Flow (Product -> Order)
1) Product page (`app/products/[uuid].tsx`) uses `useProductScreen`.
   - Delivery section shows `chosenAddress` from `selectedDeliveryAddress` (atom) or `currentAddress` from device geocode.
   - "Change" opens a map portal (`MapView`) and stores a `LocationGeocodedAddress` in `selectedDeliveryAddress`.
2) Add to cart uses `modules/cart/hooks/useCartHook` -> cart service APIs.
3) Cart screen opens address modal (`AddressSettingScreen`) from cart header.
4) Checkout uses `useCheckoutScreenHook` and shows address from:
   - `selectedDeliveryAddress` (map-based) OR
   - `geocodeAddressAtom` (device location).
5) Payment/Place Order uses `usePaymentScreenHook`:
   - Requires `getDefaultAddressAtom` (saved user address).
   - Places order with `shippingInformation` built from the *default saved address* (not the map-selected one).

## Inconsistencies / Risks
- Type mismatch: product/checkout use `LocationGeocodedAddress`, order uses `TUserAddress`.
- Address chosen on product/checkout is not used for order placement.
- Checkout address change UI is commented out; user cannot reliably change address during checkout.
- Map-selected address is not persisted, has no `uuid`/`user_uuid`, so it cannot satisfy `TShippingInformation`.
- Two sources of truth (device geocode vs saved addresses) create user confusion and fail to meet shipping requirements.
- Only COD flow calls `actionPlaceOrder`; card/imePay flows do not place an order.

## Best Practical Production-Grade Solution (Minimal, Solid)
Single source of truth = *saved user address* for any order placement.

### Key Principles
- Only `TUserAddress` (saved addresses) can be used for checkout/payment.
- One global selected delivery address (atom), defaulting to server default.
- Product page can display and change delivery address via the same address selector used in cart/checkout.
- Map-based location can be moved to "Create new address" flow if needed later, but should not drive checkout directly until saved.

### Minimal Changes
1) **Replace `selectedDeliveryAddress` atom type**
   - From `LocationGeocodedAddress | null` -> `TUserAddress | null`.
2) **Use selected address in checkout and payment**
   - Checkout should read `selectedDeliveryAddress` (fallback: `getDefaultAddressAtom`).
   - Payment should use the same selected address, not just default.
3) **Product page address display**
   - Show selected/saved address string (street/city/state/zip/country).
   - "Change" opens address modal (`AddressSettingScreen`) or navigates to address list.
   - Remove map portal from product page until it is wired to address creation.
4) **Validation gates**
   - Block checkout/payment if no saved address exists; route user to create address.

### Optional (Later, If Needed)
- Add a "Save current map location as address" flow that creates a new `TUserAddress` on the server, then selects it.

## Files Likely Affected
- `modules/cart/atoms/index.ts`
- `modules/checkout/hooks/useCheckoutScreenHook.tsx`
- `hooks/usePaymentScreenHook.tsx`
- `modules/product/hooks/useProductScreen.tsx`
- `components/product/ProductDeliveryDetails.tsx`
- `components/cart/checkout/CheckoutAddressComponent.tsx`
- `components/cart/CartHeader.tsx` (if adding change-entry point)

## Sanity Checks
- Ensure `selectedDeliveryAddress` never mixes geocode types.
- Ensure `actionPlaceOrder` always receives `TShippingInformation` (saved address + name/phone).
- Ensure address selection affects both checkout display and actual order payload.


## Overview on what needs to be done
- when user selects an address on product page, it should open map also with saved addresses, and choose address on map option.
- on map when user tap it should populate address on form to save address. existing expo package can be used to reverse geocode latlng to address.
- once user saves address, it should be set as selected address.
- on checkout page, selected address should be shown. if no address is selected, default address should be shown.
- on payment page, selected address should be used to place order.
- if no address is selected, user should be prompted to select an address before placing order.

## Implementation Status (2026-01-25)
- Added a dedicated delivery address picker modal with saved addresses + "Choose on map".
- Map selection now reverse-geocodes and pre-fills the address create form.
- Created address becomes the selected delivery address.
- Checkout shows selected address with default fallback.
- Payment uses selected address (or default) to place order and redirects to checkout if missing.
- Delivery picker now includes "Use current location" to open the map from product/cart/checkout.
- Map picker now supports address search with suggestions and selection to prefill the save form.
- Added API key fallback via `extra.googleMapsApiKey` and surfaced search errors in the UI.
