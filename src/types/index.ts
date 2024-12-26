export interface Facility {
  id: string;
  name: string;
  location: string;
  image: string;
  certifications: string[];
  doctors: Doctor[];
  reviews: Review[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  qualifications: string[];
  image?: string;
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MedicalProcedure {
  id: string;
  name: string;
  category: string;
  usPrice: number;
  internationalPrice: number;
  travelCost: number;
  facilityId: string;
}

export interface BookingSimulation {
  id: string;
  procedureId: string;
  facilityId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  date: string;
  totalCost: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  recentlyViewed: string[];
  bookings: BookingSimulation[];
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  date: string;
  read: boolean;
}

export interface TravelExpense {
  flights: number;
  accommodation: number;
  localTransportation: number;
  meals: number;
  additionalCosts: number;
} 