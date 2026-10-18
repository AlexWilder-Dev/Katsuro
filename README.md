# Katsuro

A demo website for Katsuro, the katsu restaurant at 189 St John’s Hill, Clapham Junction, London SW11 1TH, made to show the owner.

It's a front-end demo on static data: no CMS, bookings backend, payments or real form sending. Booking goes to their existing Dojo page, delivery to Deliveroo and Uber Eats, and collection is by phone.

## What's in it

- **First screen**: their own kitchen footage plays inside the six slices of the logo's cutlet. Below it: what they do, whether they're open right now (London time), and Book / Order / Call.
- **Lunch/dinner shift**: Mon–Fri 12–3 the site leads with the lunch menu (sandos and dons) in the daytime palette. From 5.30pm it leads with the signature sets in the shopfront-at-night palette. Visitors can switch by hand.
- **The set, laid out**: pick any of the ten katsu sets and it lands on a tray drawn from a real Katsuro tray, with the seven things every set comes with. Add-ons from the printed menu join it, with a running total.
- Both menus as readable text, transcribed from katsurolondon.com and the printed menus. The Vegetarian and Gluten-free marks are theirs.
- Story and team in their own words, real credited Google review lines, their latest Instagram posts, hours, the walk from Clapham Junction (TfL route), and a large-group enquiry form that only shows a confirmation.

All menus, hours, contact details, links, review lines and Instagram posts live in `src/data/katsuro.ts`.

Research, sources and the reasoning behind the design are in `research/notes.md`.

## Run it

```sh
npm install
npm run dev       # local dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the build
```

The site uses `HashRouter` and is built for GitHub Pages at `/katsuro/`. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`. In the repository settings, Pages needs **Source: GitHub Actions**.

## Assets

The photos and video are Katsuro's own, taken from their website and Instagram. The originals are in `research/`, and these one-off scripts regenerate everything in `public/`:

```sh
node scripts/trace-logo.mjs && node scripts/emit-logo-module.mjs   # logo PNG → SVG paths
node scripts/build-assets.mjs                                       # responsive photos
sh scripts/build-video.sh                                           # hero clip (needs ffmpeg)
node scripts/make-og.mjs                                            # og.jpg + favicons
```

The link preview tags are written directly into `index.html` with absolute URLs.

---

Site by AlexWilder-Dev
