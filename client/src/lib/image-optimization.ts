/**
 * 图片优化工具函数
 * 用于实现图片懒加载、响应式图片和WebP格式支持
 */

/**
 * 图片优化配置
 */
export interface ImageOptimizationConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean; // 是否优先加载（用于首屏图片）
  className?: string;
}

/**
 * 生成响应式图片srcset
 * 用于不同设备分辨率加载不同大小的图片
 */
export function generateSrcSet(imagePath: string, sizes: number[] = [320, 640, 960, 1280]): string {
  return sizes
    .map(size => {
      // 如果是URL，直接返回
      if (imagePath.startsWith('http')) {
        return `${imagePath}?w=${size} ${size}w`;
      }
      // 如果是本地路径，添加参数
      return `${imagePath}?w=${size} ${size}w`;
    })
    .join(', ');
}

/**
 * 检测浏览器是否支持WebP格式
 */
export function supportsWebP(): boolean {
  if (typeof document === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  try {
    return canvas.toDataURL('image/webp').indexOf('webp') === 5;
  } catch {
    return false;
  }
}

/**
 * 将图片路径转换为WebP格式（如果支持）
 */
export function getOptimizedImageUrl(imagePath: string): string {
  // 如果是外部URL，直接返回
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // 如果浏览器支持WebP，转换为WebP格式
  if (supportsWebP()) {
    const pathWithoutExt = imagePath.replace(/\.(jpg|jpeg|png)$/i, '');
    return `${pathWithoutExt}.webp`;
  }

  return imagePath;
}

/**
 * 生成图片的srcset和sizes属性
 */
export function generateResponsiveImageProps(
  imagePath: string,
  options: {
    sizes?: string; // CSS media query sizes
    widths?: number[]; // 响应式宽度数组
  } = {}
) {
  const { sizes = '100vw', widths = [320, 640, 960, 1280, 1920] } = options;

  const srcSet = widths
    .map(width => {
      const url = getOptimizedImageUrl(imagePath);
      return `${url}?w=${width} ${width}w`;
    })
    .join(', ');

  return {
    srcSet,
    sizes,
    src: getOptimizedImageUrl(imagePath)
  };
}

/**
 * 预加载图片
 * 用于优化首屏加载性能
 */
export function preloadImage(imagePath: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = getOptimizedImageUrl(imagePath);
  
  // 如果支持WebP，添加imagesrcset
  if (supportsWebP()) {
    const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    link.setAttribute('imagesrcset', webpPath);
  }

  document.head.appendChild(link);
}

/**
 * 预连接到CDN
 * 用于加快CDN资源加载
 */
export function preconnectToCDN(cdnUrl: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = cdnUrl;
  document.head.appendChild(link);
}

/**
 * 配置DNS预解析
 * 用于加快DNS查询速度
 */
export function dnsPrefetch(domain: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = `//${domain}`;
  document.head.appendChild(link);
}

/**
 * 计算图片的宽高比
 */
export function getImageAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor} / ${height / divisor}`;
}

/**
 * 生成图片占位符样式
 * 用于防止CLS（累积布局偏移）
 */
export function getImagePlaceholderStyle(width: number, height: number) {
  const aspectRatio = getImageAspectRatio(width, height);
  return {
    aspectRatio,
    backgroundColor: '#f0f0f0'
  };
}
