import { useEffect } from 'react';

interface SchemaScriptProps {
  schema: Record<string, any>;
}

/**
 * SchemaScript组件
 * 在页面head中注入JSON-LD格式的结构化数据
 * 用于改进SEO和搜索结果展示
 */
export function SchemaScript({ schema }: SchemaScriptProps) {
  useEffect(() => {
    // 创建script标签
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    
    // 添加到head
    document.head.appendChild(script);

    // 清理函数：组件卸载时移除script
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [schema]);

  // 此组件不渲染任何可见内容
  return null;
}

export default SchemaScript;
