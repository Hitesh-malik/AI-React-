// src/components/pricing/PricingCard.tsx
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { PricingPlan } from '../../data/pricingData';

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const { theme } = useTheme();
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    },
    hover: {
      y: -10,
      boxShadow: theme === 'dark' 
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.9)' 
        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    }
  };

  // Format price display
  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `$${price}`;
  };

  // Get card styles based on highlighted status
  const getCardClasses = () => {
    let baseClasses = `rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col`;
    
    if (plan.highlighted) {
      return `${baseClasses} ${
        theme === 'dark'
          ? 'bg-gray-800 border-2 border-purple-500'
          : 'bg-white border-2 border-purple-500 shadow-xl'
      }`;
    }
    
    return `${baseClasses} ${
      theme === 'dark'
        ? 'bg-gray-800'
        : 'bg-white shadow-lg'
    }`;
  };

  return (
    <motion.div
      className={getCardClasses()}
      variants={cardVariants}
      whileHover="hover"
      layout
    >
      {/* Badge (if applicable) */}
      {plan.badge && (
        <div className="absolute top-0 right-0">
          <div className="bg-purple-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-bl-lg">
            {plan.badge}
          </div>
        </div>
      )}

      {/* Card Header */}
      <div className={`p-6 ${plan.highlighted ? 'bg-purple-600 text-white' : ''}`}>
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className={`mt-1 text-sm ${
          plan.highlighted 
            ? 'text-purple-100' 
            : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="p-6 border-b border-t border-opacity-10 border-gray-500">
        <div className="flex items-end">
          <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
          {plan.price > 0 && (
            <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              /{plan.billingPeriod}
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="p-6 flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <motion.li 
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {feature.included ? (
                <svg 
                  className="h-5 w-5 text-green-500 mt-0.5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              ) : (
                <svg 
                  className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} mt-0.5 mr-2`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              )}
              <span className={feature.included 
                ? '' 
                : theme === 'dark' ? 'text-gray-500 line-through' : 'text-gray-400 line-through'
              }>
                {feature.title}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="p-6 pt-0 mt-auto">
        <motion.button
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            plan.highlighted
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {plan.ctaText}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PricingCard;