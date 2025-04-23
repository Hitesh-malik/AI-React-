// src/components/learning/ContentSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface ContentSectionProps {
  content: string;
  theme: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ content, theme }) => {
  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`prose prose-lg ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default ContentSection;