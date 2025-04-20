// src/components/auth/TestimonialsShowcase.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TestimonialSlide from './TestimonialSlide';
import UserAvatars from './UserAvatars';
import AIWritingAnimation from './AIWritingAnimation';

const TestimonialsShowcase: React.FC = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      quote: "This platform transformed my learning journey. The structured learning paths helped me master web development in just 6 months.",
      author: "Alex Johnson",
      title: "Frontend Developer at Spotify"
    },
    {
      quote: "The personalized roadmaps are incredible. I went from knowing nothing about data science to landing my dream job with the guided learning path.",
      author: "Sarah Chen",
      title: "Data Scientist at Tableau"
    },
    {
      quote: "I love how the platform breaks down complex topics into manageable modules with clear time estimates. Perfect for busy professionals!",
      author: "Michael Rodriguez",
      title: "UX Designer at Adobe"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Testimonial section */}
      <div className="mb-auto">
        <motion.h2
          className="text-3xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          What Our<br />
          Learners Say.
        </motion.h2>

        <TestimonialSlide 
          testimonial={testimonials[testimonialIndex]} 
          key={testimonialIndex}
        />

        <div className="mt-8 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevTestimonial}
            className="p-3 bg-pink-200 bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextTestimonial}
            className="p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Bottom info card */}
      <motion.div
        className="mt-12 p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-white mb-2">
          Master new skills at your own pace
        </h3>
        <p className="text-white text-opacity-80 mb-4">
          Join over 10,000 learners who have accelerated their careers with our personalized learning paths.
        </p>
        <UserAvatars />
      </motion.div>

      {/* AI Writing Animation - replacing the decorative star */}
      <AIWritingAnimation />
    </div>
  );
};

export default TestimonialsShowcase;