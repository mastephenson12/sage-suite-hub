const CLOUD_NAME = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim();
const DEFAULT_FOLDER = (import.meta.env.VITE_CLOUDINARY_FOLDER || 'sage/arizona')
  .trim()
  .replace(/^\/+|\/+$/g, '');

export const CLOUDINARY_WIDTHS = [320, 480, 640, 960, 1280, 1600] as const;

function encodePublicId(publicId: string): string {
  return publicId
    .split('/')
    .filter(Boolean)
    .map(encodeURIComponent)
    .join('/');
}

export function localImageToPublicId(src: string): string | null {
  const match = src.match(/^\/images\/(.+?)(?:\.[a-z0-9]+)$/i);
  if (!match) return null;

  const cleanName = match[1].trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  return `${DEFAULT_FOLDER}/${cleanName}`;
}

type CloudinaryUrlOptions = {
  width: number;
  crop?: 'fill' | 'limit';
};

export function getCloudinaryImageUrl(
  src: string,
  { width, crop = 'fill' }: CloudinaryUrlOptions
): string {
  const publicId = localImageToPublicId(src);
  if (!CLOUD_NAME || !publicId) return src;

  const cropTransform = crop === 'fill' ? 'c_fill,g_auto' : 'c_limit';
  const transforms = `f_auto/q_auto,${cropTransform},w_${width}`;
  return `https://res.cloudinary.com/${encodeURIComponent(
    CLOUD_NAME
  )}/image/upload/${transforms}/${encodePublicId(publicId)}`;
}

export function getCloudinarySrcSet(
  src: string,
  crop: 'fill' | 'limit' = 'fill'
): string | undefined {
  if (!CLOUD_NAME || !localImageToPublicId(src)) return undefined;

  return CLOUDINARY_WIDTHS.map(
    (width) => `${getCloudinaryImageUrl(src, { width, crop })} ${width}w`
  ).join(', ');
}

export function isCloudinaryEnabled(): boolean {
  return Boolean(CLOUD_NAME);
}
