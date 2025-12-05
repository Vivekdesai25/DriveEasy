import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBookings, getCars } from '../../services/api';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ cars: 0, bookings: 0, revenue: 0 });

  useEffect(() => {
    Promise.all([getCars(), getAllBookings()]).then(([cars, bookings]) => {
      const revenue = bookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, b) => sum + b.totalPrice, 0);
      
      setStats({
        cars: cars.length,
        bookings: bookings.length,
        revenue
      });
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Cars</h3>
          <p className="text-3xl font-bold mt-2">{stats.cars}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Bookings</h3>
          <p className="text-3xl font-bold mt-2">{stats.bookings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">${stats.revenue}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/cars" className="bg-white p-8 rounded-lg shadow hover:shadow-md transition flex items-center justify-between group">
          <div>
            <h3 className="text-xl font-bold group-hover:text-blue-600">Manage Cars</h3>
            <p className="text-gray-500 mt-2">Add, edit, or remove vehicles from the fleet.</p>
          </div>
          <span className="text-2xl text-gray-300 group-hover:text-blue-600">&rarr;</span>
        </Link>
        <Link to="/admin/bookings" className="bg-white p-8 rounded-lg shadow hover:shadow-md transition flex items-center justify-between group">
          <div>
            <h3 className="text-xl font-bold group-hover:text-blue-600">Manage Bookings</h3>
            <p className="text-gray-500 mt-2">View and update status of customer reservations.</p>
          </div>
          <span className="text-2xl text-gray-300 group-hover:text-blue-600">&rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;