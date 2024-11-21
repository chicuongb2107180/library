import { defineStore } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';

export const useAuthStore = defineStore('auth', {
        state: () => ({
                token: null,
                username: null,
                role: null,
                userId: null,
        }),
        actions: {
                setAuthData({ token, username, role, userId }) {
                        this.token = token;
                        this.username = username;
                        this.role = role;
                        this.userId = userId;
                },
                clearAuthData() {
                        this.token = null;
                        this.username = null;
                        this.role = null;
                        this.userId = null;
                },
        },
        persist: true,  
});
