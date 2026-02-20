import React, { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  webpSupport?: boolean;
}

/**
 * OptimizedImage component that automatically serves WebP format with fallback to original format
 * 
 * Usage:
 * <OptimizedImage src="/images/img-1-opt.jpg" alt="Description" className="w-full" />
 * 
 * This component will:
 * 1. Try to load WebP version first (img-1-opt.webp)
 * 2. Fall back to original format if WebP is not supported
 * 3. Handle errors gracefully
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  webpSupport = true,
  onError,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [supportsWebP, setSupportsWebP] = React.useState(true);

  // Detect WebP support
  React.useEffect(() => {
    if (!webpSupport) {
      setSupportsWebP(false);
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, 1, 1);
      setSupportsWebP(canvas.toDataURL('image/webp').includes('image/webp'));
    }
  }, [webpSupport]);

  // Convert image path to WebP if supported
  const getImageSource = (): string => {
    if (!supportsWebP || imageError) {
      return src;
    }

    // If src already ends with .webp, return as is
    if (src.endsWith('.webp')) {
      return src;
    }

    // Replace file extension with .webp
    const lastDotIndex = src.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return src; // No extension found
    }

    return src.substring(0, lastDotIndex) + '.webp';
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If WebP failed and we haven't already tried the original, try the original
    if (supportsWebP && !imageError) {
      setImageError(true);
    }
    onError?.(e);
  };

  return (
    <picture>
      {supportsWebP && !imageError && (
        <source srcSet={getImageSource()} type="image/webp" />
      )}
      <img
        src={imageError ? src : getImageSource()}
        alt={alt}
        onError={handleError}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
