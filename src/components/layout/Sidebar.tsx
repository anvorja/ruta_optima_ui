// src/components/layout/Sidebar.tsx
import { NavLink } from "@/components/NavLink"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Route,
    Package,
    Truck,
    MapPin,
    BarChart3,
    Settings,
    X,
    Zap,
    ChevronLeft,
    ChevronRight,
    User,
    LogOut,
    Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { useNavigate } from "react-router-dom"

const menuItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Planificar Rutas", url: "/routes", icon: Route, badge: "IA" },
    { title: "Órdenes", url: "/orders", icon: Package, count: 24 },
    { title: "Flota", url: "/fleet", icon: Truck },
    { title: "Mapa en Vivo", url: "/live-map", icon: MapPin, live: true },
    { title: "Analíticas", url: "/analytics", icon: BarChart3 },
    { title: "Configuración", url: "/settings", icon: Settings },
]

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false)
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    const handleNavigation = (path: string) => {
        navigate(path)
        onClose?.()
    }

    return (
        <>
            {/* Mobile sidebar */}
            {isOpen && (
                <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar flex flex-col md:hidden">
                    {/* Logo */}
                    <div className="flex h-14 sm:h-16 items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
                                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">RutaOptima</span>
                                <span className="text-[10px] text-muted-foreground">Logistics AI</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-3 overflow-y-auto smooth-scroll">
                        {menuItems.map((item, index) => (
                            <NavLink
                                key={item.url}
                                to={item.url}
                                onClick={onClose}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                activeClassName="bg-sidebar-accent text-sidebar-primary"
                                style={{
                                    animation: `fade-up 0.3s ease-out ${index * 0.05}s forwards`,
                                    opacity: 0
                                }}
                            >
                                <item.icon className={cn("h-5 w-5 shrink-0", item.live && "text-success animate-pulse")} />
                                <span className="flex-1">{item.title}</span>
                                {item.badge && (
                                    <Badge variant="secondary" className="bg-primary/20 text-primary text-[10px] px-1.5">
                                        {item.badge}
                                    </Badge>
                                )}
                                {item.count && (
                                    <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] px-1.5">
                                        {item.count}
                                    </Badge>
                                )}
                                {item.live && (
                                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Profile */}
                    <div className="p-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                        {user?.name.charAt(0) || 'U'}
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-sm font-medium truncate text-sidebar-foreground">{user?.name || 'Usuario'}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user?.email || 'usuario@rutaoptima.com'}</p>
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="end" className="w-56 ml-2">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name || 'Usuario'}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user?.email || 'usuario@rutaoptima.com'}</p>
                                        <p className="text-xs leading-none text-muted-foreground capitalize">{user?.role || 'admin'}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleNavigation('/profile')} className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Mi Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleNavigation('/settings')} className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Configuración</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleNavigation('/settings')} className="cursor-pointer">
                                    <Bell className="mr-2 h-4 w-4" />
                                    <span>Notificaciones</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </aside>
            )}

            {/* Desktop sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col bg-sidebar transition-all duration-300 relative",
                    collapsed ? "w-[72px]" : "w-64"
                )}
            >
                {/* Toggle Button - Flecha en el borde derecho */}
                <button
                    onClick={toggleCollapse}
                    className={cn(
                        "absolute -right-3 top-20 z-50",
                        "h-6 w-6 flex items-center justify-center rounded-full",
                        "border border-border bg-background shadow-md",
                        "hover:bg-accent transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    )}
                    aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4 text-foreground" />
                    ) : (
                        <ChevronLeft className="h-4 w-4 text-foreground" />
                    )}
                </button>

                {/* Logo */}
                <div className="flex h-14 sm:h-16 items-center justify-center px-4">
                    {!collapsed ? (
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
                                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">RutaOptima</span>
                                <span className="text-[10px] text-muted-foreground">Logistics AI</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
                            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-3 overflow-y-auto smooth-scroll">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={item.url}
                            to={item.url}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                collapsed && "justify-center px-2"
                            )}
                            activeClassName="bg-sidebar-accent text-sidebar-primary"
                            style={{
                                animation: `fade-up 0.3s ease-out ${index * 0.05}s forwards`,
                                opacity: 0
                            }}
                        >
                            <item.icon className={cn("h-5 w-5 shrink-0", item.live && "text-success animate-pulse")} />

                            {!collapsed && (
                                <>
                                    <span className="flex-1">{item.title}</span>
                                    {item.badge && (
                                        <Badge variant="secondary" className="bg-primary/20 text-primary text-[10px] px-1.5">
                                            {item.badge}
                                        </Badge>
                                    )}
                                    {item.count && (
                                        <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] px-1.5">
                                            {item.count}
                                        </Badge>
                                    )}
                                    {item.live && (
                                        <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile in Footer */}
                <div className="p-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
                                    "hover:bg-sidebar-accent transition-colors",
                                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                    collapsed && "justify-center px-2"
                                )}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                    {user?.name.charAt(0) || 'U'}
                                </div>
                                {!collapsed && (
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-sm font-medium truncate text-sidebar-foreground">
                                            {user?.name || 'Usuario'}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {user?.email || 'usuario@rutaoptima.com'}
                                        </p>
                                    </div>
                                )}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="right"
                            align="end"
                            className="w-56 ml-2"
                        >
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.name || 'Usuario'}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email || 'usuario@rutaoptima.com'}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground capitalize">
                                        {user?.role || 'admin'}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => handleNavigation('/profile')}
                                className="cursor-pointer"
                            >
                                <User className="mr-2 h-4 w-4" />
                                <span>Mi Perfil</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleNavigation('/settings')}
                                className="cursor-pointer"
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Configuración</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleNavigation('/settings')}
                                className="cursor-pointer"
                            >
                                <Bell className="mr-2 h-4 w-4" />
                                <span>Notificaciones</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={logout}
                                className="cursor-pointer text-destructive focus:text-destructive"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Cerrar sesión</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </aside>
        </>
    )
}