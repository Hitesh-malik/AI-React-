// src/types/LessonTypes.ts

export interface QuizQuestion {
    id: string;
    questionText: string;
    options: string[];
    correctOptionIndex: number; // Changed from correctAnswer to match API
  }
  
  export interface Lesson {
    id: string;
    title: string;
    content: string;
    description?: string;
    simplifiedContent?: string;
    examples?: string;
    sequenceOrder?: number;
    quiz?: QuizQuestion[];
    completed?: boolean;
    quizScore?: number | null;
  }
  
  export interface QuizAnswer {
    questionId: string;
    selectedOption: number | null;
    isCorrect?: boolean;
  }
  
  export interface QuizResult {
    correct: number;
    total: number;
    percentage: number;
  }