import axios from 'axios';

// Use relative base so Vite dev server can proxy `/api` to the backend.
// During production this should be the real backend URL.
const API_BASE = '/api/v1';

const api = axios.create({
  baseURL: API_BASE,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Ensure headers object exists and set Authorization
    if (!config.headers) {
      // axios typings allow headers as any
      (config as any).headers = {};
    }
    (config as any).headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: handle 401 responses globally (remove token so UI can react)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(err);
  }
);

// Authentication API
export const authAPI = {
  signup: async (email: string, password: string, name: string) => {
    const [firstname, lastname] = name.split(' ').length > 1 ? name.split(' ', 2) : [name, ''];
    const response = await api.post('/auth/signup', { email, password, firstname, lastname });
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