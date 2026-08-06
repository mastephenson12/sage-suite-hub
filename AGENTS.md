# Codex Working Guide for Sage

This repo powers `sage.healthandtravels.com`, the Sage family travel planning site.

## What to edit for common changes

- Archive articles: `src/data/articles.ts`
- Arizona destination guides: `src/data/arizonaDestinations.ts`
- Trail guides: `src/data/trails.ts`
- Main routes and footer: `src/App.tsx`
- Top navigation: `src/components/Navbar.tsx`
- Static SEO prerendering: `scripts/prerender.mjs`
- Sitemap generation: `scripts/generate-sitemap.mjs`
- Image originals and local fallbacks: `public/images`
- Cloudinary delivery: `src/components/CloudinaryImage.tsx` and `src/utils/cloudinary.ts`
- Cloudinary upload workflow: `docs/CLOUDINARY.md`
- Searchable Cloudinary photo catalog: `src/data/cloudinaryImages.json`

## Build behavior

`npm run build` now runs:

1. `node scripts/generate-sitemap.mjs`
2. `tsc`
3. `vite build`
4. `node scripts/prerender.mjs`

That means new archive articles, destination guide slugs, and trail ids are automatically added to `public/sitemap.xml` during builds.

## Content rules

- Prefer real user-owned images when available.
- Use AVIF for site images.
- Keep hero/card images below roughly 300 KB when possible.
- Use descriptive filenames such as `payson-rim-overlook.avif`.
- Add images to `public/images` and reference them as `/images/file-name.avif`.
- Keep those local paths in content; `CloudinaryImage` maps them to stable Cloudinary public IDs when the Vercel environment is configured.
- Search `src/data/cloudinaryImages.json` before choosing or requesting a photo. Prefer assets with complete alt, location, credit, rights, and usage metadata.
- When adding an article, include internal links to related Sage pages and at least one useful Health and Travels companion article when relevant.

## SEO workflow

When adding a new important page:

1. Add the route or data entry.
2. Add it to `/explore` if it is not automatically pulled from existing data.
3. Add or update prerender metadata in `scripts/prerender.mjs` for major static pages.
4. Run the build or verify Vercel is green.
5. Ask the user to resubmit `https://sage.healthandtravels.com/sitemap.xml` in Google Search Console when the page is strategic.

## Current reach strategy

Use `healthandtravels.com` articles as authority links into Sage pages. The best companion targets right now are:

- `https://healthandtravels.com/p/flagstaff`
- `https://healthandtravels.com/p/sedona-in-april`
- `https://healthandtravels.com/p/phoenix-arizona-adventure`

Sage should focus on high-value Arizona family pages first: Phoenix heat, Sedona, Flagstaff, Grand Canyon, Payson, Papago Park, and kid-friendly hikes.
