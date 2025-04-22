// src/pages/Pricing.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import PricingSection from '../components/pricing/PricingSection';

const Pricing: React.FC = () => {
  const { theme } = useTheme();
  const [showFaq, setShowFaq] = useState(false);
  
  // FAQ data
  const faqs = [
    {
      question: "What are the differences between plans?",
      answer: "Our plans differ primarily in the number of users, storage limits, and advanced features. The Free plan is great for individuals, the Pro plan works well for small teams, and the Business plan is designed for larger organizations with more complex needs."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference immediately. If you downgrade, you'll be credited on your next billing cycle."
    },
    {
      question: "How does the 14-day free trial work?",
      answer: "You can try any paid plan for 14 days without being charged. No credit card is required to start the trial. At the end of the trial period, you can choose to subscribe or your account will automatically switch to the Free plan."
    },
    {
      question: "Do you offer discounts for nonprofits or educational institutions?",
      answer: "Yes, we offer special pricing for qualified nonprofits, educational institutions, and open-source projects. Please contact our sales team for more information."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. For Business plans, we also support invoicing and wire transfers."
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees for any of our plans. You only pay the advertised price."
    },
    {
      question: "Can I cancel at any time?",
      answer: "Yes, you can cancel your subscription at any time. When you cancel, you'll retain access to your paid plan until the end of your current billing period."
    }
  ];

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Show FAQ section after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFaq(true);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Hero Section */}
      <div className={`pt-20 pb-12 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Choose the Perfect Plan for Your Needs
          </motion.h1>
          <motion.p 
            className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            variants={itemVariants}
          >
            We offer flexible pricing options to match your specific requirements.
            All plans include access to our core features and customer support.
          </motion.p>

          {/* Stats or Trust Icons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-12"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <svg className={`w-10 h-10 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <p className="text-2xl font-bold">10,000+</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Happy Customers</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <svg className={`w-10 h-10 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <div className="ml-3">
                <p className="text-2xl font-bold">99.9%</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Uptime</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <svg className={`w-10 h-10 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <p className="text-2xl font-bold">24/7</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Customer Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Pricing Section (Using our PricingSection component) */}
      <PricingSection />
      
      {/* FAQ Section */}
      {showFaq && (
        <motion.div
          id="faq"
          className={`py-16 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* CTA Banner */}
      <motion.div 
        className={`py-16 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className={`mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of satisfied customers who are already using our platform.
            Start your free trial today with no commitment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              className="px-8 py-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
            <motion.button
              className={`px-8 py-3 rounded-md font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Sales
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Pricing;