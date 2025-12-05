export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  token?: string;
}

export interface Car {
  _id: string;
  name: string;
  brand: string;
  type: string;
  seats: number;
  fuelType: string;
  transmission: string;
  pricePerDay: number;
  imageUrl: string;
  availabilityStatus: 'available' | 'unavailable';
  location: string;
  description: string;
}

export interface Booking {
  _id: string;
  user: User | string; // Populated or ID
  car: Car | string;   // Populated or ID
  startDate: string;   // ISO Date string
  endDate: string;     // ISO Date string
  pickupLocation: string;
  dropLocation: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CarFilter {
  brand?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
}