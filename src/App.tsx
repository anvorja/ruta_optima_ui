// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { MainLayout } from '@/components/layout/MainLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Dashboard } from '@/pages/Dashboard'
import { Login } from '@/pages/Login'
import { Orders } from '@/pages/Orders'
import { Fleet } from '@/pages/Fleet'
import { Routes as RoutesPage } from '@/pages/Routes'
import { Reports } from '@/pages/Reports'
import { Analytics } from '@/pages/Analytics'
import { Settings } from '@/pages/Settings'
import { Profile } from '@/pages/Profile'
import { LiveMap } from '@/pages/LiveMap'
import { useAuthStore } from '@/store/useAuthStore'
import * as React from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const user = useAuthStore((state) => state.user)
    if (!user) return <Navigate to="/auth/login" replace />
    return <>{children}</>
}

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="rutaoptima-theme">
            <BrowserRouter>
                <Routes>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route path="login" element={<Login />} />
                    </Route>

                    <Route path="/" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Dashboard />
                            </MainLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/orders" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Orders />
                            </MainLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/fleet" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Fleet />
                            </MainLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/routes" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <RoutesPage />
                            </MainLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/live-map" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <LiveMap />
                            </MainLayout>
                        </ProtectedRoute>
                    } />


                    <Route path="/reports" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Reports />
                            </MainLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/analytics" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Analytics />
                            </MainLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Settings />
                            </MainLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Profile />
                            </MainLayout>
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App