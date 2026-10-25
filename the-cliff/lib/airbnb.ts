import { site } from "./content";

export type BookingQuery = {
  checkIn?: string; // YYYY-MM-DD
  checkOut?: string; // YYYY-MM-DD
  adults?: number;
  children?: number;
};

// Airbnb room pages accept these query params and pre-fill the booking panel.
export function airbnbLink({ checkIn, checkOut, adults, children }: BookingQuery = {}) {
  const url = new URL(site.airbnbUrl);
  if (checkIn) url.searchParams.set("check_in", checkIn);
  if (checkOut) url.searchParams.set("check_out", checkOut);
  if (adults) url.searchParams.set("adults", String(adults));
  if (children) url.searchParams.set("children", String(children));
  return url.toString();
}
