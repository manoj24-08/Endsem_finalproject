import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, MessageSquare, AlertTriangle, Headphones } from 'lucide-react';

const SupportDashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('inquiries');

  // Mock data
  const inquiries = [
    { id: 1, user: 'Alice Johnson', message: 'How do I book a service?', status: 'open' },
    { id: 2, user: 'Bob Smith', message: 'Payment issue', status: 'resolved' },
  ];

  const complaints = [
    { id: 1, user: 'Charlie Brown', complaint: 'Service was delayed', status: 'investigating' },
  ];

  return (
    <div className="min-h-screen particles-bg relative overflow-hidden">
      {/* 3D Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float3d neon-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse3d delay-1000 neon-glow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-teal-400/15 rounded-full blur-3xl animate-rotate3d delay-500"></div>
      </div>

      {/* Top Navbar */}
      <nav className="glass-3d shadow-2xl animate-float relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 bg-clip-text text-transparent animate-shimmer">Customer Support Panel</h1>
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
              onClick={() => setActiveTab('inquiries')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
                activeTab === 'inquiries' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              User Inquiries
            </button>
            <button
              onClick={() => setActiveTab('complaints')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left mt-1 ${
                activeTab === 'complaints' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <AlertTriangle className="mr-3 h-5 w-5" />
              Complaints
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left mt-1 ${
                activeTab === 'chat' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Headphones className="mr-3 h-5 w-5" />
              Live Chat
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'inquiries' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Inquiries</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {inquiries.map((inq) => (
                    <li key={inq.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{inq.user}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{inq.message}</div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            inq.status === 'open' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d text-sm">Respond</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Complaints</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {complaints.map((comp) => (
                    <li key={comp.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{comp.user}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{comp.complaint}</div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {comp.status}
                          </span>
                        </div>
                        <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d text-sm">Investigate</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Live Chat Assistance</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md p-6">
                <p className="text-gray-500 dark:text-gray-400">Live chat interface will be implemented here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;