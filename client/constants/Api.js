export const API_BASE_URL = __DEV__ 
  ? process.env.EXPO_PUBLIC_DEV_API_URL // Development IP
  : process.env.EXPO_PUBLIC_PROD_API_URL; // Production IP

export const API_ENDPOINTS = {
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  USER_PROFILE: '/api/auth/profile',
};