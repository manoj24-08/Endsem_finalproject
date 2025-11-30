import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register(email, password, role)) {
      navigate('/login');
    } else {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center particles-bg relative overflow-hidden">
      {/* 3D Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/30 to-red-400/30 rounded-full blur-3xl animate-float3d neon-glow-pink"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/30 to-indigo-400/30 rounded-full blur-3xl animate-pulse3d delay-1000 neon-glow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-rotate3d delay-500"></div>
      </div>

      <div className="relative max-w-md w-full mx-4">
        <div className="glass-3d rounded-3xl shadow-2xl p-8 space-y-8 transform transition-all duration-500 hover:scale-105 card-3d animate-float">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-12 animate-pulse3d">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-red-500 to-orange-500 bg-clip-text text-transparent animate-shimmer">
              Join FindPro
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Create your account and start connecting
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 hover:bg-white/70 dark:hover:bg-gray-700/70"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 hover:bg-white/70 dark:hover:bg-gray-700/70"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <select
                    id="role"
                    name="role"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 hover:bg-white/70 dark:hover:bg-gray-700/70 appearance-none cursor-pointer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">👤 User</option>
                    <option value="professional">👨‍💼 Professional</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 animate-shake">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-pink-500 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed card-3d animate-pulse3d"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-6 w-6 text-pink-300 group-hover:text-pink-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>
              Create Account
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-pink-600 dark:text-pink-400 hover:text-pink-500 dark:hover:text-pink-300 transition-colors duration-200 group"
              >
                Already have an account?
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">
                  Sign in →
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;