import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, CarFilter } from '../types';
import { getCars } from '../services/api';

const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<CarFilter>({
    brand: '',
    type: '',
  });

  useEffect(() => {
    fetchCars();
  }, [filter]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const data = await getCars(filter);
      setCars(data);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mb-8">Available Cars</h1>
      
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              placeholder="e.g. Toyota"
              value={filter.brand}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="type"
              value={filter.type}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => setFilter({ brand: '', type: '' })}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12">Loading cars...</div>
      ) : cars.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No cars found matching your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div key={car._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition">
               <img src={car.imageUrl} alt={car.name} className="w-full h-48 object-cover" />
               <div className="p-4">
                 <div className="flex justify-between items-center mb-2">
                   <h3 className="text-lg font-bold">{car.brand} {car.name}</h3>
                   <span className="text-blue-600 font-bold">${car.pricePerDay}/day</span>
                 </div>
                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">{car.description}</p>
                 <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                   <span className="bg-gray-100 p-1 rounded text-center">{car.transmission}</span>
                   <span className="bg-gray-100 p-1 rounded text-center">{car.fuelType}</span>
                   <span className="bg-gray-100 p-1 rounded text-center">{car.seats} Seats</span>
                   <span className={`p-1 rounded text-center ${car.availabilityStatus === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                     {car.availabilityStatus === 'available' ? 'Available' : 'Booked'}
                   </span>
                 </div>
                 <Link 
                   to={`/cars/${car._id}`}
                   className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
                 >
                   Details & Rent
                 </Link>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;