// // src/components/layout/Header.tsx
// import { Bell, Search, Truck, Package, Clock, Fuel, Menu, User, LogOut, Settings } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { useAuthStore } from "@/store/useAuthStore"
// import { useNavigate } from "react-router-dom"
//
// const liveStats = [
//     { label: "Vehículos activos", value: "12/15", icon: Truck, color: "text-success" },
//     { label: "Entregas hoy", value: "156", icon: Package, color: "text-primary" },
//     { label: "Tiempo prom.", value: "23 min", icon: Clock, color: "text-warning" },
//     { label: "Combustible", value: "87%", icon: Fuel, color: "text-muted-foreground" },
// ]
//
// const notifications = [
//     {
//         id: 1,
//         title: "Tráfico alto detectado",
//         description: "Ruta A-15 con 20 min de retraso",
//         time: "Hace 2 min",
//         type: "warning" as const,
//     },
//     {
//         id: 2,
//         title: "Vehículo V-003 detenido",
//         description: "Hace 5 minutos en Zona Norte",
//         time: "Hace 5 min",
//         type: "critical" as const,
//     },
//     {
//         id: 3,
//         title: "Optimización completada",
//         description: "12 rutas optimizadas - 15% ahorro",
//         time: "Hace 12 min",
//         type: "success" as const,
//     },
// ]
//
// interface HeaderProps {
//     onMenuClick?: () => void
// }
//
// export function Header({ onMenuClick }: HeaderProps) {
//     const { user, logout } = useAuthStore()
//     const navigate = useNavigate()
//
//     const unreadNotifications = notifications.filter(n => n.type === 'critical' || n.type === 'warning').length
//
//     return (
//         <header className="sticky top-0 z-30 glass-strong border-b border-border/40">
//             <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
//                 {/* Left section - Menu button + Search */}
//                 <div className="flex items-center gap-2 sm:gap-4 flex-1">
//                     {/* Menu button for mobile */}
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="md:hidden hover:bg-muted/60 transition-colors"
//                         onClick={onMenuClick}
//                     >
//                         <Menu className="h-5 w-5" />
//                     </Button>
//
//                     {/* Search con glassmorphism */}
//                     <div className="relative flex-1 max-w-md">
//                         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
//                         <Input
//                             placeholder="Buscar órdenes, vehículos..."
//                             className="w-full bg-muted/30 backdrop-blur-sm border-border/40 pl-9 focus-visible:ring-1 focus-visible:ring-primary transition-all"
//                         />
//                     </div>
//                 </div>
//
//                 {/* Center section - Live Stats (Desktop only) */}
//                 <div className="hidden lg:flex items-center gap-6 px-6">
//                     {liveStats.map((stat) => (
//                         <div key={stat.label} className="flex items-center gap-2 group">
//                             <div className="rounded-lg bg-muted/40 p-1.5 group-hover:bg-muted/60 transition-colors">
//                                 <stat.icon className={`h-4 w-4 ${stat.color}`} />
//                             </div>
//                             <div className="flex flex-col">
//                                 <span className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
//                                     {stat.label}
//                                 </span>
//                                 <span className="text-sm font-bold text-foreground">{stat.value}</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//
//                 {/* Right section - Actions */}
//                 <div className="flex items-center gap-2 sm:gap-3">
//                     {/* Theme Toggle */}
//                     <ThemeToggle />
//
//                     {/* Notifications */}
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon" className="relative hover:bg-muted/60 transition-colors">
//                                 <Bell className="h-5 w-5" />
//                                 {unreadNotifications > 0 && (
//                                     <Badge
//                                         className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive text-destructive-foreground border-2 border-background"
//                                         variant="destructive"
//                                     >
//                                         {unreadNotifications}
//                                     </Badge>
//                                 )}
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-80 sm:w-96 glass-modal">
//                             <DropdownMenuLabel className="font-semibold text-base">
//                                 Notificaciones
//                                 {unreadNotifications > 0 && (
//                                     <Badge variant="destructive" className="ml-2 text-xs">
//                                         {unreadNotifications} nuevas
//                                     </Badge>
//                                 )}
//                             </DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             <div className="max-h-96 overflow-y-auto smooth-scroll">
//                                 {notifications.map((notification) => (
//                                     <DropdownMenuItem
//                                         key={notification.id}
//                                         className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-muted/40 transition-colors"
//                                     >
//                                         <div className="flex items-center justify-between w-full">
//                                             <span className="font-semibold text-sm">{notification.title}</span>
//                                             <Badge
//                                                 variant={
//                                                     notification.type === "critical"
//                                                         ? "destructive"
//                                                         : notification.type === "warning"
//                                                             ? "default"
//                                                             : "secondary"
//                                                 }
//                                                 className="text-[10px] px-2 py-0"
//                                             >
//                                                 {notification.type}
//                                             </Badge>
//                                         </div>
//                                         <p className="text-xs text-muted-foreground">{notification.description}</p>
//                                         <span className="text-[10px] text-muted-foreground/60">{notification.time}</span>
//                                     </DropdownMenuItem>
//                                 ))}
//                             </div>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//
//                     {/* User Menu */}
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-muted/60 transition-colors">
//                                 <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-semibold">
//                                     {user?.name?.charAt(0).toUpperCase() || "U"}
//                                 </div>
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-56 glass-modal">
//                             <DropdownMenuLabel className="font-normal">
//                                 <div className="flex flex-col space-y-1">
//                                     <p className="text-sm font-semibold leading-none">{user?.name || "Usuario"}</p>
//                                     <p className="text-xs leading-none text-muted-foreground">
//                                         {user?.email || "usuario@rutaoptima.com"}
//                                     </p>
//                                 </div>
//                             </DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer hover:bg-muted/40">
//                                 <User className="mr-2 h-4 w-4" />
//                                 <span>Mi Perfil</span>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer hover:bg-muted/40">
//                                 <Settings className="mr-2 h-4 w-4" />
//                                 <span>Configuración</span>
//                             </DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10">
//                                 <LogOut className="mr-2 h-4 w-4" />
//                                 <span>Cerrar sesión</span>
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>
//             </div>
//         </header>
//     )
// }

