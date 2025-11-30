import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  const saveBookings = (newBookings) => {
    setBookings(newBookings);
    localStorage.setItem('bookings', JSON.stringify(newBookings));
  };

  const addBooking = (booking) => {
    const newBooking = {
      id: Date.now().toString(),
      ...booking,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const newBookings = [...bookings, newBooking];
    saveBookings(newBookings);
    return newBooking;
  };

  const updateBookingStatus = (bookingId, status) => {
    const newBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status } : booking
    );
    saveBookings(newBookings);
  };

  const updateBookingFeedback = (bookingId, rating, review) => {
    const newBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, rating, review } : booking
    );
    saveBookings(newBookings);
  };

  const getUserBookings = (userId) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const getProfessionalBookings = (professionalId) => {
    return bookings.filter(booking => booking.professionalId === professionalId);
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      addBooking,
      updateBookingStatus,
      updateBookingFeedback,
      getUserBookings,
      getProfessionalBookings,
    }}>
      {children}
    </BookingContext.Provider>
  );
};