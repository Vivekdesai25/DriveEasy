import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Car } from '../types';
import { getCarById, createBooking } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Booking Form State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      getCarById(id).then(c => {
        setCar(c || null);
        setLoading(false);
      });
    }
  }, [id]);

  const calculateTotal = () => {
    if (!startDate || !endDate || !car) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * car.pricePerDay : 0;
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!user) {
      navigate('/login');
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      setError('End date must be after start date');
      return;
    }
    if(!car) return;

    try {
      await createBooking({
        user: user._id,
        car: car._id,
        startDate,
        endDate,
        pickupLocation,
        dropLocation,
        totalPrice: calculateTotal()
      });
      navigate('/my-bookings');
    } catch (err) {
      setError('Failed to book car');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!car) return <div className="p-8 text-center">Car not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Link to="/cars" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Cars</Link>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="h-96 md:h-auto">
          <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
               <h1 className="text-3xl font-bold text-gray-900">{car.brand} {car.name}</h1>
               <p className="text-gray-500 mt-1">{car.type} • {car.location}</p>
            </div>
            <div className="text-right">
              <span className="block text-3xl font-bold text-blue-600">${car.pricePerDay}</span>
              <span className="text-gray-500 text-sm">/day</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 p-3 rounded">
              <span className="block text-xs text-gray-500">Transmission</span>
              <span className="font-medium">{car.transmission}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <span className="block text-xs text-gray-500">Fuel</span>
              <span className="font-medium">{car.fuelType}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <span className="block text-xs text-gray-500">Seats</span>
              <span className="font-medium">{car.seats} Person</span>
            </div>
             <div className="bg-gray-50 p-3 rounded">
              <span className="block text-xs text-gray-500">Status</span>
              <span className={`font-medium ${car.availabilityStatus === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                {car.availabilityStatus === 'available' ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>

          <p className="mt-6 text-gray-600">{car.description}</p>

          <hr className="my-6 border-gray-200" />

          {/* Booking Form */}
          {car.availabilityStatus === 'available' ? (
            <form onSubmit={handleBooking} className="space-y-4">
              <h3 className="text-lg font-bold">Book this Car</h3>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">From</label>
                  <input 
                    type="date" 
                    required 
                    className="w-full border rounded p-2"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">To</label>
                  <input 
                    type="date" 
                    required 
                    className="w-full border rounded p-2"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700">Pickup</label>
                   <input 
                    type="text" 
                    placeholder="City/Locality"
                    required
                    className="w-full border rounded p-2"
                    value={pickupLocation}
                    onChange={e => setPickupLocation(e.target.value)}
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700">Dropoff</label>
                   <input 
                    type="text" 
                    placeholder="City/Locality"
                    required
                    className="w-full border rounded p-2"
                    value={dropLocation}
                    onChange={e => setDropLocation(e.target.value)}
                   />
                </div>
              </div>

              {startDate && endDate && (
                <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                  <span className="font-medium text-blue-800">Total Price:</span>
                  <span className="text-xl font-bold text-blue-800">${calculateTotal()}</span>
                </div>
              )}

              {user ? (
                 <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition">
                   Confirm Booking
                 </button>
              ) : (
                <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-center">
                  Please <Link to="/login" className="underline font-bold">Login</Link> to book this car.
                </div>
              )}
            </form>
          ) : (
             <button disabled className="w-full bg-gray-300 text-gray-500 py-3 rounded font-bold cursor-not-allowed">
               Currently Unavailable
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;