import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // pinia store는 컴포넌트나 다른 로직 내부에서 사용될 때 활성화되므로
    // interceptor 실행 시점에는 안전하게 호출 가능
    const authStore = useAuthStore();
    const token = authStore.accessToken;
    
    // 토큰이 있으면 헤더에 추가
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
