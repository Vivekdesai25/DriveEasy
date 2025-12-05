import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCars from './pages/admin/ManageCars';
import ManageBookings from './pages/admin/ManageBookings';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="cars" element={<Cars />} />
            <Route path="cars/:id" element={<CarDetails />} />
            
            {/* User Protected Routes */}
            <Route element={<ProtectedRoute roles={['user', 'admin']} />}>
              <Route path="my-bookings" element={<MyBookings />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route path="admin" element={<ProtectedRoute roles={['admin']} />}>
              <Route index element={<AdminDashboard />} />
              <Route path="cars" element={<ManageCars />} />
              <Route path="bookings" element={<ManageBookings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;