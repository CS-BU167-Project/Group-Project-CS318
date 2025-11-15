import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/v1'; // Spring Boot backend

const api = axios.create({
  baseURL: API_BASE,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication API
export const authAPI = {
  signup: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/signup', { email, password, name });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
  signin: async (email: string, password: string) => {
    const response = await api.post('/auth/signin', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
};

// Expense API
export const expenseAPI = {
  getAllExpenses: async () => {
    const response = await api.get('/expenses');
    return response.data;
  },
  getExpenseById: async (id: number) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },
  createExpense: async (expense: any) => {
    const response = await api.post('/expenses', expense);
    return response.data;
  },
  updateExpense: async (id: number, expense: any) => {
    const response = await api.put(`/expenses/${id}`, expense);
    return response.data;
  },
  deleteExpense: async (id: number) => {
    await api.delete(`/expenses/${id}`);
  },
};

// Report API
export const reportAPI = {
  getDailyReport: async (userId: number) => {
    const response = await api.get('/reports/daily', { params: { userId } });
    return response.data;
  },
  getWeeklyReport: async (userId: number) => {
    const response = await api.get('/reports/weekly', { params: { userId } });
    return response.data;
  },
  getMonthlyReport: async (userId: number) => {
    const response = await api.get('/reports/monthly', { params: { userId } });
    return response.data;
  },
  getSummary: async (userId: number) => {
    const response = await api.get('/reports/summary', { params: { userId } });
    return response.data;
  },
};

export default api;