// src/components/pricing/PricingSection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { monthlyPlans, yearlyPlans, PricingPlan } from '../../data/pricingData';
import PricingCard from './PricingCard';

const PricingSection: React.FC = () => {
  const { theme } = useTheme();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
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

  // Get the correct plans based on billing period
  const plans = billingPeriod === 'monthly' ? monthlyPlans : yearlyPlans;

  // Toggle billing period
  const toggleBillingPeriod = () => {
    setBillingPeriod(prev => prev === 'monthly' ? 'yearly' : 'monthly');
  };

  return (
    <section className={`py-20 px-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Choose the perfect plan for your needs. Always know what you'll pay.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`p-1 rounded-full flex items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                billingPeriod === 'monthly'
                  ? theme === 'dark'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-600 text-white'
                  : theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => billingPeriod !== 'monthly' && toggleBillingPeriod()}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                billingPeriod === 'yearly'
                  ? theme === 'dark'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-600 text-white'
                  : theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => billingPeriod !== 'yearly' && toggleBillingPeriod()}
            >
              Yearly
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={billingPeriod}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* FAQs or Additional Info */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            All plans include a 14-day free trial. No credit card required.
          </p>
          <a 
            href="#faq" 
            className={`mt-2 inline-block text-sm font-medium ${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
          >
            Have questions? Check our FAQ
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;