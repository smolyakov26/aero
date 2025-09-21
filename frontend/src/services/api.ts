// API base URL - adjust this to match your Django backend URL
const API_BASE_URL = 'http://127.0.0.1:8000/api/';

// Generic fetch function with improved error handling
async function fetchFromAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    console.log(`Fetching from ${API_BASE_URL}${endpoint}`);

    // Add timeout to fetch requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('Network error: API server may be down or unreachable');
      throw new Error('API_UNAVAILABLE');
    } else if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Request timeout: API request took too long to respond');
      throw new Error('API_TIMEOUT');
    } else {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

// Product interfaces
export interface ProductImage {
  src: string;
  alt: string;
}

export interface Instructor {
  name: string;
  role: string;
  experience: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  price: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  requirements: string[];
  includes: string[];
  mainImage: string;
  gallery: ProductImage[];
  instructors: Instructor[];
  faq: FAQ[];
}

// Booking form interface
export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  comments: string;
  service: string;
}

// API functions
export const api = {
  // Get all products
  getProducts: () => fetchFromAPI<Product[]>('/products/'),

  // Get a single product by slug
  getProductBySlug: (slug: string) => fetchFromAPI<Product>(`/products/${slug}/`),

  // Submit booking form
  submitBooking: (formData: BookingFormData) =>
    fetchFromAPI('/bookings/', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),

  // Get related products (excluding current product)
  getRelatedProducts: (currentSlug: string) =>
    fetchFromAPI<Product[]>(`/products/related/${currentSlug}/`),
};
