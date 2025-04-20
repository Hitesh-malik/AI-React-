// src/components/auth/FeatureShowcase.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FeatureItem from './FeatureItem';
import TestimonialCard from './TestimonialCard';

const FeatureShowcase: React.FC = () => {
  const [featureIndex, setFeatureIndex] = useState(0);
  
  // Learning path features to showcase
  const features = [
    {
      title: "Personalized Learning Paths",
      description: "Our AI generates custom learning paths based on your goals and existing knowledge.",
      icon: (
        <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Interactive Projects",
      description: "Apply your knowledge with real-world projects at each stage of your learning journey.",
      icon: (
        <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Progress Tracking",
      description: "Visualize your progress and stay motivated with achievement milestones and analytics.",
      icon: (
        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % features.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="h-full flex flex-col">
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
          <span className="text-white text-xl font-bold">TELUSKO</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Join our learning community</h1>
        <p className="text-white text-opacity-80">Create an account to start your personalized learning journey today</p>
      </motion.div>

      {/* Feature showcase */}
      <div className="my-8 relative flex-grow">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-48 h-48 bg-indigo-500 bg-opacity-20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center py-8">
          <FeatureItem feature={features[featureIndex]} key={featureIndex} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 py-4">
          {features.map((_, idx) => (
            <motion.div
              key={idx}
              className={`w-2 h-2 rounded-full ${idx === featureIndex ? 'bg-white' : 'bg-white bg-opacity-30'}`}
              animate={{ scale: idx === featureIndex ? [1, 1.5, 1] : 1 }}
              transition={{ duration: 1, repeat: idx === featureIndex ? Infinity : 0 }}
            />
          ))}
        </div>
      </div>

      {/* Testimonial quote */}
      <TestimonialCard />
    </div>
  );
};

export default FeatureShowcase;