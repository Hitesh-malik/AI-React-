// src/components/about/HeroSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const HeroSection: React.FC = () => {
  const { theme } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.3 }
    }
  };

  // Animation for floating elements
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Pulse animation for connection nodes
  const pulseAnimation = {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Animation for the connection lines
  const lineAnimation = {
    opacity: [0.3, 0.6, 0.3],
    pathLength: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Chat bubble animation
  const chatBubbleAnimation = {
    scale: [1, 1.05, 1],
    x: [0, 3, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  };

  return (
    <motion.section 
      className={`relative overflow-hidden py-16 md:py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-purple-50 to-violet-50'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Larger particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`large-particle-${i}`}
            className={`absolute rounded-full ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/5'}`}
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Small glowing dots */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className={`absolute rounded-full ${theme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)'} 1px, transparent 1px), linear-gradient(to right, ${theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2 lg:pr-12">
            <motion.div
              className="relative z-10"
              variants={itemVariants}
            >
              <div className="absolute -left-6 -top-6 w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/20 blur-xl"></div>
              <h1 className={`text-4xl md:text-5xl xl:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} relative z-10`}>
                <span className={`${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} inline-block relative`}>
                   
                    Telusko Tutor AI
                   
                </span>
                <br />
                <span>Revolutionizing</span>
                <br/>
                <span>Personalized Learning</span>
              </h1>
            </motion.div>
            
            <motion.p 
              className={`text-lg md:text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} relative z-10`}
              variants={itemVariants}
            >
              Telusko Tutor AI combines advanced artificial intelligence with expert educational content to create a truly personalized learning experience that adapts to your unique needs.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="mb-8 md:mb-0"
            >
              <motion.button
                className={`px-6 py-3 rounded-lg mr-4 text-white font-medium ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} transition-colors duration-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className={`px-6 py-3 rounded-lg font-medium ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-purple-600 hover:bg-gray-50'} transition-colors duration-200 border ${theme === 'dark' ? 'border-gray-700' : 'border-purple-200'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-12 md:mt-0 md:w-1/2 relative"
            variants={imageVariants}
          >
            {/* Decorative elements */}
            <motion.div 
              className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-400/10'} blur-2xl`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div 
              className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full ${theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-400/10'} blur-2xl`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            
            <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${theme === 'dark' ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'} border ${theme === 'dark' ? 'border-gray-700' : 'border-purple-100'}`}>
              {/* AI Tutor visualization */}
              <div className="aspect-w-16 aspect-h-9">
                <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800/70' : 'bg-purple-50/70'} relative p-8`}>
                  {/* Main container for the AI visualization */}
                  <div className="w-full h-full relative flex items-center justify-center">
                    {/* Central node and connections */}
                    <div className="relative">
                      {/* Central AI node */}
                      <motion.div
                        className={`relative w-16 h-16 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-purple-700 shadow-lg shadow-purple-900/40' : 'bg-purple-600 shadow-lg shadow-purple-500/30'}`}
                        animate={floatAnimation}
                      >
                        <motion.div 
                          className="text-white text-3xl font-bold"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          ≡
                        </motion.div>
                      </motion.div>
                      
                      {/* Connection nodes - top */}
                      <motion.div 
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      >
                        <motion.div 
                          className={`w-5 h-5 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-500'}`}
                          animate={pulseAnimation}
                        />
                        <motion.div 
                          className="absolute top-5 left-1/2 transform -translate-x-1/2 w-0.5 h-7 bg-purple-500"
                          animate={lineAnimation}
                        />
                      </motion.div>
                      
                      {/* Connection nodes - right */}
                      <motion.div 
                        className="absolute top-1/2 -right-12 transform -translate-y-1/2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      >
                        <motion.div 
                          className={`w-5 h-5 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-500'}`}
                          animate={pulseAnimation}
                        />
                        <motion.div 
                          className="absolute left-5 top-1/2 transform -translate-y-1/2 w-7 h-0.5 bg-purple-500"
                          animate={lineAnimation}
                        />
                      </motion.div>
                      
                      {/* Connection nodes - bottom */}
                      <motion.div 
                        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                        animate={{ y: [0, 5, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.5
                        }}
                      >
                        <motion.div 
                          className={`w-5 h-5 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-500'}`}
                          animate={pulseAnimation}
                        />
                        <motion.div 
                          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-0.5 h-7 bg-purple-500"
                          animate={lineAnimation}
                        />
                      </motion.div>
                      
                      {/* Connection nodes - left */}
                      <motion.div 
                        className="absolute top-1/2 -left-12 transform -translate-y-1/2"
                        animate={{ x: [0, -5, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2
                        }}
                      >
                        <motion.div 
                          className={`w-5 h-5 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-500'}`}
                          animate={pulseAnimation}
                        />
                        <motion.div 
                          className="absolute right-5 top-1/2 transform -translate-y-1/2 w-7 h-0.5 bg-purple-500"
                          animate={lineAnimation}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Additional connection points */}
                    <motion.div 
                      className="absolute top-0 right-0"
                      animate={floatAnimation}
                    >
                      <motion.div 
                        className={`w-5 h-5 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-500'}`}
                        animate={pulseAnimation}
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="absolute bottom-0 left-0"
                      animate={{
                        ...floatAnimation,
                        transition: {
                          ...floatAnimation.transition,
                          delay: 1
                        }
                      }}
                    >
                      <motion.div 
                        className={`w-5 h-5 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-500'}`}
                        animate={pulseAnimation}
                      />
                    </motion.div>
                    
                    {/* Chat bubble */}
                    <motion.div
                      className={`absolute right-6 top-1/2 -translate-y-1/2 w-24 h-16 rounded-md ${theme === 'dark' ? 'bg-purple-700' : 'bg-purple-600'} flex items-center justify-center p-2`}
                      animate={chatBubbleAnimation}
                      style={{
                        boxShadow: theme === 'dark' 
                          ? '0 0 15px rgba(168, 85, 247, 0.3)' 
                          : '0 0 15px rgba(168, 85, 247, 0.2)'
                      }}
                    >
                      <div className="w-full">
                        <div className={`w-full h-1.5 ${theme === 'dark' ? 'bg-purple-300' : 'bg-purple-200'} rounded-full mb-1.5`}></div>
                        <div className={`w-3/4 h-1.5 ${theme === 'dark' ? 'bg-purple-300' : 'bg-purple-200'} rounded-full mb-1.5`}></div>
                        <div className={`w-1/2 h-1.5 ${theme === 'dark' ? 'bg-purple-300' : 'bg-purple-200'} rounded-full`}></div>
                      </div>
                    </motion.div>
                    
                    {/* Data flow animations */}
                    <motion.div
                      className="absolute w-full h-full pointer-events-none"
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Data points flowing around */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`data-point-${i}`}
                          className={`absolute w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-purple-400' : 'bg-purple-400'}`}
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                          }}
                          animate={{
                            x: [0, 30, 0],
                            y: [0, 30, 0],
                            opacity: [0, 1, 0],
                            scale: [0.8, 1, 0.8]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5,
                            repeatDelay: 1
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-lg font-medium`}>
                  Interactive AI Learning Assistant
                </div>
                <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                  Responds to your questions in real-time
                </div>
                
                {/* Interaction badges */}
                <div className="mt-3 flex items-center space-x-2">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span> AI Powered
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                    <span className="w-2 h-2 rounded-full bg-blue-400 mr-1"></span> Real-time
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-violet-900/50 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>
                    <span className="w-2 h-2 rounded-full bg-violet-400 mr-1"></span> Personalized
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;