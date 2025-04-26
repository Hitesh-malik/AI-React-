// src/pages/Contact.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import Faq from '../components/contact/Faq';

const Contact: React.FC = () => {
  const { theme } = useTheme();

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2 
      }
    },
    exit: { opacity: 0 }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  return (
    <motion.div 
      className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Hero Section */}
      <motion.div 
        className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Get in Touch
            </h1>
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Have questions about Telusko Tutor AI? We're here to help. Fill out the form below and our team will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div 
        className="py-16"
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <ContactForm />
            </div>
            
            {/* Contact Information */}
            <div className="lg:w-1/3">
              <ContactInfo />
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Frequently Asked Questions
            </h2>
            <Faq />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;