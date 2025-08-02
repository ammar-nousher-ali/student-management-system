import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/signin', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/signup', { name, email, password, role: "teacher" }),
};

// Students API calls
export const studentsAPI = {
  getAll: (params?: any) => api.get('/students', { params }),
  getById: (id: string) => api.get(`/students/${id}`),
  create: (data: any) => api.post('/students', data),
  update: (id: string, data: any) => api.put(`/students/${id}`, data),
  delete: (id: string) => api.delete(`/students/${id}`),
  search: (query: string) => api.get(`/students/search?q=${query}`),
  createBatch: (data: any[]) => api.post('/students/batch', data),
};

// Dashboard API calls - Note: Your backend doesn't have dashboard stats endpoint
// We'll use mock data for now
export const dashboardAPI = {
  getStats: () => Promise.resolve({
    data: {
      totalStudents: 150,
      activeStudents: 142,
      newStudentsThisMonth: 12,
      averageAge: 16.5
    }
  }),
};

export default api; 