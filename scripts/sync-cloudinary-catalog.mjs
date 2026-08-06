import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const useLocalFiles = process.argv.includes('--local');
const outputPath = path.resolve('src/data/cloudinaryImages.json');
const imageDirectory = path.resolve('public/images');
const prefix = (process.env.CLOUDINARY_FOLDER || 'sage/arizona').replace(/^\/+|\/+$/g, '');

function getCredentials() {
  if (process.env.CLOUDINARY_URL) {
    const url = new URL(process.env.CLOUDINARY_URL);
    return {
      cloudName: url.hostname,
      apiKey: decodeURIComponent(url.username),
      apiSecret: decodeURIComponent(url.password),
    };
  }

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  };
}

function normalizeContext(context) {
  if (!context) return {};
  return context.custom || context;
}

function orientation(width, height) {
  if (!width || !height) return 'unknown';
  if (width === height) return 'square';
  return width > height ? 'landscape' : 'portrait';
}

function validationWarnings(asset) {
  const warnings = [];
  if (!asset.alt) warnings.push('missing-alt');
  if (!asset.location) warnings.push('missing-location');
  if (!asset.credit) warnings.push('missing-credit');
  if (!asset.rights) warnings.push('missing-rights');
  if (!asset.tags.length) warnings.push('missing-tags');
  if (!asset.usage.length) warnings.push('missing-usage');
  if (/\s|_|img-|dsc-|photo-?\d/i.test(asset.publicId)) warnings.push('weak-public-id');
  return warnings;
}

function toCatalogAsset(resource) {
  const context = normalizeContext(resource.context);
  const tags = Array.isArray(resource.tags) ? [...resource.tags].sort() : [];
  const usage = String(context.usage || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .sort();
  const asset = {
    publicId: resource.public_id,
    displayName: resource.display_name || resource.public_id.split('/').at(-1),
    assetFolder: resource.asset_folder || '',
    format: resource.format || '',
    width: resource.width || null,
    height: resource.height || null,
    bytes: resource.bytes || null,
    aspectRatio:
      resource.width && resource.height
        ? Number((resource.width / resource.height).toFixed(3))
        : null,
    orientation: orientation(resource.width, resource.height),
    secureUrl: resource.secure_url || '',
    uploadedAt: resource.created_at || '',
    tags,
    alt: context.alt || '',
    caption: context.caption || '',
    location: context.location || '',
    credit: context.credit || '',
    rights: context.rights || '',
    usage,
  };

  return { ...asset, warnings: validationWarnings(asset) };
}

async function fetchCloudinaryAssets() {
  const { cloudName, apiKey, apiSecret } = getCredentials();
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
    );
  }

  const resources = [];
  let nextCursor = '';

  do {
    const url = new URL(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`
    );
    url.searchParams.set('prefix', prefix);
    url.searchParams.set('max_results', '500');
    url.searchParams.set('tags', 'true');
    url.searchParams.set('context', 'true');
    if (nextCursor) url.searchParams.set('next_cursor', nextCursor);

    const authorization = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const response = await fetch(url, {
      headers: { Authorization: `Basic ${authorization}` },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error?.message || `Cloudinary returned ${response.status}`);
    }

    resources.push(...(result.resources || []));
    nextCursor = result.next_cursor || '';
  } while (nextCursor);

  return resources.map(toCatalogAsset);
}

async function getLocalAssets() {
  const supported = new Set(['.avif', '.jpg', '.jpeg', '.png', '.webp']);
  const filenames = (await readdir(imageDirectory))
    .filter((filename) => supported.has(path.extname(filename).toLowerCase()))
    .sort();
  const byPublicId = new Map();

  for (const filename of filenames) {
    const parsed = path.parse(filename);
    const name = parsed.name.trim().replace(/\s+/g, '-').replace(/-+/g, '-');
    const publicId = `${prefix}/${name}`;
    const current = byPublicId.get(publicId);
    if (current && parsed.ext.toLowerCase() !== '.avif') continue;
    const details = await stat(path.join(imageDirectory, filename));
    byPublicId.set(
      publicId,
      toCatalogAsset({
        public_id: publicId,
        display_name: name,
        format: parsed.ext.slice(1).toLowerCase(),
        bytes: details.size,
        tags: [],
        context: {},
      })
    );
  }

  return [...byPublicId.values()];
}

const assets = (useLocalFiles ? await getLocalAssets() : await fetchCloudinaryAssets()).sort(
  (left, right) => left.publicId.localeCompare(right.publicId)
);
const warningCounts = assets.reduce((counts, asset) => {
  for (const warning of asset.warnings) counts[warning] = (counts[warning] || 0) + 1;
  return counts;
}, {});
const catalog = {
  schemaVersion: 1,
  cloudinaryPrefix: prefix,
  assetCount: assets.length,
  warningCounts,
  assets,
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');

console.log(`Wrote ${assets.length} assets to ${path.relative(process.cwd(), outputPath)}.`);
if (Object.keys(warningCounts).length) console.log('Catalog warnings:', warningCounts);
