/**
 * 性能优化工具函数
 * 用于配置缓存策略、性能监测和优化
 */

/**
 * 配置浏览器缓存头
 * 这些配置应该在服务器端实现，此处提供参考
 */
export const cacheHeaders = {
  // 静态资源（永久缓存）
  staticAssets: {
    'Cache-Control': 'public, max-age=31536000, immutable'
  },
  // 动态内容（短期缓存）
  dynamicContent: {
    'Cache-Control': 'public, max-age=3600, must-revalidate'
  },
  // API响应（不缓存）
  api: {
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  },
  // HTML页面（验证缓存）
  html: {
    'Cache-Control': 'public, max-age=0, must-revalidate'
  }
};

/**
 * 性能指标类型
 */
export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  cls?: number; // Cumulative Layout Shift
  fid?: number; // First Input Delay
  ttfb?: number; // Time to First Byte
}

/**
 * 测量Web Vitals指标
 */
export function measureWebVitals(callback: (metrics: PerformanceMetrics) => void): void {
  if (typeof window === 'undefined') return;

  const metrics: PerformanceMetrics = {};

  // 测量FCP（First Contentful Paint）
  if ('PerformanceObserver' in window) {
    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            metrics.fcp = entry.startTime;
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.error('Failed to observe paint entries:', e);
    }

    // 测量LCP（Largest Contentful Paint）
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.error('Failed to observe LCP:', e);
    }

    // 测量CLS（Cumulative Layout Shift）
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            metrics.cls = (metrics.cls || 0) + (entry as any).value;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.error('Failed to observe layout shifts:', e);
    }
  }

  // 测量TTFB（Time to First Byte）
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      metrics.ttfb = navigation.responseStart - navigation.fetchStart;
    }
  }

  // 延迟调用回调，确保所有指标都已收集
  setTimeout(() => {
    callback(metrics);
  }, 3000);
}

/**
 * 报告性能指标到分析服务
 */
export function reportMetrics(metrics: PerformanceMetrics): void {
  // 这里可以集成Google Analytics或其他分析服务
  console.log('Performance Metrics:', metrics);

  // 检查是否满足Core Web Vitals标准
  const cwvStatus = {
    fcp: metrics.fcp ? (metrics.fcp < 1800 ? 'good' : 'poor') : 'unknown',
    lcp: metrics.lcp ? (metrics.lcp < 2500 ? 'good' : 'poor') : 'unknown',
    cls: metrics.cls ? (metrics.cls < 0.1 ? 'good' : 'poor') : 'unknown'
  };

  console.log('Core Web Vitals Status:', cwvStatus);
}

/**
 * 延迟加载非关键JavaScript
 */
export function deferNonCriticalScripts(): void {
  if (typeof document === 'undefined') return;

  // 将所有非关键脚本标记为defer
  const scripts = document.querySelectorAll('script[data-defer="true"]');
  scripts.forEach(script => {
    script.setAttribute('defer', '');
  });
}

/**
 * 预加载关键资源
 */
export function preloadCriticalResources(resources: string[]): void {
  if (typeof document === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (resource.endsWith('.js')) {
      link.as = 'script';
    } else if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.endsWith('.woff') || resource.endsWith('.woff2')) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    } else {
      link.as = 'image';
    }

    link.href = resource;
    document.head.appendChild(link);
  });
}

/**
 * 实现资源提示（Resource Hints）
 */
export function implementResourceHints(): void {
  if (typeof document === 'undefined') return;

  // 预连接到重要的第三方域名
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  });

  // DNS预解析
  const dnsPrefetchDomains = [
    'google-analytics.com',
    'googletagmanager.com'
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
}

/**
 * 检测网络连接状态
 */
export function getNetworkStatus(): {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
} {
  if (typeof navigator === 'undefined') {
    return {
      effectiveType: '4g',
      downlink: 10,
      rtt: 50,
      saveData: false
    };
  }

  const connection = (navigator as any).connection || (navigator as any).mozConnection;
  
  if (!connection) {
    return {
      effectiveType: '4g',
      downlink: 10,
      rtt: 50,
      saveData: false
    };
  }

  return {
    effectiveType: connection.effectiveType || '4g',
    downlink: connection.downlink || 10,
    rtt: connection.rtt || 50,
    saveData: connection.saveData || false
  };
}

/**
 * 根据网络状况加载不同质量的资源
 */
export function getResourceQuality(): 'high' | 'medium' | 'low' {
  const network = getNetworkStatus();

  if (network.saveData) {
    return 'low';
  }

  switch (network.effectiveType) {
    case 'slow-2g':
    case '2g':
      return 'low';
    case '3g':
      return 'medium';
    case '4g':
    default:
      return 'high';
  }
}
