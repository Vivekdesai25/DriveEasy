/**
 * NOTE: This file mocks a real backend API using LocalStorage so the app works in the browser preview.
 * For a real production app, you would replace these Promise implementations with fetch/axios calls
 * to your Node.js backend.
 */

import { User, Car, Booking, CarFilter } from '../types';
import { INITIAL_CARS, INITIAL_ADMIN } from './mockData';

const DELAY = 500; // Simulate network latency

const getFromStorage = <T>(key: string, defaultVal: T): T => {
  const item = localStorage.getItem(key);
  if (!item) return defaultVal;
  try {
    return JSON.parse(item);
  } catch {
    return defaultVal;
  }
};

const setStorage = (key: string, val: any) => {
  localStorage.setItem(key, JSON.stringify(val));
};

// Initialize Data
if (!localStorage.getItem('cars')) setStorage('cars', INITIAL_CARS);
if (!localStorage.getItem('users')) setStorage('users', [INITIAL_ADMIN]);
if (!localStorage.getItem('bookings')) setStorage('bookings', []);

// --- Auth Services ---

export const register = async (userData: Omit<User, '_id' | 'role'> & { password: string }): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getFromStorage<User[]>('users', []);
      if (users.find(u => u.email === userData.email)) {
        reject(new Error('Email already exists'));
        return;
      }
      
      // Destructure password out to avoid assigning it to User type
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userFields } = userData;
      
      const newUser: User = {
        ...userFields,
        _id: Math.random().toString(36).substr(2, 9),
        role: 'user',
        token: `mock_token_${Math.random()}`
      };
      users.push(newUser);
      setStorage('users', users);
      resolve(newUser);
    }, DELAY);
  });
};

export const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real app, password would be hashed. Here we just accept any password for demo if email matches.
      // Special check for admin hardcoded in mockData
      if (email === INITIAL_ADMIN.email && password === 'admin123') {
        resolve(INITIAL_ADMIN);
        return;
      }

      const users = getFromStorage<User[]>('users', []);
      const user = users.find(u => u.email === email);
      
      if (!user) {
        reject(new Error('Invalid credentials'));
        return;
      }
      // Simulating password check (accepting any password for non-admin users in this mock)
      user.token = `mock_token_${Math.random()}`;
      resolve(user);
    }, DELAY);
  });
};

// --- Car Services ---

export const getCars = async (filters?: CarFilter): Promise<Car[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let cars = getFromStorage<Car[]>('cars', []);
      if (filters) {
        if (filters.brand) cars = cars.filter(c => c.brand.toLowerCase().includes(filters.brand!.toLowerCase()));
        if (filters.type) cars = cars.filter(c => c.type.toLowerCase() === filters.type!.toLowerCase());
        if (filters.minPrice) cars = cars.filter(c => c.pricePerDay >= filters.minPrice!);
        if (filters.maxPrice) cars = cars.filter(c => c.pricePerDay <= filters.maxPrice!);
      }
      resolve(cars);
    }, DELAY);
  });
};

export const getCarById = async (id: string): Promise<Car | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cars = getFromStorage<Car[]>('cars', []);
      resolve(cars.find(c => c._id === id));
    }, DELAY);
  });
};

export const createCar = async (carData: Omit<Car, '_id'>): Promise<Car> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cars = getFromStorage<Car[]>('cars', []);
      const newCar = { ...carData, _id: Math.random().toString(36).substr(2, 9) };
      cars.push(newCar);
      setStorage('cars', cars);
      resolve(newCar);
    }, DELAY);
  });
};

export const updateCar = async (id: string, carData: Partial<Car>): Promise<Car> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cars = getFromStorage<Car[]>('cars', []);
      const index = cars.findIndex(c => c._id === id);
      if (index === -1) {
        reject(new Error('Car not found'));
        return;
      }
      cars[index] = { ...cars[index], ...carData };
      setStorage('cars', cars);
      resolve(cars[index]);
    }, DELAY);
  });
};

export const deleteCar = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let cars = getFromStorage<Car[]>('cars', []);
      cars = cars.filter(c => c._id !== id);
      setStorage('cars', cars);
      resolve();
    }, DELAY);
  });
};

// --- Booking Services ---

export const createBooking = async (bookingData: Partial<Booking>): Promise<Booking> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bookings = getFromStorage<Booking[]>('bookings', []);
      const newBooking = {
        ...bookingData,
        _id: Math.random().toString(36).substr(2, 9),
        status: 'pending' as const,
        createdAt: new Date().toISOString()
      } as Booking;
      bookings.push(newBooking);
      setStorage('bookings', bookings);
      resolve(newBooking);
    }, DELAY);
  });
};

export const getMyBookings = async (userId: string): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bookings = getFromStorage<Booking[]>('bookings', []);
      const cars = getFromStorage<Car[]>('cars', []);
      
      // Populate car details manually for mock
      const userBookings = bookings
        .filter(b => (typeof b.user === 'string' ? b.user : b.user._id) === userId)
        .map(b => ({
          ...b,
          car: cars.find(c => c._id === (typeof b.car === 'string' ? b.car : b.car._id)) || b.car
        }));
        
      resolve(userBookings);
    }, DELAY);
  });
};

export const getAllBookings = async (): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bookings = getFromStorage<Booking[]>('bookings', []);
      const cars = getFromStorage<Car[]>('cars', []);
      const users = getFromStorage<User[]>('users', []);

      // Populate manually
      const populated = bookings.map(b => ({
        ...b,
        car: cars.find(c => c._id === (typeof b.car === 'string' ? b.car : b.car._id)) || b.car,
        user: users.find(u => u._id === (typeof b.user === 'string' ? b.user : b.user._id)) || b.user
      }));

      resolve(populated);
    }, DELAY);
  });
};

export const updateBookingStatus = async (id: string, status: 'confirmed' | 'cancelled'): Promise<Booking> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const bookings = getFromStorage<Booking[]>('bookings', []);
      const index = bookings.findIndex(b => b._id === id);
      if (index === -1) {
        reject(new Error('Booking not found'));
        return;
      }
      bookings[index].status = status;
      setStorage('bookings', bookings);
      resolve(bookings[index]);
    }, DELAY);
  });
};