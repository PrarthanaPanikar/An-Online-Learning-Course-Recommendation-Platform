import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const courseAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  getCategories: () => api.get('/courses/categories'),
};

export const enrollmentAPI = {
  enroll: (courseId) => api.post('/enrollments', { courseId }),
  getMy: () => api.get('/enrollments/my'),
  getByCourse: (courseId) => api.get(`/enrollments/course/${courseId}`),
};

export const progressAPI = {
  update: (data) => api.put('/progress', data),
  getByCourse: (courseId) => api.get(`/progress/${courseId}`),
  getAll: () => api.get('/progress/my'),
};

export const recommendationAPI = {
  home: (limit = 12) => api.get('/recommendations/home', { params: { limit } }),
  similar: (courseId, limit = 8) =>
    api.get(`/recommendations/similar/${courseId}`, { params: { limit } }),
  skillGap: (limit = 10) => api.get('/recommendations/skill-gap', { params: { limit } }),
};

export const interactionAPI = {
  track: (courseId, event, meta) =>
    api.post('/interactions', { courseId, event, meta }),
};

export default api;
