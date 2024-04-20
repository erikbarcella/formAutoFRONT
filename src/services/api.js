// api.js
import axios from 'axios';
import {getTokenLocal, removeTokenLocal } from '../context/Auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});
// Interceptor para incluir o token nas solicitações
// api.interceptors.request.use((config) => {
//   const token = getTokenLocal();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Interceptor para tratar erros
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       removeTokenLocal();
//       window.location.reload();
//     }
//     return Promise.reject(error);
//   });

export default api;