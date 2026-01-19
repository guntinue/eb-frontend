import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import { decodeJwt } from '@/utils/jwt'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    userRole: null,
    accessToken: null
  }),
  actions: {
    initialize() {
      const token = getToken();
      if (token) {
        this.accessToken = token;
        this.isLogin = true;
        this.parseRole(token);
      }
    },
    login(token) {
      this.accessToken = token;
      this.isLogin = true;
      setToken(token); // Persist to cookie/localStorage
      this.parseRole(token);
    },
    logout() {
      this.accessToken = null;
      this.isLogin = false;
      this.userRole = null;
      removeToken();
    },
    parseRole(token) {
      try {
        const decoded = decodeJwt(token);
        if (decoded && decoded.memberRole && decoded.memberRole[0]) {
          this.userRole = decoded.memberRole[0].authority.authorityName;
        }
      } catch (error) {
        console.error("Token decode error:", error);
        this.userRole = null;
      }
    },
    // Deprecated but kept for compatibility if needed elsewhere temporarily
    checkLoginStatus() {
      this.initialize();
    }
  }
})

