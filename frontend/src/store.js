import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import storeReducer from './slices/storesSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    stores: storeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
