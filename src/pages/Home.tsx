// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useRef } from 'react';
import Threads from '../components/common/Threads';

const Home: React.FC = () => {
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div ref={scrollRef} className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {/* Hero Section with Threads Animation */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Threads Animation Backdrop */}
        <div className="absolute inset-0 z-0">
          <Threads
            color={theme === 'dark' ? [0.6, 0.4, 1] : [0.5, 0.3, 0.8]}
            amplitude={1.2}
            distance={0.2}
            enableMouseInteraction={false}
          />
        </div>
        
        {/* Content overlay */}
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-6xl sm:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Telusko AI Learning
            </motion.h1>
            
            <motion.p 
              className={`text-xl sm:text-2xl mb-10 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Your AI-powered guide to personalized learning journeys tailored specifically for you
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link 
                to="/generate-path"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all transform hover:scale-105 shadow-md"
              >
                Generate Your Path
              </Link>
              <Link 
                to="/about"
                className={`px-8 py-4 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} font-medium rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105`}
              >
                Learn More
              </Link>
            </motion.div>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <motion.a 
                href="#features"
                className="flex justify-center items-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="features" className="py-20">
        <motion.div 
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Why Telusko AI Learning?
            </h2>
            <p className={`max-w-3xl mx-auto text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Our AI-powered learning platform analyzes your skills, goals, and learning style to create 
              customized learning paths that optimize your educational journey. Unlike generic courses, 
              Telusko adapts to your unique needs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            <motion.div 
              variants={itemVariants} 
              className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} transform transition-all hover:scale-105`}
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Personalized Learning</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Our algorithms analyze your learning style, pace, and preferences to create 
                truly customized learning experiences that maximize your potential.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} transform transition-all hover:scale-105`}
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Adaptive Curriculum</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                As you progress, our system adapts content difficulty and focus areas based 
                on your performance, ensuring you're always challenged but never overwhelmed.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} transform transition-all hover:scale-105`}
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Progress Tracking</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Track your learning journey with detailed analytics, milestones, and achievements
                that keep you motivated and help you understand your growth.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants} 
            className={`p-10 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col justify-center">
                <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  The Importance of Personalized Learning
                </h2>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  In today's rapidly evolving world, traditional one-size-fits-all education is becoming obsolete. 
                  Telusko leverages AI to create learning experiences that adapt to your unique needs, helping you:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Learn at your own pace without feeling rushed or held back</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Focus on content that matters most for your specific goals</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Identify and overcome knowledge gaps with targeted resources</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Build on your existing strengths for more efficient learning</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full h-80 relative overflow-hidden rounded-xl">
                  <Threads
                    color={theme === 'dark' ? [0.8, 0.5, 1] : [0.6, 0.4, 0.9]}
                    amplitude={0.8}
                    distance={0.1}
                    enableMouseInteraction={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Threads
            color={theme === 'dark' ? [0.4, 0.2, 0.8] : [0.3, 0.1, 0.6]}
            amplitude={0.5}
            distance={0.3}
            enableMouseInteraction={false}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ready to Transform Your Learning Journey?
            </h2>
            <p className={`text-xl mb-10 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of learners who have discovered a better way to learn with
              AI-powered personalized education.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/signup"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Get Started for Free
              </Link>
            </motion.div>
            <p className="mt-4 text-sm text-gray-500">No credit card required</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;