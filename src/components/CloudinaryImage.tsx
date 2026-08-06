import React, { useEffect, useState } from 'react';
import {
  getCloudinaryImageUrl,
  getCloudinarySrcSet,
  localImageToPublicId,
} from '../utils/cloudinary';

type CloudinaryImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet'
> & {
  src: string;
  widthHint?: number;
  crop?: 'fill' | 'limit';
};

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  src,
  widthHint = 1280,
  crop = 'fill',
  sizes = '100vw',
  loading = 'lazy',
  decoding = 'async',
  onError,
  ...props
}) => {
  const [useLocalFallback, setUseLocalFallback] = useState(false);

  useEffect(() => {
    setUseLocalFallback(false);
  }, [src]);

  const cloudinaryEligible = Boolean(localImageToPublicId(src));
  const deliveredSrc = useLocalFallback
    ? src
    : getCloudinaryImageUrl(src, { width: widthHint, crop });
  const srcSet = useLocalFallback ? undefined : getCloudinarySrcSet(src, crop);

  return (
    <img
      {...props}
      src={deliveredSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      loading={loading}
      decoding={decoding}
      onError={(event) => {
        if (cloudinaryEligible && deliveredSrc !== src && !useLocalFallback) {
          setUseLocalFallback(true);
          return;
        }
        onError?.(event);
      }}
    />
  );
};

export default CloudinaryImage;
