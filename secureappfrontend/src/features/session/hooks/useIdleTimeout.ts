import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIdleWarning, clearIdleWarning } from '../slices/sessionSlice';
import { logout } from '../../auth/slices/authSlice';
import type { RootState, AppDispatch } from '../../../store/store';

const IDLE_TIMEOUT = 5 * 60 * 1000;
const WARNING_TIME = 4 * 60 * 1000;

export const useIdleTimeout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimers = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);

    dispatch(clearIdleWarning());

    if (!isAuthenticated) return;

    warningTimerRef.current = setTimeout(() => {
      dispatch(setIdleWarning(true));
    }, WARNING_TIME);

    idleTimerRef.current = setTimeout(() => {
      dispatch(logout());
      console.log('User logged out due to inactivity');
    }, IDLE_TIMEOUT);
  }, [dispatch, isAuthenticated]);

  const handleUserActivity = useCallback(() => {
    resetTimers();
  }, [resetTimers]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const events: Array<keyof DocumentEventMap> = [
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
      'click'
    ];

    events.forEach((event) =>
      document.addEventListener(event, handleUserActivity)
    );

    resetTimers();

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, handleUserActivity)
      );
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    };
  }, [isAuthenticated, handleUserActivity, resetTimers]);

  return { resetTimers };
};
