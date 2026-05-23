export interface VirtualPlan {
  title: string;
  price: string;
  priceNumeric: number;
  features: string[];
  popular?: boolean;
  description: string;
}

export interface SeatPlan {
  city: string;
  type: string;
  price: string;
  priceNumeric: number;
  image: string;
  features: string[];
}

export interface CityInfo {
  name: string;
  state: string;
  address: string;
  phone: string;
  email: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}
