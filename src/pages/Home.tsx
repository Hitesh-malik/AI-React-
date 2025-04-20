// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const Home: React.FC = () => {
  const { theme } = useTheme();
  
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
    <div className={`container mx-auto px-4 py-16 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h1 
            className={`text-5xl sm:text-6xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Telusko AI Learning Path
          </motion.h1>
          
          <motion.p 
            className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-10 max-w-2xl mx-auto`}
            variants={itemVariants}
          >
            Your AI-powered guide to personalized learning journeys tailored specifically for you.
          </motion.p>
          
          <motion.div 
            className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            Innovative Learning Platform
          </motion.div>
        </motion.div>
        
        {/* Main Content Section */}
        <motion.div 
          className={`mt-10 p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
          variants={itemVariants}
        >
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>
            Why Telusko AI Learning?
          </h2>
          
          <div className="space-y-6">
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Our AI-powered learning platform analyzes your skills, goals, and learning style to create 
              customized learning paths that optimize your educational journey. Unlike generic courses, 
              Telusko adapts to your unique needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Personalized Learning</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Our algorithms analyze your learning style, pace, and preferences to create 
                  truly customized learning experiences that maximize your potential.
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Adaptive Curriculum</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  As you progress, our system adapts content difficulty and focus areas based 
                  on your performance, ensuring you're always challenged but never overwhelmed.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Button */}
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <Link 
            to="/generate-path"
            className="inline-block px-8 py-4 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors text-lg shadow-lg"
          >
            Generate Your Learning Path
          </Link>
        </motion.div>
        
        {/* Features Section */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <motion.div 
            className={`p-8 rounded-lg shadow-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} text-center`}
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>AI-Powered Paths</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Advanced AI creates personalized learning journeys based on your goals and skill level.
            </p>
          </motion.div>
          
          <motion.div 
            className={`p-8 rounded-lg shadow-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} text-center`}
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Visual Timeline</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              See your learning journey visualized with interactive timelines and progress tracking.
            </p>
          </motion.div>
          
          <motion.div 
            className={`p-8 rounded-lg shadow-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} text-center`}
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Curated Resources</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Get recommended books, courses, and tutorials perfectly matched to your learning path.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Importance of Learning Section */}
        <motion.div 
          className={`mt-20 ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'} rounded-xl p-8 md:p-12`}
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>The Importance of Personalized Learning</h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
              In today's rapidly evolving world, traditional one-size-fits-all education is becoming obsolete. 
              Telusko leverages AI to create learning experiences that:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Adapt to Your Pace</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn at the speed that works for you, without being held back or rushed ahead.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Focus on Your Goals</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Skip irrelevant content and dive deep into what matters most for your specific objectives.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Build on Your Strengths</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Our system identifies your talents and helps you leverage them for faster mastery.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Address Your Challenges</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                We identify knowledge gaps and provide targeted resources to overcome obstacles.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Final CTA Section */}
        <motion.div 
          className="mt-16 text-center pb-8"
          variants={itemVariants}
        >
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>
            Ready to Transform Your Learning Journey?
          </h2>
          <Link 
            to="/generate-path"
            className="inline-block px-8 py-4 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors text-lg shadow-lg"
          >
            Start Your Path Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;