// src/components/learning/ContentSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface ContentSectionProps {
  content: string;
  theme: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ content, theme }) => {
  // Define custom renderers for markdown elements
  const components = {
    h1: ({ node, ...props }: any) => (
      <h1 
        className={`text-3xl font-bold my-6 pb-2 border-b ${theme === 'dark' ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`} 
        {...props} 
      />
    ),
    h2: ({ node, ...props }: any) => (
      <h2 
        className={`text-2xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`} 
        {...props} 
      />
    ),
    h3: ({ node, ...props }: any) => (
      <h3 
        className={`text-xl font-semibold mt-5 mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} 
        {...props} 
      />
    ),
    p: ({ node, ...props }: any) => (
      <p 
        className={`my-4 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} 
        {...props} 
      />
    ),
    ul: ({ node, ...props }: any) => (
      <ul 
        className="list-disc pl-6 my-4 space-y-2" 
        {...props} 
      />
    ),
    ol: ({ node, ...props }: any) => (
      <ol 
        className="list-decimal pl-6 my-4 space-y-2" 
        {...props} 
      />
    ),
    li: ({ node, ...props }: any) => (
      <li 
        className={`mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} 
        {...props} 
      />
    ),
    a: ({ node, ...props }: any) => (
      <a 
        className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} underline`} 
        {...props} 
      />
    ),
    blockquote: ({ node, ...props }: any) => (
      <blockquote 
        className={`border-l-4 pl-4 py-1 my-4 ${theme === 'dark' ? 'border-gray-600 text-gray-400 bg-gray-800/30' : 'border-gray-300 text-gray-600 bg-gray-50'} rounded-r`} 
        {...props} 
      />
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      return inline ? (
        <code
          className={`px-1.5 py-0.5 mx-0.5 rounded font-mono text-sm ${theme === 'dark' ? 'bg-gray-800 text-pink-300' : 'bg-gray-100 text-pink-600'}`}
          {...props}
        >
          {children}
        </code>
      ) : (
        <pre
          className={`my-4 p-4 rounded-lg overflow-auto ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'}`}
        >
          <code className="font-mono text-sm" {...props}>
            {children}
          </code>
        </pre>
      );
    },
    strong: ({ node, ...props }: any) => (
      <strong 
        className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} 
        {...props} 
      />
    ),
    em: ({ node, ...props }: any) => (
      <em 
        className="italic" 
        {...props} 
      />
    ),
    table: ({ node, ...props }: any) => (
      <div className="overflow-x-auto my-6">
        <table 
          className={`min-w-full border-collapse ${theme === 'dark' ? 'border border-gray-700' : 'border border-gray-200'}`} 
          {...props} 
        />
      </div>
    ),
    thead: ({ node, ...props }: any) => (
      <thead 
        className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`} 
        {...props} 
      />
    ),
    tbody: ({ node, ...props }: any) => (
      <tbody 
        className={`${theme === 'dark' ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}`} 
        {...props} 
      />
    ),
    tr: ({ node, ...props }: any) => (
      <tr 
        className={`${theme === 'dark' ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`} 
        {...props} 
      />
    ),
    th: ({ node, ...props }: any) => (
      <th 
        className={`px-4 py-3 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} 
        {...props} 
      />
    ),
    td: ({ node, ...props }: any) => (
      <td 
        className={`px-4 py-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`} 
        {...props} 
      />
    ),
    hr: ({ node, ...props }: any) => (
      <hr 
        className={`my-6 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} 
        {...props} 
      />
    ),
  };

  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="md-content">
        <ReactMarkdown components={components}>
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default ContentSection;