// src/components/learning/QuizSection.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion, QuizAnswer, QuizResult } from '../../types/LessonTypes';

interface QuizSectionProps {
  quiz: QuizQuestion[];
  theme: string;
  onQuizComplete?: (result: QuizResult) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ quiz, theme, onQuizComplete }) => {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<QuizResult>({ correct: 0, total: 0, percentage: 0 });

  // Initialize quiz answers
  useEffect(() => {
    if (quiz && quiz.length > 0) {
      const initialAnswers = quiz.map(question => ({
        questionId: question.id,
        selectedOption: null
      }));
      setQuizAnswers(initialAnswers);
      setQuizSubmitted(false);
      setQuizResult({ correct: 0, total: 0, percentage: 0 });
    }
  }, [quiz]);

  // Handle selecting an answer in the quiz
  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return; // Prevent changing answers after submission
    
    setQuizAnswers(prev => 
      prev.map(answer => 
        answer.questionId === questionId 
          ? { ...answer, selectedOption: optionIndex }
          : answer
      )
    );
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    if (!quiz || quiz.length === 0) return;
    
    // Check if all questions have been answered
    const unanswered = quizAnswers.filter(answer => answer.selectedOption === null);
    if (unanswered.length > 0) {
      alert(`Please answer all questions before submitting. You have ${unanswered.length} unanswered questions.`);
      return;
    }
    
    // Mark correct/incorrect answers
    let correctCount = 0;
    const gradedAnswers = quizAnswers.map(answer => {
      const question = quiz.find(q => q.id === answer.questionId);
      const isCorrect = question?.correctOptionIndex === answer.selectedOption;
      
      if (isCorrect) correctCount++;
      
      return {
        ...answer,
        isCorrect
      };
    });
    
    const percentage = (correctCount / quiz.length) * 100;
    const result = { 
      correct: correctCount, 
      total: quiz.length,
      percentage: parseFloat(percentage.toFixed(1))
    };
    
    setQuizAnswers(gradedAnswers);
    setQuizResult(result);
    setQuizSubmitted(true);
    
    // Notify parent component if callback provided
    if (onQuizComplete) {
      onQuizComplete(result);
    }
  };

  // Reset quiz to try again
  const resetQuiz = () => {
    if (!quiz || quiz.length === 0) return;
    
    const initialAnswers = quiz.map(question => ({
      questionId: question.id,
      selectedOption: null
    }));
    
    setQuizAnswers(initialAnswers);
    setQuizSubmitted(false);
    setQuizResult({ correct: 0, total: 0, percentage: 0 });
  };

  return (
    <div className="space-y-8">
      {/* Show quiz results if submitted */}
      {quizSubmitted && (
        <motion.div 
          className={`p-4 mb-6 rounded-lg ${
            theme === 'dark' 
              ? (quizResult.percentage === 100 ? 'bg-green-900/30 text-green-300' : 'bg-blue-900/30 text-blue-300')
              : (quizResult.percentage === 100 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800')
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">
                Your score: {quizResult.correct} out of {quizResult.total} ({quizResult.percentage}%)
              </p>
              <p className="mt-1">
                {quizResult.percentage === 100 
                  ? 'Congratulations! You\'ve mastered this content.' 
                  : quizResult.percentage >= 70
                    ? 'Good job! Keep reviewing to master this topic.'
                    : 'Keep learning! Review the content and try again.'}
              </p>
            </div>
            {quizResult.percentage === 100 && (
              <div className="text-3xl">🎉</div>
            )}
          </div>
        </motion.div>
      )}
      
      {quiz.map((question, index) => {
        const answer = quizAnswers.find(a => a.questionId === question.id);
        const isAnswered = answer?.selectedOption !== null;
        const isCorrect = answer?.isCorrect;
        
        return (
          <motion.div 
            key={question.id} 
            className={`p-5 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700' 
                : 'bg-gray-50'
            } ${
              quizSubmitted && isAnswered
                ? isCorrect
                  ? theme === 'dark' ? 'ring-2 ring-green-500/50' : 'ring-2 ring-green-500/50'
                  : theme === 'dark' ? 'ring-2 ring-red-500/50' : 'ring-2 ring-red-500/50'
                : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Question {index + 1}: {question.questionText}
            </h3>
            <div className="space-y-3">
              {question.options.map((option, optIndex) => (
                <div 
                  key={optIndex} 
                  className={`flex items-center p-3 rounded-md ${
                    answer?.selectedOption === optIndex
                      ? theme === 'dark' 
                        ? 'bg-gray-600'
                        : 'bg-gray-200'
                      : ''
                  } hover:bg-opacity-50 cursor-pointer transition-colors ${
                    quizSubmitted 
                      ? 'pointer-events-none'
                      : 'hover:bg-gray-600/10'
                  }`}
                  onClick={() => handleSelectAnswer(question.id, optIndex)}
                >
                  <input
                    type="radio"
                    id={`${question.id}-${optIndex}`}
                    name={question.id}
                    checked={answer?.selectedOption === optIndex}
                    onChange={() => handleSelectAnswer(question.id, optIndex)}
                    disabled={quizSubmitted}
                    className={`h-4 w-4 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'border-gray-300'
                    } focus:ring-blue-500`}
                  />
                  <label 
                    htmlFor={`${question.id}-${optIndex}`} 
                    className={`ml-2 block w-full ${
                      quizSubmitted
                        ? question.correctOptionIndex === optIndex
                          ? theme === 'dark' ? 'text-green-400 font-medium' : 'text-green-700 font-medium'
                          : answer?.selectedOption === optIndex && !isCorrect
                            ? theme === 'dark' ? 'text-red-400 line-through' : 'text-red-600 line-through'
                            : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {option}
                    {quizSubmitted && question.correctOptionIndex === optIndex && (
                      <span className={`ml-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                        ✓ Correct
                      </span>
                    )}
                  </label>
                </div>
              ))}
            </div>
            
            {/* Show explanation after submission */}
            {quizSubmitted && (
              <motion.div 
                className={`mt-4 p-3 rounded ${
                  theme === 'dark' 
                    ? isCorrect ? 'bg-green-900/20' : 'bg-red-900/20' 
                    : isCorrect ? 'bg-green-50' : 'bg-red-50'
                }`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <p className={`text-sm ${
                  theme === 'dark'
                    ? isCorrect ? 'text-green-300' : 'text-red-300'
                    : isCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {isCorrect 
                    ? 'Correct! Well done.' 
                    : `Incorrect. The correct answer is: ${question.options[question.correctOptionIndex]}`
                  }
                </p>
              </motion.div>
            )}
          </motion.div>
        );
      })}
      
      <div className="mt-6">
        {!quizSubmitted ? (
          <motion.button 
            onClick={handleSubmitQuiz}
            className={`px-6 py-3 rounded-md text-white font-medium ${
              theme === 'dark' 
                ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Answers
          </motion.button>
        ) : (
          <div className="flex flex-wrap gap-4">
            <motion.button 
              onClick={resetQuiz}
              className={`px-6 py-3 rounded-md font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Try Again
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;