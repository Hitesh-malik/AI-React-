// src/components/auth/FeatureItem.tsx
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FeatureItemProps {
  feature: {
    title: string;
    description: string;
    icon: ReactNode;
  };
}

const FeatureItem: React.FC<FeatureItemProps> = ({ feature }) => {
  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      <motion.div
        variants={floatingIconVariants}
        animate="animate"
        className="mb-4"
      >
        {feature.icon}
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={featureVariants}
        className="text-center"
      >
        <h3 className="text-xl font-bold text-white mb-2">
          {feature.title}
        </h3>
        <p className="text-white text-opacity-80 max-w-xs mx-auto">
          {feature.description}
        </p>
      </motion.div>
    </>
  );
};

export default FeatureItem;