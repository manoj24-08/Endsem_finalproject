import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import UserDashboard from './pages/UserDashboard';
import SupportDashboard from './pages/SupportDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ThreeBackground from './components/ThreeBackground';

function App() {
  return (
    <>
      <ThreeBackground />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/professional" element={
          <ProtectedRoute requiredRole="professional">
            <ProfessionalDashboard />
          </ProtectedRoute>
        } />
        <Route path="/user" element={
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/support" element={
          <ProtectedRoute requiredRole="support">
            <SupportDashboard />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <div className="min-h-screen flex flex-col items-center justify-center particles-bg relative z-10">
            {/* Logo/Brand Section */}
            <div className="mb-8">
              <div className="text-center mb-4">
                <h1 className="text-6xl font-normal text-gray-900 dark:text-white mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  FINDPRO
                </h1>
                <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mt-2">
                  Professional Services Platform
                </p>
              </div>
            </div>

            <div className="text-center glass-3d p-16 rounded-3xl animate-float3d max-w-3xl mx-4 shadow-2xl">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Welcome to FindPro
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
                Connect with professionals for all your service needs
              </p>
              <div className="space-x-6">
                <a href="/login" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 card-3d">
                  Login
                </a>
                <a href="/register" className="inline-block bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl text-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 card-3d">
                  Register
                </a>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </>
  );
}

export default App
