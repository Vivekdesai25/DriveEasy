import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Booking, Car } from '../types';
import { getMyBookings, updateBookingStatus } from '../services/api';

const MyBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = () => {
    if(user) {
      getMyBookings(user._id).then(data => {
        setBookings(data.reverse()); // Newest first
        setLoading(false);
      });
    }
  };

  const handleCancel = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      await updateBookingStatus(id, 'cancelled');
      fetchBookings();
    }
  };

  if (loading) return <div className="p-8 text-center">Loading bookings...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white p-8 rounded shadow text-center text-gray-500">
          You haven't made any bookings yet.
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => {
            const car = booking.car as Car;
            return (
              <div key={booking._id} className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4 h-32 bg-gray-200 rounded overflow-hidden">
                   {car ? (
                     <img src={car.imageUrl} className="w-full h-full object-cover" alt="Car" />
                   ) : (
                     <div className="flex items-center justify-center h-full">Car Deleted</div>
                   )}
                </div>
                <div className="flex-1">
                   <div className="flex justify-between">
                      <h3 className="text-xl font-bold">{car ? `${car.brand} ${car.name}` : 'Unknown Car'}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                   </div>
                   <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                      <div>
                        <span className="block text-gray-400 text-xs">Pickup</span>
                        <p>{booking.pickupLocation}</p>
                        <p className="font-medium">{new Date(booking.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="block text-gray-400 text-xs">Dropoff</span>
                        <p>{booking.dropLocation}</p>
                        <p className="font-medium">{new Date(booking.endDate).toLocaleDateString()}</p>
                      </div>
                   </div>
                   <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total: ${booking.totalPrice}</span>
                      {booking.status !== 'cancelled' && (
                        <button 
                          onClick={() => handleCancel(booking._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                        >
                          Cancel Booking
                        </button>
                      )}
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;