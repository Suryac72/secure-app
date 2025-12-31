import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../auth/slices/authSlice';
import api from '../../../utils/axios.interceptor';
import type { RootState, AppDispatch } from '../../../store/store';

const SESSION_CHECK_INTERVAL = 60_000;

export const useSessionMonitor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const checkSession = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      await api.get('/api/auth/validate');
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.log('Session expired on server');
        dispatch(logout());
      }
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    checkSession();
    const intervalId = setInterval(checkSession, SESSION_CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, checkSession]);

  return { checkSession };
};
