# Road 8 — Burger Restaurant Website

Next.js site for Road 8 (Syria): showcases the burgers and meals, and lets customers build a cart and send the order to the restaurant on WhatsApp. Arabic (RTL, default at `/ar`) and English (`/en`).

```bash
npm install
npm run dev     # http://localhost:3000 → redirects to /ar
npm run build
```

## Where to edit things

| What | File |
| --- | --- |
| WhatsApp number, phone, address, hours, social links, map, currency, delivery fee | `lib/site.ts` |
| Menu items, prices, categories, photos | `lib/menu.ts` |
| All site text (Arabic + English) | `lib/i18n.ts` |
| Brand colors | `app/globals.css` (`:root` tokens) |
| Logo | `public/logo.png` (also `app/icon.png`, `app/apple-icon.png` for the browser tab) |

### Brand
Colors come from the logo: signal red, asphalt black and white lane markings (tokens in `app/globals.css`). Dark sections use an asphalt texture and the logo's curving red road (`components/brand/RoadCurves.tsx`). For a sharper logo, replace `public/logo.png` with the original high-resolution file (square, ideally 800px+).

### Using your own food photos
Put photos in `public/menu/` and set `image: "/menu/your-photo.jpg"` on the item in `lib/menu.ts`. Placeholder photos come from Unsplash.

## How ordering works
Customers add items to the cart (saved in their browser), fill in name, phone and delivery/pickup details, and tap **Send order on WhatsApp**. This opens WhatsApp with the full order pre-written to the number in `lib/site.ts`. No backend or payment gateway is needed.

## Toolhop (AI agent tool marketplace concept)
A separate home page at `/toolhop` (`app/toolhop/`, its own layout and styles in `app/toolhop/toolhop.css`; components in `components/toolhop/`). It does not affect the Road 8 site. The name and the waitlist form's endpoint are set in `lib/toolhop.ts`: until `waitlistEndpoint` points to a form service (e.g. Formspree or Tally), the form says the waitlist isn't connected yet.
