import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const shouldUpload = process.argv.includes('--confirm');
const imageDirectory = path.resolve('public/images');
const folder = (process.env.CLOUDINARY_FOLDER || 'sage/arizona').replace(/^\/+|\/+$/g, '');

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

function publicIdFor(filename) {
  const baseName = path.parse(filename).name.trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  return `${folder}/${baseName}`;
}

function sign(params, secret) {
  const value = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, item]) => `${key}=${item}`)
    .join('&');
  return createHash('sha1').update(`${value}${secret}`).digest('hex');
}

const supportedExtensions = new Set(['.avif', '.jpg', '.jpeg', '.png', '.webp']);
const candidateFiles = (await readdir(imageDirectory))
  .filter((filename) => supportedExtensions.has(path.extname(filename).toLowerCase()))
  .sort();
const filesByPublicId = new Map();

for (const filename of candidateFiles) {
  const publicId = publicIdFor(filename);
  const current = filesByPublicId.get(publicId);
  if (!current || path.extname(filename).toLowerCase() === '.avif') {
    filesByPublicId.set(publicId, filename);
  }
}

const files = [...filesByPublicId.values()].sort();

if (!shouldUpload) {
  console.log(`Dry run: ${files.length} images are ready for Cloudinary folder "${folder}".`);
  for (const filename of files) console.log(`${filename} -> ${publicIdFor(filename)}`);
  console.log('Run npm run cloudinary:upload -- --confirm after setting Cloudinary credentials.');
  process.exit(0);
}

const { cloudName, apiKey, apiSecret } = getCredentials();
if (!cloudName || !apiKey || !apiSecret) {
  throw new Error('Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.');
}

for (const filename of files) {
  const timestamp = Math.floor(Date.now() / 1000);
  const publicId = publicIdFor(filename);
  const signedParams = {
    asset_folder: folder,
    overwrite: 'true',
    public_id: publicId,
    tags: 'arizona,sage',
    timestamp: String(timestamp),
  };
  const signature = sign(signedParams, apiSecret);
  const bytes = await readFile(path.join(imageDirectory, filename));
  const form = new FormData();
  form.set('file', new Blob([bytes]), filename);
  form.set('api_key', apiKey);
  form.set('timestamp', String(timestamp));
  form.set('public_id', publicId);
  form.set('asset_folder', folder);
  form.set('overwrite', 'true');
  form.set('tags', 'arizona,sage');
  form.set('signature', signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`${filename}: ${result?.error?.message || response.statusText}`);
  console.log(`Uploaded ${filename} -> ${result.public_id}`);
}

console.log(`Uploaded ${files.length} images to Cloudinary.`);
