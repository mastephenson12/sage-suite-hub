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

Scripted uploads use `sage/arizona` as both the visible Cloudinary asset folder and the delivery public-ID prefix, and add the baseline `sage` and `arizona` tags.

## Keep the searchable catalog current

For each asset in Cloudinary, use descriptive lowercase public IDs and add:

- tags for location, people, activity, season, orientation, and intended use;
- contextual `alt` and `caption` fields;
- contextual `location`, `credit`, `rights`, and comma-separated `usage` fields.

After uploading or editing metadata, regenerate the repository catalog:

```sh
npm run cloudinary:catalog
```

Commit `src/data/cloudinaryImages.json` with the related site change. The catalog contains only public asset information; API credentials are never written to it. It flags missing accessibility, ownership, location, tagging, and usage information.

To bootstrap or audit local fallback files without calling Cloudinary:

```sh
npm run cloudinary:catalog:local
```

## Private phone-photo inbox

Downloaded phone and Google Photos originals belong in the Git-ignored `photo-inbox` directory, not `public/images`.

Organize photos by destination:

```text
photo-inbox/
  sedona/
    _defaults.json
    bell-rock-family-hike.jpg
    bell-rock-family-hike.jpg.json
  payson/
    _defaults.json
    woods-canyon-lake-picnic.heic
```

Each destination `_defaults.json` can supply shared information:

```json
{
  "location": "Sedona, Arizona",
  "credit": "Mark Stephenson",
  "rights": "user-owned",
  "usage": ["hero", "card", "article"],
  "tags": ["sedona", "family", "hiking"]
}
```

Add a sidecar named `<photo filename>.json` when a photo needs its own description:

```json
{
  "alt": "Family walking toward Bell Rock on a clear spring morning",
  "caption": "An easy family outing near Bell Rock in Sedona"
}
```

Preview names and metadata without uploading:

```sh
npm run cloudinary:inbox
```

Upload when the preview looks right:

```sh
npm run cloudinary:inbox -- --confirm
npm run cloudinary:catalog
```

The inbox accepts AVIF, HEIC, HEIF, JPEG, PNG, and WebP, walks nested folders, generates clean public IDs, and flags missing metadata. Originals remain private and untracked by Git.
