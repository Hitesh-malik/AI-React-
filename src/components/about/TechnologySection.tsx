// src/components/about/TechnologySection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface Technology {
  name: string;
  description: string;
  icon: string; // SVG or icon class
}

const TechnologySection: React.FC = () => {
  const { theme } = useTheme();

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        delay: 0.1 * i,
        ease: "easeOut"
      } 
    }),
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Technology stack data
  const technologies: Technology[] = [
    {
      name: "Natural Language Processing",
      description: "Advanced NLP models allow our AI to understand and respond to complex questions in natural language.",
      icon: "🧠"
    },
    {
      name: "Machine Learning",
      description: "Our learning algorithms adapt to each student's performance, identifying patterns and optimizing the learning experience.",
      icon: "📊"
    },
    {
      name: "Knowledge Graphs",
      description: "Structured representation of educational content enables connections between concepts for deeper understanding.",
      icon: "🔗"
    },
    {
      name: "Real-Time Processing",
      description: "Instant response and feedback systems ensure engagement and immediate reinforcement of concepts.",
      icon: "⚡"
    }
  ];

  return (
    <motion.section 
      className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      id="technology"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={itemVariants}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Our Technology
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Telusko Tutor AI is built on cutting-edge artificial intelligence and machine learning technologies that work together to deliver an exceptional educational experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {technologies.map((tech, index) => (
            <motion.div 
              key={tech.name}
              className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6 shadow-lg`}
              custom={index}
              variants={techVariants}
              whileHover="hover"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full text-3xl">
                    {tech.icon}
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {tech.name}
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {tech.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={`mt-16 p-8 rounded-xl ${
            theme === 'dark' 
              ? 'bg-purple-900/20 border border-purple-800' 
              : 'bg-purple-50 border border-purple-100'
          }`}
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-800'}`}>
                Technical Excellence
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                Our technology stack is continuously improved based on the latest research in AI and education. We collaborate with leading experts in machine learning, cognitive science, and pedagogy to ensure our platform delivers the most effective learning experience possible.
              </p>
            </div>
            
            <div className="md:w-1/3 flex justify-center">
              <motion.div 
                className={`w-40 h-40 rounded-full flex items-center justify-center text-6xl ${
                  theme === 'dark' 
                    ? 'bg-purple-800/30 text-purple-300' 
                    : 'bg-purple-100 text-purple-600'
                }`}
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.05, 1, 1.05, 1]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
              >
                🚀
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TechnologySection;