import { Bell, Search, Truck, Package, Clock, Fuel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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

export function Header() {
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate()

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-6">
            {/* Search */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar órdenes, vehículos..."
                        className="w-80 bg-muted/50 border-0 pl-9 focus-visible:ring-1 focus-visible:ring-primary"
                    />
                </div>
            </div>

            {/* Live Stats */}
            <div className="hidden lg:flex items-center gap-6">
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
            <div className="flex items-center gap-3">
                <ThemeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-destructive p-0 text-[10px]">
                                3
                            </Badge>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                            <span className="font-medium">Tráfico alto detectado</span>
                            <span className="text-xs text-muted-foreground">Ruta A-15 con 20 min de retraso</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                            <span className="font-medium">Vehículo V-003 detenido</span>
                            <span className="text-xs text-muted-foreground">Hace 5 minutos en Zona Norte</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                            <span className="font-medium">Optimización completada</span>
                            <span className="text-xs text-muted-foreground">12 rutas optimizadas - 15% ahorro</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <button
                    onClick={() => navigate('/profile')}
                    className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center cursor-pointer transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Ver perfil"
                >
          <span className="text-xs font-bold text-primary-foreground">
            {user?.name.charAt(0) || 'U'}
          </span>
                </button>
            </div>
        </header>
    )
}