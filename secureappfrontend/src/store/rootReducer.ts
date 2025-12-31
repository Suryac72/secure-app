import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slices/authSlice';
import sessionReducer from '../features/session/slices/sessionSlice';
import dashboardReducer from '../features/dashboard/slices/dashboardSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  session: sessionReducer,
  dashboard: dashboardReducer
});

export default rootReducer;
