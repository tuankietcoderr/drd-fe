import {AccessTokenUtils, RefreshTokenUtils} from '@/utils/token-utils';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!state.user;
    },
    setTokens: (state, action) => {
      AccessTokenUtils.setToken(action.payload.accessToken);
      RefreshTokenUtils.setToken(action.payload.refreshToken);
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      AccessTokenUtils.removeToken();
      RefreshTokenUtils.removeToken();
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