// src/components/layout/Header.tsx
import { Bell, Search, Truck, Package, Clock, Fuel, Menu, User, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
        <header className="sticky top-0 z-30 glass-strong border-b border-border/40 backdrop-blur-xl">
            <div className="flex h-16 sm:h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left section - Menu button + Search */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    {/* Menu button for mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden hover:bg-muted/60 transition-all duration-200 hover:scale-105 active:scale-95"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    {/* Search mejorado */}
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 transition-colors group-hover:text-muted-foreground" />
                        <Input
                            placeholder="Buscar órdenes, vehículos..."
                            className="w-full h-10 sm:h-11 bg-muted/30 backdrop-blur-sm border-border/40 pl-10 pr-4
                                     focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50
                                     transition-all duration-200 hover:bg-muted/40
                                     placeholder:text-muted-foreground/60"
                        />
                    </div>
                </div>

                {/* Center section - Live Stats mejorado */}
                <div className="hidden lg:flex items-center gap-5 xl:gap-7 px-6 xl:px-8">
                    {liveStats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="flex items-center gap-2.5 group cursor-pointer"
                            style={{
                                animation: `fade-up 0.3s ease-out ${index * 0.1}s forwards`,
                                opacity: 0
                            }}
                        >
                            <div className="relative rounded-lg bg-muted/40 p-2 group-hover:bg-muted/60 transition-all duration-300 group-hover:scale-110">
                                {/* Glow effect en hover */}
                                <div className={`absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${stat.color}`} />
                                <stat.icon className={`relative h-4 w-4 ${stat.color}`} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest leading-none">
                                    {stat.label}
                                </span>
                                <span className="text-sm font-extrabold text-foreground mt-0.5 leading-none group-hover:text-primary transition-colors duration-200">
                                    {stat.value}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right section - Actions mejoradas */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Notifications mejoradas */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative hover:bg-muted/60 transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <Bell className="h-5 w-5" />
                                {unreadNotifications > 0 && (
                                    <Badge
                                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-bold
                                                 bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground
                                                 border-2 border-background shadow-sm animate-pulse"
                                        variant="destructive"
                                    >
                                        {unreadNotifications}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-80 sm:w-96 glass-modal border border-border/50 p-0 overflow-hidden"
                        >
                            <div className="bg-gradient-to-br from-muted/30 to-background/20 p-4 border-b border-border/40">
                                <div className="flex items-center justify-between">
                                    <DropdownMenuLabel className="font-bold text-base p-0">
                                        Notificaciones
                                    </DropdownMenuLabel>
                                    {unreadNotifications > 0 && (
                                        <Badge variant="destructive" className="text-xs font-bold">
                                            {unreadNotifications} nuevas
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <div className="max-h-96 overflow-y-auto smooth-scroll">
                                {notifications.map((notification, index) => (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className="flex flex-col items-start gap-2 p-4 cursor-pointer
                                                 hover:bg-muted/40 transition-all duration-200 border-b border-border/30 last:border-0"
                                        style={{
                                            animation: `fade-up 0.2s ease-out ${index * 0.05}s forwards`,
                                            opacity: 0
                                        }}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span className="font-bold text-sm">{notification.title}</span>
                                            <Badge
                                                variant={
                                                    notification.type === "critical"
                                                        ? "destructive"
                                                        : notification.type === "warning"
                                                            ? "default"
                                                            : "secondary"
                                                }
                                                className="text-[10px] px-2.5 py-0.5 font-bold"
                                            >
                                                {notification.type}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{notification.description}</p>
                                        <span className="text-[10px] text-muted-foreground/60 font-medium">{notification.time}</span>
                                    </DropdownMenuItem>
                                ))}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Menu mejorado */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full hover:bg-muted/60
                                         transition-all duration-200 hover:scale-105 active:scale-95 p-0"
                            >
                                <div className="flex h-full w-full items-center justify-center rounded-full
                                              bg-gradient-to-br from-primary via-primary to-primary/70
                                              text-primary-foreground font-bold text-sm
                                              shadow-md hover:shadow-lg transition-shadow duration-200">
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-64 glass-modal border border-border/50 p-0 overflow-hidden"
                        >
                            <div className="bg-gradient-to-br from-muted/30 to-background/20 p-4 border-b border-border/40">
                                <DropdownMenuLabel className="font-normal p-0">
                                    <div className="flex flex-col space-y-1.5">
                                        <p className="text-sm font-bold leading-none">{user?.name || "Usuario"}</p>
                                        <p className="text-xs leading-none text-muted-foreground/70">
                                            {user?.email || "usuario@rutaoptima.com"}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                            </div>
                            <div className="p-1">
                                <DropdownMenuItem
                                    onClick={() => navigate('/profile')}
                                    className="cursor-pointer hover:bg-muted/40 transition-colors duration-200 rounded-lg my-0.5 px-3 py-2.5"
                                >
                                    <User className="mr-2.5 h-4 w-4" />
                                    <span className="font-medium">Mi Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => navigate('/settings')}
                                    className="cursor-pointer hover:bg-muted/40 transition-colors duration-200 rounded-lg my-0.5 px-3 py-2.5"
                                >
                                    <Settings className="mr-2.5 h-4 w-4" />
                                    <span className="font-medium">Configuración</span>
                                </DropdownMenuItem>
                            </div>
                            <DropdownMenuSeparator className="my-1" />
                            <div className="p-1 pb-2">
                                <DropdownMenuItem
                                    onClick={logout}
                                    className="cursor-pointer text-destructive font-medium focus:text-destructive
                                             hover:bg-destructive/10 transition-all duration-200 rounded-lg px-3 py-2.5"
                                >
                                    <LogOut className="mr-2.5 h-4 w-4" />
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