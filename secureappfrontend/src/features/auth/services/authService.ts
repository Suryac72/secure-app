import api from '../../../utils/axios.interceptor';

interface LoginPayload {
  username: string;
  password: string;
}

export const authService = {
  login: (data: LoginPayload) =>
    api.post('/api/auth/login', data),

  refreshToken: (refreshToken: string) =>
    api.post('/api/auth/refresh', { refreshToken }),

  logout: () =>
    api.post('/api/auth/logout')
};

export default authService;
