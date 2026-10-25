# The Cliff

Marketing website for **The Cliff**, a luxury clifftop Airbnb on Australia's southern coast. Its job is to showcase the retreat and send guests to the official Airbnb listing to book.

Built with Next.js 16 (App Router), Tailwind CSS v4 and self-hosted fonts (Cormorant Garamond + Inter).

## Run locally

```bash
cd the-cliff
npm install
npm run dev      # http://localhost:3000
```

## Before going live

1. **Airbnb link**: set `NEXT_PUBLIC_AIRBNB_URL` to the listing URL (e.g. `https://www.airbnb.com.au/rooms/12345678`), or edit `airbnbUrl` in `lib/content.ts`.
2. **Listing details**: check every value marked `// UPDATE` in `lib/content.ts` (guests, bedrooms, check-in times, house rules).
3. **Photos**: `public/images/*.svg` are placeholder coastal scenes. Add real photos (e.g. `public/images/living.jpg`) and point the paths in `lib/content.ts` and `app/page.tsx` at them.

## How booking works

The booking form collects dates and guests, then opens the Airbnb listing with
`check_in`, `check_out`, `adults` and `children` pre-filled (`lib/airbnb.ts`).
Pricing, payment and confirmation all happen securely on Airbnb.

## Deploy (Vercel)

Import the repo and set the project's **Root Directory** to `the-cliff`.
