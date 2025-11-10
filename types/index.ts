// Film Types
export interface Film {
  id?: string;
  title: string;
  producer: string;
  director: string;
  image: string;
  description: string;
  trailerUrl?: string; // YouTube URL
  category: "Commercial" | "Documentary";
  createdAt?: Date;
  updatedAt?: Date;
}

// Creative Direction Types
export interface CreativeDirection {
  id?: string;
  name: string;
  description: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Photography Types
export interface Photography {
  id?: string;
  image: string;
  description: string;
  category: string; // Fashion, Street, Nature, Food, Architecture, Lifestyle, Sports, Product, etc.
  year?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Event Types
export interface Event {
  id?: string;
  title: string;
  image: string;
  description: string;
  location?: string;
  date?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Category Types
export type FilmCategory = "All" | "Commercial" | "Documentary";

export type PhotoCategory = 
  | "All" 
  | "Fashion" 
  | "Street" 
  | "Nature" 
  | "Food" 
  | "Architecture" 
  | "Lifestyle" 
  | "Sports" 
  | "Product";

// Blog Types
export interface Blog {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Contact Message Types
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt?: Date;
}

