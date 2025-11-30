// src/layouts/DashboardLayout.tsx
import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, Truck, MapPin, BarChart3, Settings, LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuthStore } from '@/store/useAuthStore'
import { cn } from '@/lib/utils'

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Órdenes', path: '/orders' },
    { icon: Truck, label: 'Flota', path: '/fleet' },
    { icon: MapPin, label: 'Rutas', path: '/routes' },
    { icon: BarChart3, label: 'Reportes', path: '/reports' },
    { icon: Settings, label: 'Configuración', path: '/settings' },
]

export function DashboardLayout() {
    const location = useLocation()
    const { user, logout } = useAuthStore()

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                RutaOptima
                            </h1>
                            <p className="text-xs text-muted-foreground">Logística Inteligente</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t">
                    <Link to="/profile" className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-lg transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                            {user?.name.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                        </div>
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full mt-2 flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-lg transition-colors text-sm text-muted-foreground"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6 justify-between sticky top-0 z-10">
                    <div>
                        <h2 className="font-semibold text-lg">
                            {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                    </div>
                </header>
                <div className="p-6 flex-1 overflow-auto bg-muted/30">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
