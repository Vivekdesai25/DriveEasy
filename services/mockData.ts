import { Car, User } from '../types';

export const INITIAL_CARS: Car[] = [
  {
    _id: '1',
    name: 'Swift Dzire',
    brand: 'Maruti Suzuki',
    type: 'Sedan',
    seats: 5,
    fuelType: 'Petrol',
    transmission: 'Manual',
    pricePerDay: 45,
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    availabilityStatus: 'available',
    location: 'New York',
    description: 'A comfortable and economical sedan perfect for city driving.'
  },
  {
    _id: '2',
    name: 'Innova Crysta',
    brand: 'Toyota',
    type: 'SUV',
    seats: 7,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    pricePerDay: 85,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    availabilityStatus: 'available',
    location: 'New York',
    description: 'Premium MPV with ample space for family trips.'
  },
  {
    _id: '3',
    name: 'City',
    brand: 'Honda',
    type: 'Sedan',
    seats: 5,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    pricePerDay: 55,
    imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800',
    availabilityStatus: 'available',
    location: 'Los Angeles',
    description: 'Sleek design and smooth performance for a premium experience.'
  },
  {
    _id: '4',
    name: 'Model 3',
    brand: 'Tesla',
    type: 'Sedan',
    seats: 5,
    fuelType: 'EV',
    transmission: 'Automatic',
    pricePerDay: 120,
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
    availabilityStatus: 'unavailable',
    location: 'San Francisco',
    description: 'Experience the future with this high-performance electric vehicle.'
  },
  {
    _id: '5',
    name: 'Mustang',
    brand: 'Ford',
    type: 'Coupe',
    seats: 4,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    pricePerDay: 150,
    imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800',
    availabilityStatus: 'available',
    location: 'Miami',
    description: 'Iconic american muscle car for those who love power.'
  }
];

// Admin user for testing
export const INITIAL_ADMIN: User = {
  _id: 'admin_123',
  name: 'Admin User',
  email: 'admin@rental.com',
  phone: '1234567890',
  role: 'admin',
  token: 'mock_admin_token'
};