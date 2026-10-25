# The Cliff

Marketing website for **The Cliff** ("Cliff House with amazing views"), a clifftop Airbnb in Springbrook, Gold Coast Hinterland. Its job is to showcase the retreat and send guests to the official Airbnb listing to book.

Built with Next.js 16 (App Router), Tailwind CSS v4 and self-hosted fonts (Cormorant Garamond + Inter).

## Run locally

```bash
cd the-cliff
npm install
npm run dev      # http://localhost:3000
```

## Before going live

1. **Photos**: the images in `public/images/` were cropped from a screenshot of the Airbnb listing, so they are low resolution. Replace them with the original full-size photos, keeping the same filenames.
2. **Rating**: the rating and review count in `lib/content.ts` are a snapshot. Update them from time to time.
3. **Airbnb link**: already set to the live listing in `lib/content.ts`. You can override it with `NEXT_PUBLIC_AIRBNB_URL`.

## How booking works

The booking form collects dates and guests, then opens the Airbnb listing with
`check_in`, `check_out`, `adults` and `children` pre-filled (`lib/airbnb.ts`).
Pricing, payment and confirmation all happen securely on Airbnb.

## Deploy (Vercel)

Import the repo and set the project's **Root Directory** to `the-cliff`.
