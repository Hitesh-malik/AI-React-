// src/components/contact/Faq.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface FaqItem {
  question: string;
  answer: string;
}

const Faq: React.FC = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // FAQ data
  const faqItems: FaqItem[] = [
    {
      question: "What is Telusko Tutor AI?",
      answer: "Telusko Tutor AI is an advanced educational platform that uses artificial intelligence to provide personalized learning experiences. Our AI adapts to your learning style, pace, and needs to help you master concepts more effectively than traditional learning methods."
    },
    {
      question: "How does the AI tutoring work?",
      answer: "Our AI analyzes your interactions, responses, and learning patterns to create a customized learning path. It identifies your strengths and areas for improvement, adjusts the difficulty level accordingly, and provides real-time feedback to help you progress efficiently."
    },
    {
      question: "What subjects are available on Telusko Tutor AI?",
      answer: "We currently offer courses in Computer Science, Programming, Data Science, Mathematics, and Physics. Our library is continuously expanding, with new subjects and courses being added regularly based on user demand and educational trends."
    },
    {
      question: "Is Telusko Tutor AI suitable for beginners?",
      answer: "Absolutely! Telusko Tutor AI is designed for learners of all levels, from beginners to advanced. The AI assesses your current knowledge and tailors the content to match your proficiency level, ensuring you receive the appropriate guidance regardless of your starting point."
    },
    {
      question: "How can I access Telusko Tutor AI?",
      answer: "Telusko Tutor AI is available on web browsers, with dedicated mobile apps for iOS and Android devices. Your learning progress synchronizes across all platforms, allowing you to continue your education seamlessly from any device."
    },
    {
      question: "Do you offer any free courses or trial periods?",
      answer: "Yes, we offer a selection of free introductory courses and a 14-day trial period for new users to experience the full capabilities of our platform before committing to a subscription. During the trial, you'll have access to all features and a limited selection of premium courses."
    }
  ];

  // Toggle active FAQ item
  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {faqItems.map((item, index) => (
        <motion.div
          key={index}
          className={`rounded-lg overflow-hidden shadow-sm ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}
          variants={itemVariants}
        >
          <button
            className={`w-full text-left p-6 flex justify-between items-center focus:outline-none ${
              activeIndex === index 
                ? theme === 'dark' 
                  ? 'bg-gray-700' 
                  : 'bg-purple-50' 
                : ''
            }`}
            onClick={() => toggleItem(index)}
          >
            <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {item.question}
            </h3>
            <motion.div
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </button>
          
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`px-6 pb-6 ${theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}
              >
                <div className="pt-4">
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      
      {/* Contact CTA */}
      <motion.div
        className={`mt-8 p-6 rounded-lg ${
          theme === 'dark' 
            ? 'bg-purple-900/20 border border-purple-800' 
            : 'bg-purple-50 border border-purple-100'
        }`}
        variants={itemVariants}
      >
        <div className="text-center">
          <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-800'}`}>
            Still have questions?
          </h3>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            If you couldn't find the answer to your question, feel free to reach out to our support team.
          </p>
          <a
            href="mailto:support@teluskotutor.ai"
            className={`inline-flex items-center px-4 py-2 rounded-md ${
              theme === 'dark'
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-purple-500'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Support
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Faq;