import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useBookings } from '../context/BookingContext';
import { Moon, Sun, User, Briefcase, MessageSquare, Calendar } from 'lucide-react';
import { professionals } from '../data/professionals';

const ProfessionalDashboard = () => {
   const { user, logout } = useAuth();
   const { theme, toggleTheme } = useTheme();
   const { getProfessionalBookings, updateBookingStatus } = useBookings();
   const [activeTab, setActiveTab] = useState('profile');
   const professionalId = 1; // hardcoded for demo

  // Mock data for professional
  const professionalData = {
    name: 'John Electrician',
    bio: 'Experienced electrician with 10 years in the field.',
    services: [
      { id: 1, name: 'Wiring Installation', price: 100, description: 'Install new electrical wiring' },
      { id: 2, name: 'Outlet Repair', price: 50, description: 'Fix faulty outlets' },
    ],
    bookings: [
      { id: 1, client: 'Alice Johnson', service: 'Wiring Installation', date: '2023-10-15', status: 'confirmed' },
    ],
  };

  return (
    <div className="min-h-screen particles-bg relative overflow-hidden">
      {/* 3D Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-3xl animate-float3d neon-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse3d delay-1000 neon-glow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/15 to-blue-400/15 rounded-full blur-3xl animate-rotate3d delay-500"></div>
      </div>

      {/* Top Navbar */}
      <nav className="glass-3d shadow-2xl animate-float relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-clip-text text-transparent animate-shimmer">Professional Dashboard</h1>
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
              onClick={() => setActiveTab('profile')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
                activeTab === 'profile' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <User className="mr-3 h-5 w-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left mt-1 ${
                activeTab === 'services' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Briefcase className="mr-3 h-5 w-5" />
              Services
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left mt-1 ${
                activeTab === 'bookings' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left mt-1 ${
                activeTab === 'chat' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Chat
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Manage Profile</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input type="text" defaultValue={professionalData.name} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                  <textarea defaultValue={professionalData.bio} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
                </div>
                <button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Manage Services</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {professionalData.services.map((service) => (
                    <li key={service.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">${service.price} - {service.description}</div>
                        </div>
                        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d text-sm">Edit</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">View Bookings</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {getProfessionalBookings(professionalId).map((booking) => {
                    const pro = professionals.find(p => p.id === booking.professionalId);
                    const service = pro?.services.find(s => s.id === booking.serviceId);
                    return (
                      <li key={booking.id} className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{service?.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{booking.date} at {booking.time} - Status: {booking.status}</div>
                          </div>
                          {booking.status === 'pending' && (
                            <div>
                              <button onClick={() => updateBookingStatus(booking.id, 'accepted')} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d text-sm mr-2">Accept</button>
                              <button onClick={() => updateBookingStatus(booking.id, 'rejected')} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d text-sm">Reject</button>
                            </div>
                          )}
                          {booking.status === 'accepted' && (
                            <button onClick={() => updateBookingStatus(booking.id, 'completed')} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d text-sm">Complete</button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                  {getProfessionalBookings(professionalId).length === 0 && (
                    <li className="px-6 py-4">
                      <p className="text-gray-500 dark:text-gray-400">No bookings yet.</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Chat with Clients</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md p-6">
                <p className="text-gray-500 dark:text-gray-400">Chat interface will be implemented here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;