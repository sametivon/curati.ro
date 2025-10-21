export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  user_type: 'client' | 'cleaner';
  created_at: string;
  updated_at: string;
}

export interface Cleaner {
  id: string;
  user_id: string;
  bio: string;
  hourly_rate: number;
  city: string;
  rating: number;
  total_reviews: number;
  verified: boolean;
  created_at: string;
  profiles?: Profile;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'home' | 'office' | 'garden';
  icon: string;
  created_at: string;
}

export interface Booking {
  id: string;
  client_id: string;
  cleaner_id: string;
  service_id: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  task_details: string;
  created_at: string;
  cleaners?: Cleaner;
  services?: Service;
  profiles?: Profile;
}

export interface Review {
  id: string;
  booking_id: string;
  cleaner_id: string;
  client_id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles?: Profile;
}

export const ROMANIAN_CITIES = [
  'București',
  'Cluj-Napoca',
  'Timișoara',
  'Iași',
  'Constanța',
  'Craiova',
  'Brașov',
  'Galați',
  'Ploiești',
  'Oradea',
];
