# Sage Cloudinary image system

Sage keeps `public/images` as a safe fallback while Cloudinary becomes the primary delivery layer.

## Public IDs

Local files map deterministically to Cloudinary:

- `/images/sedona-family.avif` → `sage/arizona/sedona-family`
- `/images/payson-rim-overlook.avif` → `sage/arizona/payson-rim-overlook`

Keep descriptive filenames. Re-uploading the same filename overwrites the asset at its stable public ID.

## Configure Vercel

Add these public environment variables to Preview and Production:

- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_FOLDER` (normally `sage/arizona`)

Do not expose `CLOUDINARY_API_SECRET` with a `VITE_` prefix.

## Upload the current library

Set `CLOUDINARY_URL`, or the three server-only credentials shown in `.env.example`, in your local shell. Preview the mapping first:

```sh
npm run cloudinary:upload
```

Then explicitly upload:

```sh
npm run cloudinary:upload -- --confirm
```

The browser receives responsive Cloudinary URLs with automatic format and quality. If Cloudinary is not configured or an asset is missing, `CloudinaryImage` falls back to the matching file in `public/images`.
