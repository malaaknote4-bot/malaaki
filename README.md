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
| Logo | `components/brand/Logo.tsx`, `app/icon.svg` |

### Adding the official logo
1. Put the file in `public/` (e.g. `public/logo.png`).
2. In `components/brand/Logo.tsx`, replace the placeholder shield + wordmark with `<Image src="/logo.png" alt="Road 8" ... />`.
3. Update the color tokens in `app/globals.css` to the logo's colors; the whole site follows them.

### Using your own food photos
Put photos in `public/menu/` and set `image: "/menu/your-photo.jpg"` on the item in `lib/menu.ts`. Placeholder photos come from Unsplash.

## How ordering works
Customers add items to the cart (saved in their browser), fill in name, phone and delivery/pickup details, and tap **Send order on WhatsApp**. This opens WhatsApp with the full order pre-written to the number in `lib/site.ts`. No backend or payment gateway is needed.
