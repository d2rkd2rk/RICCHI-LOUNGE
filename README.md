# RICCHI LOUNGE — WhatsApp Ordering Website

A polished static website for RICCHI LOUNGE, Damanhour.

## What it includes
- Responsive premium lounge-style design.
- Menu search and category filters.
- Cart with quantity controls.
- Customer name + optional notes.
- WhatsApp ordering to **01019926199**.
- WhatsApp message contains every item, quantity, unit price, line total, item count and grand total.
- Venue hero photo supplied in `assets/ricchi-front.png`.
- Official logo image supplied in `assets/ricchi-logo.jpg`.
- No delivery option is advertised or collected by the site.

## Important image note
The public menu source exposes the dish names/prices but not the individual dish image files in a reusable way. The site therefore uses real food photography by food family as a polished initial presentation. These are **illustrative stock photos, not claimed to be RICCHI's own dish photography**. For a production launch, replace each item's `img` in `menu.json` with the restaurant's own dish photo URL/file.

## Menu source
The initial menu/prices were transcribed from the public RICCHI LOUNGE Talabat menu and should be rechecked by the restaurant before launch because prices/menu availability can change.

## Deploy to GitHub Pages
1. Create a GitHub repository.
2. Upload all files/folders from this directory.
3. Settings → Pages → Deploy from branch → `main` / root.
4. The site will be static; no backend is required for WhatsApp ordering.

## Change WhatsApp number
Edit `WA` in `app.js`.

## Change menu
Edit `menu.json`. Each object has:
`category`, `name`, `desc`, `price`, `img`.

## Local preview
Because the browser blocks `fetch("menu.json")` when opening `index.html` directly, run a tiny local server:
`python -m http.server 8000`
then open `http://localhost:8000`.
