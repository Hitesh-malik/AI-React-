// src/components/auth/AIWritingAnimation.tsx
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AIWritingAnimation: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = 'Learning with AI\nIntelligent Paths\nPersonalized Growth';
  const lines = fullText.split('\n');
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const typingSpeed = 100; // milliseconds per character
  const pauseBetweenLines = 1000; // pause between lines in milliseconds
  const pauseBeforeErasing = 2000; // pause before erasing in milliseconds
  const eraseSpeed = 50; // milliseconds per character when erasing
  
  // Use refs to track the current state without causing re-renders
  const textRef = useRef(text);
  const isTypingRef = useRef(isTyping);
  const currentLineRef = useRef(currentLine);
  
  // Update refs when state changes
  useEffect(() => {
    textRef.current = text;
    isTypingRef.current = isTyping;
    currentLineRef.current = currentLine;
  }, [text, isTyping, currentLine]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const handleTypingAnimation = () => {
      const currentText = textRef.current;
      const currentIsTyping = isTypingRef.current;
      const line = currentLineRef.current;
      
      if (currentIsTyping) {
        // Type characters one by one
        if (currentText.length < lines[line].length) {
          setText(lines[line].slice(0, currentText.length + 1));
          timeoutId = setTimeout(handleTypingAnimation, typingSpeed);
        } else {
          // Finished typing current line
          timeoutId = setTimeout(() => {
            setIsTyping(false);
            handleTypingAnimation();
          }, pauseBeforeErasing);
        }
      } else {
        // Erase characters one by one
        if (currentText.length > 0) {
          setText(currentText.slice(0, -1));
          timeoutId = setTimeout(handleTypingAnimation, eraseSpeed);
        } else {
          // Finished erasing, move to next line
          const nextLine = (line + 1) % lines.length;
          setCurrentLine(nextLine);
          timeoutId = setTimeout(() => {
            setIsTyping(true);
            handleTypingAnimation();
          }, pauseBetweenLines);
        }
      }
    };
    
    // Start the animation
    timeoutId = setTimeout(handleTypingAnimation, 500);
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Cursor blink animation
  const cursorVariants = {
    blink: {
      opacity: [1, 0, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'loop' as const,
      },
    },
  };

  // Brain pulse animation
  const brainPulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Connection lines animation
  const connectionVariants = {
    animate: {
      pathLength: [0, 1, 0],
      opacity: [0.2, 0.8, 0.2],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    },
  };

  return (
    <motion.div
      className="absolute top-1/2 right-10 transform -translate-y-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="relative w-52 h-52">
        {/* Brain visualization */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={brainPulseVariants}
          animate="pulse"
        >
          <svg 
            viewBox="0 0 100 100" 
            width="100" 
            height="100" 
            className="text-purple-400"
            style={{ opacity: 0.6 }}
          >
            {/* Simplified brain shape */}
            <path
              d="M50 15c-8 0-15 4-19 10-10 2-16 10-16 20 0 7 4 14 10 18 0 6 5 12 13 14 4 1 8 1 12 0 8-2 13-8 13-14 6-4 10-11 10-18 0-10-6-18-16-20-4-6-11-10-19-10z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Neural network connections */}
            <motion.path
              d="M30 40 L45 30 L60 45 L75 35"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              variants={connectionVariants}
              animate="animate"
            />
            <motion.path
              d="M25 50 L40 55 L55 40 L70 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              variants={connectionVariants}
              animate="animate"
              transition={{ delay: 1 }}
            />
            <motion.path
              d="M30 60 L50 65 L65 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              variants={connectionVariants}
              animate="animate"
              transition={{ delay: 0.5 }}
            />
            {/* Neural nodes */}
            <circle cx="30" cy="40" r="2" fill="currentColor" />
            <circle cx="45" cy="30" r="2" fill="currentColor" />
            <circle cx="60" cy="45" r="2" fill="currentColor" />
            <circle cx="75" cy="35" r="2" fill="currentColor" />
            <circle cx="25" cy="50" r="2" fill="currentColor" />
            <circle cx="40" cy="55" r="2" fill="currentColor" />
            <circle cx="55" cy="40" r="2" fill="currentColor" />
            <circle cx="70" cy="50" r="2" fill="currentColor" />
            <circle cx="30" cy="60" r="2" fill="currentColor" />
            <circle cx="50" cy="65" r="2" fill="currentColor" />
            <circle cx="65" cy="50" r="2" fill="currentColor" />
          </svg>
        </motion.div>
        
        {/* AI typing text */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center min-w-max">
          <div className="font-mono text-lg text-white whitespace-pre flex">
            <span>{text}</span>
            <motion.span
              variants={cursorVariants}
              animate="blink"
              className="text-purple-400"
            >
              |
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIWritingAnimation;