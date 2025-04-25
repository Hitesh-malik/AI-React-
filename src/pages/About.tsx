// src/pages/About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import HeroSection from '../components/about/HeroSection';
import MissionSection from '../components/about/MissionSection';
import FeatureSection from '../components/about/FeatureSection';
import TechnologySection from '../components/about/TechnologySection';

const About: React.FC = () => {
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

  return (
    <motion.div 
      className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Hero Section */}
      <HeroSection />
      
      {/* Mission & Vision Section */}
      <MissionSection />
      
      {/* Key Features Section */}
      <FeatureSection />
      
      {/* Technology Stack */}
      <TechnologySection />
      
 
    </motion.div>
  );
};

export default About;