import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Users, Settings, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import { professionals } from '../data/professionals';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('professionals');

  const pendingProfessionals = professionals.filter(p => p.status === 'pending'); // Assume all are approved for now

  return (
    <div className="min-h-screen particles-bg relative overflow-hidden">
      {/* 3D Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float3d neon-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse3d delay-1000 neon-glow-pink"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full blur-3xl animate-rotate3d delay-500"></div>
      </div>

      {/* Top Navbar */}
      <nav className="glass-3d shadow-2xl animate-float relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-indigo-500 to-violet-500 bg-clip-text text-transparent animate-shimmer">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 glass-3d shadow-2xl min-h-screen animate-float3d relative z-10">
          <nav className="mt-5 px-2">
            <button
              onClick={() => setActiveTab('professionals')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
                activeTab === 'professionals' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Users className="mr-3 h-5 w-5" />
              Professionals
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left mt-1 ${
                activeTab === 'users' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              User Activity
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left mt-1 ${
                activeTab === 'settings' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'professionals' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Manage Professionals</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {professionals.map((pro) => (
                    <li key={pro.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full" src={pro.profileImage} alt="" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{pro.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{pro.category} - {pro.location}</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d text-sm flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d text-sm flex items-center">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Activity</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md p-6">
                <p className="text-gray-500 dark:text-gray-400">User activity data will be displayed here.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Platform Settings</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md p-6">
                <p className="text-gray-500 dark:text-gray-400">Platform settings will be managed here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;