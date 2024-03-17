// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', true);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', true);
    },
    // Additional action for checking authentication status from localStorage
    checkAuthentication: (state) => {
      const user = localStorage.getItem('user');
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (user && isAuthenticated) {
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
  },
});

export const { login, logout, register, checkAuthentication } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
