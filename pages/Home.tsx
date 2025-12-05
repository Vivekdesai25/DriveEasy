import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { getCars } from '../services/api';

const Home: React.FC = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);

  useEffect(() => {
    getCars().then(cars => setFeaturedCars(cars.slice(0, 3)));
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-blue-700 rounded-3xl overflow-hidden shadow-xl text-white">
        <div className="absolute inset-0">
           <img 
            className="w-full h-full object-cover opacity-20"
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1600"
            alt="Driving Car"
           />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Find Your Perfect Ride
          </h1>
          <p className="max-w-xl text-xl text-blue-100 mb-10">
            Affordable, reliable, and comfortable cars for your journey. Book now and start your adventure with DriveEasy.
          </p>
          <Link
            to="/cars"
            className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            Browse Cars
          </Link>
        </div>
      </div>

      {/* Featured Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 px-4">Featured Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {featuredCars.map(car => (
             <div key={car._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
               <div className="h-48 w-full overflow-hidden">
                 <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover" />
               </div>
               <div className="p-6">
                 <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.name}</h3>
                      <p className="text-sm text-gray-500">{car.type}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      ${car.pricePerDay}/day
                    </span>
                 </div>
                 <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                    <span>{car.fuelType}</span>
                    <span>{car.transmission}</span>
                    <span>{car.seats} Seats</span>
                 </div>
                 <div className="mt-6">
                   <Link 
                    to={`/cars/${car._id}`}
                    className="block w-full text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
                   >
                     View Details
                   </Link>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;