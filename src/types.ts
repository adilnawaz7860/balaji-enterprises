export type VehicleCategory = 'car' | 'auto' | 'mini-truck';

export interface Vehicle {
  id: string;
  category: VehicleCategory;
  make: string;
  model: string;
  year: number;
  price: number; // in INR (Lakhs or Rupees)
  mileage: number; // in km
  fuelType: string;
  transmission: string;
  engine: string;
  description: {
    en: string;
    hi: string;
  };
  features: {
    en: string[];
    hi: string[];
  };
  image: string; // CDN or beautiful CSS or placeholder
  images?: string[]; // Optional array of supporting images for slider
  status: 'available' | 'sold';
}

export type Language = 'en' | 'hi';
export type Theme = 'dark' | 'light';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleId?: string;
  message: string;
  createdAt: string;
}
