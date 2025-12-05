import React, { useEffect, useState } from 'react';
import { Car } from '../../types';
import { getCars, createCar, updateCar, deleteCar } from '../../services/api';

const ManageCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Car>>({
    name: '', brand: '', type: 'Sedan', seats: 4, fuelType: 'Petrol',
    transmission: 'Manual', pricePerDay: 0, imageUrl: '', location: '', description: ''
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => getCars().then(setCars);

  const handleOpenModal = (car?: Car) => {
    if (car) {
      setEditingCar(car);
      setFormData(car);
    } else {
      setEditingCar(null);
      setFormData({
        name: '', brand: '', type: 'Sedan', seats: 4, fuelType: 'Petrol',
        transmission: 'Manual', pricePerDay: 0, imageUrl: '', location: '', description: '',
        availabilityStatus: 'available'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCar) {
      await updateCar(editingCar._id, formData);
    } else {
      await createCar(formData as any);
    }
    setIsModalOpen(false);
    fetchCars();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this car?')) {
      await deleteCar(id);
      fetchCars();
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Cars</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Car
        </button>
      </div>

      <div className="bg-white shadow overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map(car => (
              <tr key={car._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full object-cover" src={car.imageUrl} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{car.brand} {car.name}</div>
                      <div className="text-sm text-gray-500">{car.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${car.pricePerDay}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                     car.availabilityStatus === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                   }`}>
                     {car.availabilityStatus}
                   </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleOpenModal(car)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(car._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingCar ? 'Edit Car' : 'Add New Car'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Brand" 
                  value={formData.brand} 
                  onChange={e => setFormData({...formData, brand: e.target.value})}
                  className="border p-2 rounded" required
                />
                <input 
                  placeholder="Name" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="border p-2 rounded" required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select 
                  value={formData.type} 
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="border p-2 rounded"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                </select>
                <input 
                  type="number" 
                  placeholder="Price Per Day" 
                  value={formData.pricePerDay} 
                  onChange={e => setFormData({...formData, pricePerDay: Number(e.target.value)})}
                  className="border p-2 rounded" required
                />
              </div>
              <input 
                  placeholder="Image URL" 
                  value={formData.imageUrl} 
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="border p-2 rounded w-full" required
              />
              <textarea 
                  placeholder="Description" 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="border p-2 rounded w-full" rows={3}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;