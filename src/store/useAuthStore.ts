// src/store/useAuthStore.ts
import { create } from 'zustand'

interface AuthState {
    user: { name: string; role: 'admin' | 'planner' | 'driver'; email?: string } | null
    login: (user: AuthState['user']) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
}))