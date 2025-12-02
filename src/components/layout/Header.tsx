// import { Bell, Search, Truck, Package, Clock, Fuel } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
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
// export function Header() {
//     const user = useAuthStore((state) => state.user)
//     const navigate = useNavigate()
//
//     return (
//         <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-6">
//             {/* Search */}
//             <div className="flex items-center gap-4">
//                 <div className="relative">
//                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                         placeholder="Buscar órdenes, vehículos..."
//                         className="w-80 bg-muted/50 border-0 pl-9 focus-visible:ring-1 focus-visible:ring-primary"
//                     />
//                 </div>
//             </div>
//
//             {/* Live Stats */}
//             <div className="hidden lg:flex items-center gap-6">
//                 {liveStats.map((stat) => (
//                     <div key={stat.label} className="flex items-center gap-2">
//                         <stat.icon className={`h-4 w-4 ${stat.color}`} />
//                         <div className="flex flex-col">
//                             <span className="text-xs text-muted-foreground">{stat.label}</span>
//                             <span className="text-sm font-semibold text-foreground">{stat.value}</span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//
//             {/* Actions */}
//             <div className="flex items-center gap-3">
//                 <ThemeToggle />
//
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon" className="relative">
//                             <Bell className="h-5 w-5" />
//                             <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-destructive p-0 text-[10px]">
//                                 3
//                             </Badge>
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="w-80">
//                         <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
//                             <span className="font-medium">Tráfico alto detectado</span>
//                             <span className="text-xs text-muted-foreground">Ruta A-15 con 20 min de retraso</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
//                             <span className="font-medium">Vehículo V-003 detenido</span>
//                             <span className="text-xs text-muted-foreground">Hace 5 minutos en Zona Norte</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
//                             <span className="font-medium">Optimización completada</span>
//                             <span className="text-xs text-muted-foreground">12 rutas optimizadas - 15% ahorro</span>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//
//                 <button
//                     onClick={() => navigate('/profile')}
//                     className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center cursor-pointer transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                     aria-label="Ver perfil"
//                 >
//           <span className="text-xs font-bold text-primary-foreground">
//             {user?.name.charAt(0) || 'U'}
//           </span>
//                 </button>
//             </div>
//         </header>
//     )
// }




// import { Bell, Search, Truck, Package, Clock, Fuel, Menu } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
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
// interface HeaderProps {
//     onMenuClick?: () => void
// }
//
// export function Header({ onMenuClick }: HeaderProps) {
//     const user = useAuthStore((state) => state.user)
//     const navigate = useNavigate()
//
//     return (
//         <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-4 sm:px-6">
//             {/* Left section - Menu button + Search */}
//             <div className="flex items-center gap-2 sm:gap-4 flex-1">
//                 {/* Menu button for mobile */}
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     className="md:hidden"
//                     onClick={onMenuClick}
//                 >
//                     <Menu className="h-5 w-5" />
//                 </Button>
//
//                 {/* Search */}
//                 <div className="relative flex-1 max-w-md">
//                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                         placeholder="Buscar órdenes, vehículos..."
//                         className="w-full bg-muted/50 border-0 pl-9 focus-visible:ring-1 focus-visible:ring-primary"
//                     />
//                 </div>
//             </div>
//
//             {/* Live Stats - Hidden on mobile and small tablets */}
//             <div className="hidden xl:flex items-center gap-4 lg:gap-6 mx-4">
//                 {liveStats.map((stat) => (
//                     <div key={stat.label} className="flex items-center gap-2">
//                         <stat.icon className={`h-4 w-4 ${stat.color}`} />
//                         <div className="flex flex-col">
//                             <span className="text-xs text-muted-foreground">{stat.label}</span>
//                             <span className="text-sm font-semibold text-foreground">{stat.value}</span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//
//             {/* Actions */}
//             <div className="flex items-center gap-2 sm:gap-3">
//                 <ThemeToggle />
//
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon" className="relative">
//                             <Bell className="h-5 w-5" />
//                             <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-destructive p-0 text-[10px]">
//                                 3
//                             </Badge>
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="w-80">
//                         <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
//                             <span className="font-medium">Tráfico alto detectado</span>
//                             <span className="text-xs text-muted-foreground">Ruta A-15 con 20 min de retraso</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
//                             <span className="font-medium">Vehículo V-003 detenido</span>
//                             <span className="text-xs text-muted-foreground">Hace 5 minutos en Zona Norte</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
//                             <span className="font-medium">Optimización completada</span>
//                             <span className="text-xs text-muted-foreground">12 rutas optimizadas - 15% ahorro</span>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//
//                 <button
//                     onClick={() => navigate('/profile')}
//                     className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center cursor-pointer transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                     aria-label="Ver perfil"
//                 >
//           <span className="text-xs font-bold text-primary-foreground">
//             {user?.name.charAt(0) || 'U'}
//           </span>
//                 </button>
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
        <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-4 sm:px-6">
            {/* Left section - Menu button + Search */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
                {/* Menu button for mobile */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={onMenuClick}
                >
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar órdenes, vehículos..."
                        className="w-full bg-muted/50 border-0 pl-9 focus-visible:ring-1 focus-visible:ring-primary"
                    />
                </div>
            </div>

            {/* Live Stats - Hidden on mobile and small tablets */}
            <div className="hidden xl:flex items-center gap-4 lg:gap-6 mx-4">
                {liveStats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2">
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">{stat.label}</span>
                            <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
                <ThemeToggle />

                {/* Notifications Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            {unreadNotifications > 0 && (
                                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-destructive p-0 text-[10px] flex items-center justify-center">
                                    {unreadNotifications}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 sm:w-96">
                        <DropdownMenuLabel className="flex items-center justify-between">
                            <span>Notificaciones</span>
                            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary hover:text-primary/80">
                                Marcar todas como leídas
                            </Button>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-[400px] overflow-y-auto smooth-scroll">
                            {notifications.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                    className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                                >
                                    <div className="flex items-start justify-between w-full gap-2">
                                        <span className="font-medium text-sm">{notification.title}</span>
                                        <span className="text-xs text-muted-foreground shrink-0">{notification.time}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{notification.description}</span>
                                </DropdownMenuItem>
                            ))}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-primary cursor-pointer">
                            Ver todas las notificaciones
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center cursor-pointer transition-all hover:scale-110 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            aria-label="Menú de usuario"
                        >
                            <span className="text-xs font-bold text-primary-foreground">
                                {user?.name.charAt(0) || 'U'}
                            </span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
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
                            onClick={() => navigate('/profile')}
                            className="cursor-pointer"
                        >
                            <User className="mr-2 h-4 w-4" />
                            <span>Mi Perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigate('/settings')}
                            className="cursor-pointer"
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Configuración</span>
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
        </header>
    )
}