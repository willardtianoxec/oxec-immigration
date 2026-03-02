import React from 'react';

interface PageH1Props {
  title: string;
  className?: string;
}

/**
 * PageH1 Component
 * 统一管理所有页面的H1标签，确保SEO优化
 * 每个页面应该有且仅有一个H1标签
 */
export const PageH1: React.FC<PageH1Props> = ({ title, className = '' }) => {
  return (
    <h1 className={`text-4xl font-bold mb-4 ${className}`}>
      {title}
    </h1>
  );
};

export default PageH1;
