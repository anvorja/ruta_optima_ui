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
            {/* Mobile sidebar con glassmorphism premium */}
            {isOpen && (
                <>
                    {/* Backdrop con blur elegante */}
                    <div
                        className="fixed inset-0 z-40 backdrop-glass md:hidden animate-fade-in"
                        onClick={onClose}
                    />

                    <aside className="fixed inset-y-0 left-0 z-50 w-64 glass-sidebar flex flex-col md:hidden animate-slide-in-left">
                        {/* Logo con gradient */}
                        <div className="flex h-16 items-center justify-between px-4 border-b border-white/20 dark:border-white/10">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary-glow shadow-lg">
                                    <Zap className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-foreground">RutaOptima</span>
                                    <span className="text-[10px] text-muted-foreground font-semibold">Logistics AI</span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="glass-input hover:bg-destructive/10 hover:text-destructive transition-smooth rounded-xl"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Navigation con glassmorphism */}
                        <nav className="flex-1 space-y-2 p-3 overflow-y-auto smooth-scroll">
                            {menuItems.map((item, index) => (
                                <NavLink
                                    key={item.url}
                                    to={item.url}
                                    onClick={onClose}
                                    className={cn(
                                        "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold",
                                        "text-sidebar-foreground transition-smooth",
                                        "hover:bg-white/50 dark:hover:bg-white/10 hover:scale-[1.02]",
                                        "touch-target group",
                                        `animate-fade-up-delay-${Math.min(index, 3)}`
                                    )}
                                    activeClassName="bg-gradient-primary-glow text-white shadow-lg scale-[1.02]"
                                >
                                    <item.icon className={cn(
                                        "h-5 w-5 shrink-0 transition-all duration-300",
                                        item.live && "text-success animate-pulse-soft",
                                        "group-hover:scale-110"
                                    )} />
                                    <span className="flex-1">{item.title}</span>
                                    {item.badge && (
                                        <div className="badge-glass text-[10px] bg-accent/20 text-accent font-bold">
                                            {item.badge}
                                        </div>
                                    )}
                                    {item.count && (
                                        <div className="badge-glass text-[10px] bg-primary/10 text-primary font-bold">
                                            {item.count}
                                        </div>
                                    )}
                                    {item.live && (
                                        <div className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                                        </div>
                                    )}
                                </NavLink>
                            ))}
                        </nav>

                        {/* User section premium */}
                        <div className="border-t border-white/20 dark:border-white/10 p-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex w-full items-center gap-3 rounded-2xl p-3 glass-input hover:bg-white/50 dark:hover:bg-white/10 transition-smooth touch-target group">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary-glow text-white font-bold shadow-lg group-hover:scale-110 transition-smooth">
                                            {user?.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0 text-left">
                                            <span className="text-sm font-bold text-foreground truncate">
                                                {user?.name || "Usuario"}
                                            </span>
                                            <span className="text-[11px] text-muted-foreground truncate">
                                                {user?.email || "usuario@rutaoptima.com"}
                                            </span>
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 glass-modal border border-white/30 dark:border-white/10 rounded-3xl p-2">
                                    <DropdownMenuLabel className="font-bold">Mi Cuenta</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => handleNavigation('/profile')}
                                        className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 rounded-2xl px-3 py-2.5 font-semibold"
                                    >
                                        <User className="mr-3 h-4 w-4" />
                                        <span>Mi Perfil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleNavigation('/settings')}
                                        className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 rounded-2xl px-3 py-2.5 font-semibold"
                                    >
                                        <Settings className="mr-3 h-4 w-4" />
                                        <span>Configuración</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleNavigation('/settings')}
                                        className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 rounded-2xl px-3 py-2.5 font-semibold"
                                    >
                                        <Bell className="mr-3 h-4 w-4" />
                                        <span>Notificaciones</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={logout}
                                        className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10 rounded-2xl px-3 py-2.5 font-semibold"
                                    >
                                        <LogOut className="mr-3 h-4 w-4" />
                                        <span>Cerrar sesión</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </aside>
                </>
            )}

            {/* Desktop sidebar con glassmorphism premium */}
            <aside
                className={cn(
                    "hidden md:flex flex-col glass-sidebar transition-all duration-500 relative",
                    collapsed ? "w-[72px]" : "w-64"
                )}
            >
                {/* Toggle Button premium */}
                <button
                    onClick={toggleCollapse}
                    className={cn(
                        "absolute -right-3 top-20 z-50",
                        "h-7 w-7 flex items-center justify-center rounded-full",
                        "glass-strong border border-white/40 dark:border-white/10 shadow-lg",
                        "hover:scale-110 hover:rotate-180 transition-all duration-500",
                        "focus-ring-glow"
                    )}
                    aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4 text-foreground" />
                    ) : (
                        <ChevronLeft className="h-4 w-4 text-foreground" />
                    )}
                </button>

                {/* Logo premium */}
                <div className="flex h-16 items-center justify-center px-4">
                    {!collapsed ? (
                        <div className="flex items-center gap-2.5 w-full animate-fade-in">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary-glow shadow-lg">
                                <Zap className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gradient">RutaOptima</span>
                                <span className="text-[10px] text-muted-foreground font-semibold">Logistics AI</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary-glow shadow-lg animate-scale-in">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                    )}
                </div>

                {/* Navigation premium */}
                <nav className="flex-1 space-y-2 p-3 overflow-y-auto smooth-scroll">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.url}
                            to={item.url}
                            className={cn(
                                "flex items-center gap-3 rounded-2xl px-3 py-3.5 text-sm font-semibold",
                                "text-sidebar-foreground transition-smooth",
                                "hover:bg-white/50 dark:hover:bg-white/10 hover:scale-[1.02]",
                                "group touch-target",
                                collapsed && "justify-center px-2"
                            )}
                            activeClassName="bg-gradient-primary-glow text-white shadow-lg scale-[1.02]"
                        >
                            <item.icon className={cn(
                                "h-5 w-5 shrink-0 transition-all duration-300",
                                item.live && "text-success animate-pulse-soft",
                                "group-hover:scale-110"
                            )} />
                            {!collapsed && (
                                <>
                                    <span className="flex-1">{item.title}</span>
                                    {item.badge && (
                                        <div className="badge-glass text-[10px] bg-accent/20 text-accent font-bold">
                                            {item.badge}
                                        </div>
                                    )}
                                    {item.count && (
                                        <div className="badge-glass text-[10px] bg-primary/10 text-primary font-bold">
                                            {item.count}
                                        </div>
                                    )}
                                    {item.live && (
                                        <div className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-success shadow-lg shadow-success/50"></span>
                                        </div>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User section premium - solo visible cuando no está colapsado */}
                {!collapsed && (
                    <div className="border-t border-white/20 dark:border-white/10 p-4 animate-fade-in">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex w-full items-center gap-3 rounded-2xl p-3 glass-input hover:bg-white/50 dark:hover:bg-white/10 transition-smooth touch-target group">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary-glow text-white font-bold shadow-lg group-hover:scale-110 transition-smooth">
                                        {user?.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0 text-left">
                                        <span className="text-sm font-bold text-foreground truncate">
                                            {user?.name || "Usuario"}
                                        </span>
                                        <span className="text-[11px] text-muted-foreground truncate">
                                            {user?.email || "usuario@rutaoptima.com"}
                                        </span>
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 glass-modal border border-white/30 dark:border-white/10 rounded-3xl p-2">
                                <DropdownMenuLabel className="font-bold">Mi Cuenta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => handleNavigation('/profile')}
                                    className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 rounded-2xl px-3 py-2.5 font-semibold"
                                >
                                    <User className="mr-3 h-4 w-4" />
                                    <span>Mi Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleNavigation('/settings')}
                                    className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 rounded-2xl px-3 py-2.5 font-semibold"
                                >
                                    <Settings className="mr-3 h-4 w-4" />
                                    <span>Configuración</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={logout}
                                    className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10 rounded-2xl px-3 py-2.5 font-semibold"
                                >
                                    <LogOut className="mr-3 h-4 w-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                {/* User avatar mini cuando está colapsado */}
                {collapsed && (
                    <div className="border-t border-white/20 dark:border-white/10 p-3 flex justify-center animate-fade-in">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary-glow text-white font-bold shadow-lg hover:scale-110 transition-smooth touch-target">
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 glass-modal border border-white/30 dark:border-white/10 rounded-3xl p-2">
                                <DropdownMenuLabel className="font-bold">Mi Cuenta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => handleNavigation('/profile')}
                                    className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 rounded-2xl px-3 py-2.5 font-semibold"
                                >
                                    <User className="mr-3 h-4 w-4" />
                                    <span>Mi Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleNavigation('/settings')}
                                    className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 rounded-2xl px-3 py-2.5 font-semibold"
                                >
                                    <Settings className="mr-3 h-4 w-4" />
                                    <span>Configuración</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={logout}
                                    className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10 rounded-2xl px-3 py-2.5 font-semibold"
                                >
                                    <LogOut className="mr-3 h-4 w-4" />
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