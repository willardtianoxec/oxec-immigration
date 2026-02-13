import React, { ReactNode } from 'react';
import { Streamdown } from 'streamdown';

interface PostDetailLayoutProps {
  backgroundImage: string;
  title: string;
  author?: string;
  publishDate?: string;
  content: string;
  sidebar: ReactNode;
  type?: 'blog' | 'success-case';
}

export function PostDetailLayout({
  backgroundImage,
  title,
  author,
  publishDate,
  content,
  sidebar,
  type = 'blog',
}: PostDetailLayoutProps) {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Mobile: background-attachment scroll fallback */}
      <style>{`
        @media (max-width: 768px) {
          .post-detail-container {
            background-attachment: scroll !important;
          }
        }
      `}</style>

      <div className="post-detail-container min-h-screen w-full flex items-center py-12 px-4 md:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Main Content and Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area - 2 columns */}
            <div className="lg:col-span-2">
              {/* Frosted Glass Content Container */}
              <div
                className="p-8 md:p-12 shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                {/* Article Header */}
                <div className="mb-8 border-b border-gray-200 pb-8">
                  <h1
                    className="text-4xl md:text-5xl font-black mb-4"
                    style={{
                      fontFamily: '"Alibaba PuHuiTi", sans-serif',
                      fontWeight: 900,
                      color: '#1a1a1a',
                      lineHeight: 1.3,
                    }}
                  >
                    {title}
                  </h1>

                  {/* Article Metadata */}
                  <div className="flex flex-col sm:flex-row gap-4 text-sm" style={{ color: '#666' }}>
                    {author && (
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">作者：</span>
                        <span>{author}</span>
                      </div>
                    )}
                    {publishDate && (
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">发布时间：</span>
                        <span>{publishDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Article Content */}
                <div
                  className="prose prose-lg max-w-none"
                  style={{
                    color: '#333',
                    lineHeight: 1.8,
                  }}
                >
                  <Streamdown>{content}</Streamdown>
                </div>

                {/* Article Footer */}
                <div
                  className="mt-12 pt-8 border-t border-gray-200"
                  style={{ color: '#666', fontSize: '14px' }}
                >
                  <p>
                    本文仅供参考，不构成法律意见。如需专业咨询，请联系我们的移民顾问。
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar - High Contrast */}
            <div className="lg:col-span-1">
              <div
                className="p-6 md:p-8 shadow-lg"
                style={{
                  background: 'rgba(30, 45, 60, 0.9)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#E5E7EB',
                }}
              >
                {sidebar}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Adjustments */}
      <style>{`
        @media (max-width: 1024px) {
          .post-detail-container {
            background-attachment: scroll;
          }
        }

        /* Prose styling for better readability */
        .prose {
          --tw-prose-body: #333;
          --tw-prose-headings: #1a1a1a;
          --tw-prose-links: #335577;
          --tw-prose-bold: #1a1a1a;
          --tw-prose-code: #d63384;
        }

        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          font-family: '"Alibaba PuHuiTi", sans-serif';
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          font-family: '"Alibaba PuHuiTi", sans-serif';
        }

        .prose p {
          margin-bottom: 1rem;
          line-height: 1.8;
        }

        .prose ul,
        .prose ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
        }

        .prose a {
          color: #335577;
          text-decoration: underline;
        }

        .prose a:hover {
          color: #1e3a4c;
        }

        .prose blockquote {
          border-left: 4px solid #335577;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #555;
        }

        .prose code {
          background-color: #f5f5f5;
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.9em;
        }

        .prose pre {
          background-color: #f5f5f5;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .prose pre code {
          background-color: transparent;
          padding: 0;
          border-radius: 0;
        }

        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 1.5rem 0;
        }

        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .prose th,
        .prose td {
          border: 1px solid #ddd;
          padding: 0.75rem;
          text-align: left;
        }

        .prose th {
          background-color: #f5f5f5;
          font-weight: 600;
        }

        .prose hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}
