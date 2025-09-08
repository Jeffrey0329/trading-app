import api from './api';
import { API_ENDPOINTS } from '../constants/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, userData);
      
      if (response.data.success && response.data.data?.token) {
        await AsyncStorage.setItem('userToken', response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Register error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, {
        email,
        password
      });
      
      if (response.data.success && response.data.data?.token) {
        await AsyncStorage.setItem('userToken', response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Login error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.USER_PROFILE);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Get profile error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  isLoggedIn: async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return !!token;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  },

  getToken: async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }
};