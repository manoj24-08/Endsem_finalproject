import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useBookings } from '../context/BookingContext';
import { Moon, Sun, Search, Calendar, History, X, Heart, CreditCard, Smartphone, Wallet, QrCode } from 'lucide-react';
import { professionals } from '../data/professionals';

const FeedbackForm = ({ bookingId, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating, review);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} stars</option>)}
        </select>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Review</label>
        <textarea value={review} onChange={(e) => setReview(e.target.value)} rows="2" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
      </div>
      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm">Submit Feedback</button>
    </form>
  );
};

const UserDashboard = () => {
   const { user, logout } = useAuth();
   const { theme, toggleTheme } = useTheme();
   const { addBooking, getUserBookings, updateBookingFeedback } = useBookings();
   const [activeTab, setActiveTab] = useState('search');
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('');
   const [selectedLocation, setSelectedLocation] = useState('');
   const [minPrice, setMinPrice] = useState('');
   const [maxPrice, setMaxPrice] = useState('');
   const [minRating, setMinRating] = useState('');
   const [filteredProfessionals, setFilteredProfessionals] = useState(professionals);
   const [showModal, setShowModal] = useState(false);
   const [selectedPro, setSelectedPro] = useState(null);
   const [selectedService, setSelectedService] = useState('');
   const [bookingDate, setBookingDate] = useState('');
   const [bookingTime, setBookingTime] = useState('');
   const [paymentSuccess, setPaymentSuccess] = useState(false);
   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
   const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));


  const handleSearch = () => {
    let filtered = professionals;
    if (searchTerm) {
      filtered = filtered.filter(pro => pro.name.toLowerCase().includes(searchTerm.toLowerCase()) || pro.category.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory) {
      filtered = filtered.filter(pro => pro.category === selectedCategory);
    }
    if (selectedLocation) {
      filtered = filtered.filter(pro => pro.location === selectedLocation);
    }
    if (minRating) {
      filtered = filtered.filter(pro => pro.rating >= parseFloat(minRating));
    }
    if (minPrice || maxPrice) {
      filtered = filtered.filter(pro => {
        const prices = pro.services.map(s => s.price);
        const minP = minPrice ? parseFloat(minPrice) : 0;
        const maxP = maxPrice ? parseFloat(maxPrice) : Infinity;
        return prices.some(p => p >= minP && p <= maxP);
      });
    }
    setFilteredProfessionals(filtered);
  };

  const categories = [...new Set(professionals.map(p => p.category))];
  const locations = [...new Set(professionals.map(p => p.location))];

  const toggleFavorite = (proId) => {
    const newFavorites = favorites.includes(proId) ? favorites.filter(id => id !== proId) : [...favorites, proId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen particles-bg relative overflow-hidden">

      {/* 3D Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-float3d neon-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse3d delay-1000 neon-glow-pink"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 rounded-full blur-3xl animate-rotate3d delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Top Navbar */}
        <motion.nav className="glass-3d shadow-2xl animate-float" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-shimmer">User Dashboard</h1>
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
      </motion.nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 glass-3d shadow-2xl min-h-screen animate-float3d">
          <nav className="mt-5 px-2">
            <button
              onClick={() => setActiveTab('search')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
                activeTab === 'search' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Search className="mr-3 h-5 w-5" />
              Search Professionals
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left mt-1 ${
                activeTab === 'bookings' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Calendar className="mr-3 h-5 w-5" />
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left mt-1 ${
                activeTab === 'favorites' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Heart className="mr-3 h-5 w-5" />
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left mt-1 ${
                activeTab === 'history' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <History className="mr-3 h-5 w-5" />
              History & Feedback
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'search' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Search Professionals</h2>
              <div className="mb-6">
                <div className="flex flex-wrap space-x-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search by name or category"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">All Locations</option>
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
                <div className="flex space-x-4 mb-4">
                  <input
                    type="number"
                    placeholder="Min Rating"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button onClick={handleSearch} className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d">Search</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
                {filteredProfessionals.map((pro, index) => (
                  <motion.div key={pro.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-lg p-6 cursor-pointer transform-gpu relative overflow-hidden" style={{ transformStyle: 'preserve-3d' }} initial={{ opacity: 0, y: 20, rotateX: -15 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }} whileHover={{ scale: 1.02, rotateY: 2, rotateX: -1, z: 10, boxShadow: '0 10px 25px -5px rgba(251, 191, 36, 0.2)' }} whileTap={{ scale: 0.98 }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}>
                    <img className="h-20 w-20 rounded-full mx-auto mb-4" src={pro.profileImage} alt={pro.name} />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">{pro.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{pro.category} - {pro.location}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Rating: {pro.rating} ({pro.reviews} reviews)</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{pro.amountPerHour}</p>
                    <button onClick={() => toggleFavorite(pro.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                      <Heart className={`h-6 w-6 ${favorites.includes(pro.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button onClick={() => { setSelectedPro(pro); setShowModal(true); }} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d mt-4">Book Now</button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Bookings</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {getUserBookings(user.email).map((booking) => {
                    const pro = professionals.find(p => p.id === booking.professionalId);
                    const service = pro?.services.find(s => s.id === booking.serviceId);
                    return (
                      <li key={booking.id} className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{pro?.name} - {service?.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{booking.date} at {booking.time} - Status: {booking.status}</div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  {getUserBookings(user.email).length === 0 && (
                    <li className="px-6 py-4">
                      <p className="text-gray-500 dark:text-gray-400">No bookings yet.</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Favorite Professionals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
                {professionals.filter(pro => favorites.includes(pro.id)).map((pro, index) => (
                  <motion.div key={pro.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-lg p-6 cursor-pointer transform-gpu relative overflow-hidden" style={{ transformStyle: 'preserve-3d' }} initial={{ opacity: 0, y: 20, rotateX: -15 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }} whileHover={{ scale: 1.02, rotateY: 2, rotateX: -1, z: 10, boxShadow: '0 10px 25px -5px rgba(251, 191, 36, 0.2)' }} whileTap={{ scale: 0.98 }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}>
                    <img className="h-20 w-20 rounded-full mx-auto mb-4" src={pro.profileImage} alt={pro.name} />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">{pro.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{pro.category} - {pro.location}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Rating: {pro.rating} ({pro.reviews} reviews)</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{pro.amountPerHour}</p>
                    <button onClick={() => { setSelectedPro(pro); setShowModal(true); }} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d mt-4">Book Now</button>
                    <button onClick={() => toggleFavorite(pro.id)} className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d mt-2">
                      <Heart className={`inline h-6 w-6 ${favorites.includes(pro.id) ? 'fill-current' : ''}`} />
                    </button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">History & Feedback</h2>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {getUserBookings(user.email).filter(booking => booking.status === 'completed').map((booking) => {
                    const pro = professionals.find(p => p.id === booking.professionalId);
                    const service = pro?.services.find(s => s.id === booking.serviceId);
                    return (
                      <li key={booking.id} className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{pro?.name} - {service?.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{booking.date} at {booking.time}</div>
                          {booking.rating ? (
                            <div className="mt-2">
                              <p className="text-sm">Rating: {booking.rating}/5</p>
                              {booking.review && <p className="text-sm text-gray-600 dark:text-gray-400">{booking.review}</p>}
                            </div>
                          ) : (
                            <FeedbackForm bookingId={booking.id} onSubmit={(rating, review) => updateBookingFeedback(booking.id, rating, review)} />
                          )}
                        </div>
                      </li>
                    );
                  })}
                  {getUserBookings(user.email).filter(booking => booking.status === 'completed').length === 0 && (
                    <li className="px-6 py-4">
                      <p className="text-gray-500 dark:text-gray-400">No completed bookings yet.</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Book {selectedPro?.name}</h3>
              <button onClick={() => { setShowModal(false); setSelectedService(''); setBookingDate(''); setBookingTime(''); setPaymentSuccess(false); setSelectedPaymentMethod(''); }} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            {!paymentSuccess ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!selectedPaymentMethod) {
                  alert('Please select a payment method');
                  return;
                }
                addBooking({
                  userId: user.email,
                  professionalId: selectedPro.id,
                  serviceId: selectedService,
                  date: bookingDate,
                  time: bookingTime,
                });
                setPaymentSuccess(true);
              }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service</label>
                  <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                    <option value="">Select Service</option>
                    {selectedPro.services.map(service => (
                      <option key={service.id} value={service.id}>{service.name} - ₹{service.price}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                  <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                  <input type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                </div>
                
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Payment Method</label>
                  <div className="grid grid-cols-1 gap-3">
                    {/* UPI Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('upi')}
                      className={`flex items-center p-4 border-2 rounded-lg transition-all ${
                        selectedPaymentMethod === 'upi'
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
                      }`}
                    >
                      <Smartphone className="h-6 w-6 mr-3 text-indigo-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">UPI</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Pay using UPI apps</div>
                      </div>
                    </button>

                    {/* UPI QR Code Display */}
                    {selectedPaymentMethod === 'upi' && (
                      <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border-2 border-indigo-200 dark:border-indigo-700">
                        <div className="text-center">
                          <div className="flex justify-center mb-4">
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                              <QrCode className="h-32 w-32 text-gray-800" />
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Scan QR Code to Pay</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Use any UPI app like Google Pay, PhonePe, Paytm</p>
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 inline-block">
                            <p className="text-xs text-gray-500 dark:text-gray-400">UPI ID</p>
                            <p className="text-sm font-mono font-semibold text-indigo-600 dark:text-indigo-400">findpro@upi</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Credit Card Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('credit')}
                      className={`flex items-center p-4 border-2 rounded-lg transition-all ${
                        selectedPaymentMethod === 'credit'
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
                      }`}
                    >
                      <CreditCard className="h-6 w-6 mr-3 text-indigo-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">Credit Card</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Visa, Mastercard, Amex</div>
                      </div>
                    </button>

                    {/* Debit Card Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('debit')}
                      className={`flex items-center p-4 border-2 rounded-lg transition-all ${
                        selectedPaymentMethod === 'debit'
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
                      }`}
                    >
                      <Wallet className="h-6 w-6 mr-3 text-indigo-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">Debit Card</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">All major banks accepted</div>
                      </div>
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d">Proceed to Pay</button>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-green-600 font-medium">Payment Successful! Booking confirmed.</p>
                <button onClick={() => { setShowModal(false); setSelectedService(''); setBookingDate(''); setBookingTime(''); setPaymentSuccess(false); setSelectedPaymentMethod(''); }} className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 card-3d animate-pulse3d">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;