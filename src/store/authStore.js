import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      register: async (name, email, password, phone) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`${API}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, phone })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          set({ user: data, token: data.token, isLoading: false });
          return { success: true };
        } catch (err) {
          set({ error: err.message, isLoading: false });
          return { success: false, error: err.message };
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          set({ user: data, token: data.token, isLoading: false });
          return { success: true };
        } catch (err) {
          set({ error: err.message, isLoading: false });
          return { success: false, error: err.message };
        }
      },

      logout: () => set({ user: null, token: null }),

      isAdmin: () => get().user?.role === 'admin',

      authHeaders: () => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${get().token}`
      })
    }),
    { name: 'desi-ghr-auth' }
  )
);
