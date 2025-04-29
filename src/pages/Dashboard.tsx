// src/pages/Dashboard.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import apiService from '../api/apiService';
import { useNavigate } from 'react-router-dom';
// import { FaGraduationCap, FaBook, FaCalendarCheck } from 'react-icons/fa';

// Define types for our data structure
interface Course {
  id: string;
  title: string;
  description: string;
  difficultyLevel: string;
  modules: any[];
}

interface LessonProgress {
  courseId: string;
  lessonId: string;
  moduleId: string;
  lessonTitle: string;
  completedAt: string;
  quizScore: number | null;
  completed: boolean;
}

interface UserProgress {
  enrolledCourses: Course[];
  courseProgress: Record<string, number>;
  lessonProgress: LessonProgress[];
}

// Define view types
type CourseViewType = 'list' | 'card';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [courseView, setCourseView] = useState<CourseViewType>('list');
  const navigate = useNavigate();
  console.log(userProgress, 'user in dashboard');
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        setLoading(true);
        const response = await apiService.aiCourses.userDashboard();
        console.log(response, 'user dashboard response');

        if (response.success) {
          setUserProgress(response.data);
          console.log(response.data, 'user Dashboard');
        }
      } catch (error) {
        console.log(error, "error fetching user progress");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProgress();
  }, []);

  // Calculate stats
  const totalCourses = userProgress?.enrolledCourses.length || 0;
  const totalCompletedLessons = userProgress?.lessonProgress.filter(lesson => lesson.completed).length || 0;

  // Calculate average completion percentage across all courses
  const calculateAverageCompletion = () => {
    if (!userProgress || Object.keys(userProgress.courseProgress).length === 0) return 0;

    const totalProgress = Object.values(userProgress.courseProgress).reduce((sum, progress) => sum + progress, 0);
    return totalProgress / Object.keys(userProgress.courseProgress).length;
  };

  const averageCompletion = calculateAverageCompletion();

  // Get recent activities (last 5 completed lessons)
  const recentActivities = userProgress?.lessonProgress
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, 5) || [];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Find course name by ID
  const getCourseNameById = (courseId: string) => {
    const course = userProgress?.enrolledCourses.find(course => course.id === courseId);
    return course?.title || 'Unknown Course';
  };

  // Toggle view function with animation
  const toggleCourseView = () => {
    setCourseView(prevView => prevView === 'list' ? 'card' : 'list');
  };

  // Render List View
  const renderListView = () => {
    return (
      <div className="space-y-4">
        {userProgress?.enrolledCourses.map((course, index) => {
          const progress = userProgress.courseProgress[course.id] || 0;
          const courseAbbr = getAbbreviation(course.title);
          return (
            <motion.div 
              key={course.id} 
              className={`border-b pb-4 last:border-b-0 rounded-lg p-5 ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700 focus:bg-gray-700' 
                  : 'hover:bg-gray-50 focus:bg-gray-50'
              } transition-colors duration-200`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  delay: index * 0.08,
                  duration: 0.3
                }
              }}
              whileHover={{ 
                x: 4,
                boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.08)",
                transition: { duration: 0.2 }
              }}
              tabIndex={0}
            >
              <div className="flex items-start mb-3">
                <div 
                  className={`flex-shrink-0 w-10 h-10 rounded-lg mr-4 flex items-center justify-center text-lg font-bold ${
                    theme === 'dark' ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {courseAbbr}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <motion.h3
                      className="font-medium cursor-pointer hover:text-purple-600 transition-colors text-lg"
                      onClick={() => navigate(`/course/${course.title}/modules`, { state: { modulesData: course.modules } })}
                      whileHover={{ 
                        color: theme === 'dark' ? '#d8b4fe' : '#9333ea',
                        x: 2
                      }}
                    >
                      {course.title}
                    </motion.h3>
                    <motion.span 
                      className={`px-2 py-1 text-xs rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      Lvl: {course.difficultyLevel}/10
                    </motion.span>
                  </div>
                  <div className="mb-3 text-sm text-gray-500 line-clamp-2 mt-1">{course.description}</div>
                </div>
              </div>

              <div className="relative pt-1 ml-14">
                <div className={`flex items-center justify-between mb-1`}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Progress
                    </span>
                  </motion.div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className={`overflow-hidden h-2 text-xs flex rounded-full bg-blue-200`}>
                  <motion.div
                    style={{ width: `${progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${progress}%`,
                      transition: { 
                        duration: 0.8,
                        delay: index * 0.08 + 0.2,
                        ease: "easeOut"
                      }
                    }}
                  ></motion.div>
                </div>
              </div>
              
              <motion.div 
                className="mt-3 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: index * 0.08 + 0.5 } 
                }}
              >
                <motion.button
                  className="px-5 py-2 text-sm rounded-lg text-white bg-purple-600 hover:bg-purple-700 font-medium"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: theme === 'dark' ? '#7e22ce' : '#7e22ce',
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/course/${course.title}/modules`, { state: { modulesData: course.modules } })}
                >
                  Continue Learning
                </motion.button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // Create course title abbreviation
  const getAbbreviation = (title: string) => {
    const words = title.split(' ');
    if (words.length === 1) {
      return title.substring(0, 2).toUpperCase();
    }
    return words
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 3);
  };

  // Render Card View
  const renderCardView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {userProgress?.enrolledCourses.map((course, index) => {
          const progress = userProgress.courseProgress[course.id] || 0;
          const courseAbbr = getAbbreviation(course.title);
          return (
            <motion.div 
              key={course.id} 
              className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: index * 0.1,
                  duration: 0.4
                }
              }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.08)",
                transition: { 
                  type: "spring", 
                  stiffness: 300,
                  damping: 15
                }
              }}
            >
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div 
                    className={`flex-shrink-0 w-12 h-12 rounded-lg mr-4 flex items-center justify-center text-xl font-bold ${
                      theme === 'dark' ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {courseAbbr}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <motion.h3
                        className="font-medium cursor-pointer hover:text-purple-600 transition-colors text-lg"
                        onClick={() => navigate(`/course/${course.title}/modules`, { state: { modulesData: course.modules } })}
                        whileHover={{ 
                          color: theme === 'dark' ? '#d8b4fe' : '#9333ea',
                          x: 2,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {course.title}
                      </motion.h3>
                      <motion.span 
                        className={`ml-2 px-2 py-1 text-xs rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        Lvl: {course.difficultyLevel}/10
                      </motion.span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-5 text-sm text-gray-500 line-clamp-3 h-16 overflow-hidden">{course.description}</div>
                
                <div className="relative pt-1 mb-4">
                  <div className={`flex items-center justify-between mb-1`}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Progress
                      </span>
                    </motion.div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className={`overflow-hidden h-3 text-xs flex rounded-full bg-blue-200`}>
                    <motion.div
                      style={{ width: `${progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${progress}%`,
                        transition: { 
                          duration: 1,
                          delay: index * 0.1 + 0.3,
                          ease: "easeOut"
                        }
                      }}
                    ></motion.div>
                  </div>
                </div>
                
                <motion.button
                  className="mt-4 w-full text-center py-3 text-sm rounded-lg text-white bg-purple-600 hover:bg-purple-700 font-medium"
                  whileHover={{ 
                    scale: 1.03,
                    backgroundColor: theme === 'dark' ? '#7e22ce' : '#7e22ce',
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 20 
                  }}
                  onClick={() => navigate(`/course/${course.title}/modules`, { state: { modulesData: course.modules } })}
                >
                  Continue Learning
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`container mx-auto px-4 py-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className={`p-6 rounded-lg shadow-lg mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-4">Welcome, {user?.username || 'User'}!</h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Here's an overview of your learning journey.
              </p>

              <div className="border-t border-b py-4 my-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} flex items-center`}>
                  {/* <FaGraduationCap className="text-purple-600 text-3xl mr-3" /> */}
                  <div>
                    <div className="font-bold text-2xl text-purple-600">{totalCourses}</div>
                    <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Enrolled Courses</div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} flex items-center`}>
                  {/* <FaBook className="text-green-600 text-3xl mr-3" /> */}
                  <div>
                    <div className="font-bold text-2xl text-green-600">{averageCompletion.toFixed(1)}%</div>
                    <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Average Completion</div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} flex items-center`}>
                  {/* <FaCalendarCheck className="text-blue-600 text-3xl mr-3" /> */}
                  <div>
                    <div className="font-bold text-2xl text-blue-600">{totalCompletedLessons}</div>
                    <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Completed Lessons</div>
                  </div>
                </div>
              </div>
            </div>
            {
              !(userProgress?.enrolledCourses.length === 0) ?
                <>
                  {/* Course Progress with View Toggle */}
                  <div className={`p-6 rounded-lg shadow-lg mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Course Progress</h2>
                      <motion.button
                        onClick={toggleCourseView}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                          theme === 'dark' 
                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mr-2" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          {courseView === 'list' ? (
                            // Grid icon for card view
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" 
                            />
                          ) : (
                            // List icon for list view
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M4 6h16M4 12h16M4 18h16" 
                            />
                          )}
                        </svg>
                        <motion.span 
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={courseView === 'list' ? 'card' : 'list'}
                      >
                        {courseView === 'list' ? 'Card View' : 'List View'}
                      </motion.span>
                      </motion.button>
                    </div>

                    <motion.div
                      key={courseView}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {courseView === 'list' ? renderListView() : renderCardView()}
                    </motion.div>
                  </div>

                  {/* Recent Activity */}
                  <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>

                    {recentActivities.length > 0 ? (
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                          <div key={index} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium">{activity.lessonTitle}</h4>
                                <p className="text-sm text-gray-500">{getCourseNameById(activity.courseId)}</p>
                              </div>
                              <div className="text-right">
                                <span className={`px-2 py-1 text-xs rounded ${activity.quizScore !== null ?
                                  (activity.quizScore >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') :
                                  'bg-blue-100 text-blue-800'
                                  }`}>
                                  {activity.quizScore !== null ? `Quiz: ${activity.quizScore}%` : 'Completed'}
                                </span>
                                <p className="text-xs text-gray-500 mt-1">{formatDate(activity.completedAt)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        No recent activity found. Start learning to see your progress!
                      </p>
                    )}
                  </div>
                </> : <motion.button
                  onClick={() => navigate('/generatepath')}
                  className={`w-full px-6 py-3 border border-transparent text-base font-medium rounded-md ${theme === 'dark'
                    ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                    : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                    } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 shadow-md`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >Generate your first learning path </motion.button>
            }
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;