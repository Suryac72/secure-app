import api from '../../../utils/axios.interceptor';

export const dashboardService = {
  fetchStats: () => api.get('/api/dashboard/stats'),
  fetchActivity: () => api.get('/api/dashboard/activity')
};
