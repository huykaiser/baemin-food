// File: api.js
// API service for handling network requests

const API_BASE_URL = 'http://localhost:8080';

// General fetch wrapper with error handling
async function fetchWithErrorHandling(url, options = {}) {
  try {
    console.log(`Making API request to: ${url}`, options);
    const response = await fetch(url, options);
    
    // For non-JSON responses or empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return { data, response };
    } else {
      const text = await response.text();
      return { 
        data: text ? { message: text } : { message: 'No response body' },
        response 
      };
    }
  } catch (error) {
    console.error(`API Error with ${url}:`, error);
    throw error;
  }
}

// Auth related API calls
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  },
  
  // Login user
  login: async (credentials) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  },
  
  // Verify JWT token
  verifyToken: async (token) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/auth/verify?token=${token}`, {
      method: 'POST',
    });
  },
};

// Other API services can be added here

export default {
  auth: authAPI,  // Add other API categories here as needed
};

// Food related API calls
export const foodAPI = {
  // Get all foods
  getAll: async () => {
    return fetchWithErrorHandling(`${API_BASE_URL}/foods/get-all-mysql`);
  },
  
  // Get foods by category ID
  getByCategory: async (categoryId) => {
    console.log(`Fetching foods for category ID: ${categoryId}`);
    return fetchWithErrorHandling(`${API_BASE_URL}/foods/category/${categoryId}`);
  },
  
  // Search foods with filters
  searchFoods: async (searchParams) => {
    const queryString = new URLSearchParams(searchParams).toString();
    return fetchWithErrorHandling(`${API_BASE_URL}/foods/search?${queryString}`);
  },
  
  // Get a single food item by ID
  getById: async (id) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/foods/${id}`);
  }
};

// Categories related API calls
export const categoryAPI = {
  // Get all categories
  getAll: async () => {
    return fetchWithErrorHandling(`${API_BASE_URL}/categories`);
  },
  
  // Get category by ID
  getById: async (id) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/categories/${id}`);
  },
  
  // Get category by name
  getByName: async (name) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/categories/by-name/${encodeURIComponent(name)}`);
  }
};