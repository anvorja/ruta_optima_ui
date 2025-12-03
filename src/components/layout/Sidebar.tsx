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
            {/* Mobile sidebar con glassmorphism */}
            {isOpen && (
                <>
                    {/* Backdrop con blur */}
                    <div
                        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
                        onClick={onClose}
                    />

                    <aside className="fixed inset-y-0 left-0 z-50 w-64 glass-strong flex flex-col md:hidden border-r border-border/40">
                        {/* Logo */}
                        <div className="flex h-14 sm:h-16 items-center justify-between px-4 border-b border-border/40">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-lg">
                                    <Zap className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-foreground">RutaOptima</span>
                                    <span className="text-[10px] text-muted-foreground/80">Logistics AI</span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="hover:bg-muted/60 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto smooth-scroll">
                            {menuItems.map((item, index) => (
                                <NavLink
                                    key={item.url}
                                    to={item.url}
                                    onClick={onClose}
                                    className={cn(
                                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium",
                                        "text-sidebar-foreground transition-all duration-200",
                                        "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                                        "touch-target"
                                    )}
                                    activeClassName="bg-sidebar-accent text-sidebar-primary shadow-sm"
                                    style={{
                                        animation: `fade-up 0.3s ease-out ${index * 0.05}s forwards`,
                                        opacity: 0
                                    }}
                                >
                                    <item.icon className={cn(
                                        "h-5 w-5 shrink-0",
                                        item.live && "text-success animate-pulse"
                                    )} />
                                    <span className="flex-1">{item.title}</span>
                                    {item.badge && (
                                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/20 text-primary border-0">
                                            {item.badge}
                                        </Badge>
                                    )}
                                    {item.count && (
                                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                            {item.count}
                                        </Badge>
                                    )}
                                </NavLink>
                            ))}
                        </nav>

                        {/* User section */}
                        <div className="border-t border-border/40 p-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-sidebar-accent/60 transition-all touch-target">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-semibold shadow-sm">
                                            {user?.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0 text-left">
                                            <span className="text-sm font-medium text-foreground truncate">
                                                {user?.name || "Usuario"}
                                            </span>
                                            <span className="text-[11px] text-muted-foreground/80 truncate">
                                                {user?.email || "usuario@rutaoptima.com"}
                                            </span>
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 glass-modal">
                                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleNavigation('/profile')} className="cursor-pointer hover:bg-muted/40">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Mi Perfil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleNavigation('/settings')} className="cursor-pointer hover:bg-muted/40">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Configuración</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleNavigation('/settings')} className="cursor-pointer hover:bg-muted/40">
                                        <Bell className="mr-2 h-4 w-4" />
                                        <span>Notificaciones</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Cerrar sesión</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </aside>
                </>
            )}

            {/* Desktop sidebar con glassmorphism */}
            <aside
                className={cn(
                    "hidden md:flex flex-col glass-strong transition-all duration-300 relative border-r border-border/40",
                    collapsed ? "w-[72px]" : "w-64"
                )}
            >
                {/* Toggle Button - Flecha en el borde derecho */}
                <button
                    onClick={toggleCollapse}
                    className={cn(
                        "absolute -right-3 top-20 z-50",
                        "h-6 w-6 flex items-center justify-center rounded-full",
                        "border border-border/40 glass shadow-lg",
                        "hover:scale-110 transition-all duration-200",
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
                        <div className="flex items-center gap-2 w-full">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-lg">
                                <Zap className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">RutaOptima</span>
                                <span className="text-[10px] text-muted-foreground/80">Logistics AI</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-lg">
                            <Zap className="h-5 w-5 text-primary-foreground" />
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto smooth-scroll">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.url}
                            to={item.url}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium",
                                "text-sidebar-foreground transition-all duration-200",
                                "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground hover:scale-[1.02]",
                                collapsed && "justify-center"
                            )}
                            activeClassName="bg-sidebar-accent text-sidebar-primary shadow-sm scale-[1.02]"
                        >
                            <item.icon className={cn(
                                "h-5 w-5 shrink-0",
                                item.live && "text-success animate-pulse"
                            )} />
                            {!collapsed && (
                                <>
                                    <span className="flex-1">{item.title}</span>
                                    {item.badge && (
                                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/20 text-primary border-0">
                                            {item.badge}
                                        </Badge>
                                    )}
                                    {item.count && (
                                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                            {item.count}
                                        </Badge>
                                    )}
                                </>
                            )}
                            {collapsed && (item.count || item.badge) && (
                                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User section */}
                {!collapsed && (
                    <div className="border-t border-border/40 p-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-sidebar-accent/60 transition-all">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-semibold shadow-sm">
                                        {user?.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0 text-left">
                                        <span className="text-sm font-medium text-foreground truncate">
                                            {user?.name || "Usuario"}
                                        </span>
                                        <span className="text-[11px] text-muted-foreground/80 truncate">
                                            {user?.email || "usuario@rutaoptima.com"}
                                        </span>
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 glass-modal">
                                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleNavigation('/profile')} className="cursor-pointer hover:bg-muted/40">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Mi Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleNavigation('/settings')} className="cursor-pointer hover:bg-muted/40">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Configuración</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleNavigation('/settings')} className="cursor-pointer hover:bg-muted/40">
                                    <Bell className="mr-2 h-4 w-4" />
                                    <span>Notificaciones</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                {/* Collapsed user avatar */}
                {collapsed && (
                    <div className="border-t border-border/40 p-4 flex justify-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-semibold shadow-sm hover:scale-110 transition-transform">
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 glass-modal">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-semibold">{user?.name || "Usuario"}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {user?.email || "usuario@rutaoptima.com"}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleNavigation('/profile')} className="cursor-pointer hover:bg-muted/40">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Mi Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleNavigation('/settings')} className="cursor-pointer hover:bg-muted/40">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Configuración</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </aside>
        </>
    )
}