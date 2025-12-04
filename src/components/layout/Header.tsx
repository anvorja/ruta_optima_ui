// src/components/layout/Header.tsx
import { Bell, Search, Truck, Package, Clock, Fuel, Menu, User, LogOut, Settings, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuthStore } from "@/store/useAuthStore"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

const liveStats = [
    { label: "Vehículos activos", value: "12/15", icon: Truck, color: "text-success" },
    { label: "Entregas hoy", value: "156", icon: Package, color: "text-primary" },
    { label: "Tiempo prom.", value: "23 min", icon: Clock, color: "text-warning" },
    { label: "Combustible", value: "87%", icon: Fuel, color: "text-muted-foreground" },
]

const notifications = [
    {
        id: 1,
        title: "Tráfico alto detectado",
        description: "Ruta A-15 con 20 min de retraso",
        time: "Hace 2 min",
        type: "warning" as const,
    },
    {
        id: 2,
        title: "Vehículo V-003 detenido",
        description: "Hace 5 minutos en Zona Norte",
        time: "Hace 5 min",
        type: "critical" as const,
    },
    {
        id: 3,
        title: "Optimización completada",
        description: "12 rutas optimizadas - 15% ahorro",
        time: "Hace 12 min",
        type: "success" as const,
    },
]

interface HeaderProps {
    onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    const unreadNotifications = notifications.filter(n => n.type === 'critical' || n.type === 'warning').length

    return (
        <header className="sticky top-0 z-30 glass-strong border-b border-white/40 dark:border-white/10">
            <div className="flex h-16 sm:h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
                {/* Left section - Menu button + Search */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Menu button for mobile con glassmorphism */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden glass-input hover:bg-primary/10 transition-smooth hover:scale-105 active:scale-95 touch-target"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    {/* Search con glassmorphism premium */}
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-hover:text-primary" />
                        <Input
                            placeholder="Buscar órdenes, vehículos..."
                            className="w-full h-10 sm:h-11 glass-input pl-10 pr-4 rounded-2xl
                                     focus:ring-2 focus:ring-primary/50 transition-smooth
                                     placeholder:text-muted-foreground"
                        />
                    </div>
                </div>

                {/* Center section - Live Stats con glassmorphism */}
                <div className="hidden lg:flex items-center gap-3 xl:gap-4">
                    {liveStats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className={cn(
                                "flex items-center gap-2.5 px-3 py-2 rounded-2xl glass-input",
                                "hover:bg-white/60 dark:hover:bg-white/10 transition-smooth cursor-pointer",
                                "hover:scale-105 group",
                                `animate-fade-up-delay-${index}`
                            )}
                        >
                            <div className={cn(
                                "relative rounded-xl p-2 glass-input",
                                "group-hover:scale-110 transition-all duration-500"
                            )}>
                                {/* Glow effect en hover */}
                                <div className={cn(
                                    "absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500",
                                    stat.color
                                )} />
                                <stat.icon className={cn("relative h-4 w-4", stat.color)} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none">
                                    {stat.label}
                                </span>
                                <span className="text-sm font-black text-foreground mt-1 leading-none group-hover:text-primary transition-colors duration-300">
                                    {stat.value}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right section - Actions premium */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Notifications con glassmorphism premium */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative glass-input hover:bg-primary/10 transition-smooth hover:scale-105 active:scale-95 touch-target"
                            >
                                <Bell className="h-5 w-5" />
                                {unreadNotifications > 0 && (
                                    <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-gradient-to-br from-destructive to-destructive/80 text-white text-[10px] font-bold border-2 border-background shadow-lg animate-bounce-subtle">
                                        {unreadNotifications}
                                    </div>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-80 sm:w-96 glass-modal border border-white/30 dark:border-white/10 p-0 overflow-hidden rounded-3xl"
                        >
                            {/* Header del dropdown */}
                            <div className="relative p-5 border-b border-white/20 dark:border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                                <div className="relative flex items-center justify-between">
                                    <DropdownMenuLabel className="font-bold text-lg p-0">
                                        Notificaciones
                                    </DropdownMenuLabel>
                                    {unreadNotifications > 0 && (
                                        <div className="badge-glass bg-destructive/10 text-destructive font-bold">
                                            {unreadNotifications} nuevas
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Lista de notificaciones */}
                            <div className="max-h-96 overflow-y-auto smooth-scroll">
                                {notifications.map((notification, index) => (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className={cn(
                                            "flex flex-col items-start gap-3 p-4 cursor-pointer",
                                            "hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300",
                                            "border-b border-white/10 dark:border-white/5 last:border-0",
                                            `animate-fade-up-delay-${Math.min(index, 3)}`
                                        )}
                                    >
                                        <div className="flex items-start gap-3 w-full">
                                            {/* Icon con color según tipo */}
                                            <div className={cn(
                                                "p-2 rounded-xl shrink-0",
                                                notification.type === "critical" && "bg-destructive/10",
                                                notification.type === "warning" && "bg-warning/10",
                                                notification.type === "success" && "bg-success/10"
                                            )}>
                                                {notification.type === "critical" && <AlertCircle className="h-4 w-4 text-destructive" />}
                                                {notification.type === "warning" && <AlertTriangle className="h-4 w-4 text-warning" />}
                                                {notification.type === "success" && <CheckCircle className="h-4 w-4 text-success" />}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <span className="font-bold text-sm">{notification.title}</span>
                                                    <span className="text-[10px] text-muted-foreground font-medium shrink-0">
                                                        {notification.time}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed">
                                                    {notification.description}
                                                </p>
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </div>

                            {/* Footer del dropdown */}
                            <div className="p-3 border-t border-white/20 dark:border-white/10">
                                <button className="w-full py-2.5 rounded-2xl glass-input font-semibold text-sm hover:bg-primary/10 transition-smooth">
                                    Ver todas las notificaciones
                                </button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Menu premium */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full p-0 hover:scale-105 transition-smooth touch-target"
                            >
                                <div className="h-full w-full rounded-full bg-gradient-primary-glow flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-64 glass-modal border border-white/30 dark:border-white/10 p-0 overflow-hidden rounded-3xl"
                        >
                            {/* User info header */}
                            <div className="relative p-5 border-b border-white/20 dark:border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                                <DropdownMenuLabel className="relative font-normal p-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-gradient-primary-glow flex items-center justify-center text-white font-bold shadow-lg">
                                            {user?.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-sm font-bold leading-none mb-1.5">
                                                {user?.name || "Usuario"}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user?.email || "usuario@rutaoptima.com"}
                                            </p>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                            </div>

                            {/* Menu items */}
                            <div className="p-2">
                                <DropdownMenuItem
                                    onClick={() => navigate('/profile')}
                                    className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 transition-smooth rounded-2xl px-3 py-3 touch-target"
                                >
                                    <User className="mr-3 h-4 w-4" />
                                    <span className="font-semibold">Mi Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => navigate('/settings')}
                                    className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 transition-smooth rounded-2xl px-3 py-3 touch-target"
                                >
                                    <Settings className="mr-3 h-4 w-4" />
                                    <span className="font-semibold">Configuración</span>
                                </DropdownMenuItem>
                            </div>

                            <DropdownMenuSeparator className="my-1" />

                            {/* Logout */}
                            <div className="p-2 pb-3">
                                <DropdownMenuItem
                                    onClick={logout}
                                    className="cursor-pointer text-destructive font-semibold focus:text-destructive hover:bg-destructive/10 transition-smooth rounded-2xl px-3 py-3 touch-target"
                                >
                                    <LogOut className="mr-3 h-4 w-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}