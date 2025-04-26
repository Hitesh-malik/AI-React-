// src/pages/Dashboard.tsx
import { motion } from 'framer-motion';
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

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
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
                  {/* Course Progress */}
                  <div className={`p-6 rounded-lg shadow-lg mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className="text-xl font-semibold mb-6">Course Progress</h2>

                    <div className="space-y-6">
                      {userProgress?.enrolledCourses.map(course => {
                        const progress = userProgress.courseProgress[course.id] || 0;
                        return (
                          <div key={course.id} className="border-b pb-4 last:border-b-0">
                            <div className="flex justify-between items-center mb-2">
                              <h3
                                className="font-medium cursor-pointer hover:text-purple-600 transition-colors"
                                onClick={() => navigate(`/course/${course.title}/modules`, { state: { modulesData: course.modules } })}
                              >
                                {course.title}
                              </h3>
                              <span className={`px-2 py-1 text-xs rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                Difficulty: {course.difficultyLevel}/10
                              </span>
                            </div>
                            <div className="mb-2 text-sm text-gray-500 line-clamp-2">{course.description}</div>

                            <div className="relative pt-1">
                              <div className={`flex items-center justify-between mb-1`}>
                                <div>
                                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                    Progress
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-semibold inline-block text-blue-600">
                                    {progress.toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                              <div className={`overflow-hidden h-2 text-xs flex rounded bg-blue-200`}>
                                <div
                                  style={{ width: `${progress}%` }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                ></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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