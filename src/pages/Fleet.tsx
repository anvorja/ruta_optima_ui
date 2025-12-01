// src/pages/Fleet.tsx
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    Truck,
    Plus,
    Fuel,
    MapPin,
    Clock,
    Settings,
    MoreVertical,
    CheckCircle2,
    AlertTriangle,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const fleetData = [
    {
        id: "V-001",
        name: "Camión 3.5T - Blanco",
        type: "Camión",
        capacity: 3500,
        currentLoad: 2800,
        fuel: 85,
        status: "en_ruta",
        driver: "Carlos Méndez",
        location: "Zona Centro",
        lastMaintenance: "2024-01-15",
        consumption: "12 L/100km",
    },
    {
        id: "V-002",
        name: "Camioneta 1T - Gris",
        type: "Camioneta",
        capacity: 1000,
        currentLoad: 650,
        fuel: 72,
        status: "en_ruta",
        driver: "Ana García",
        location: "Zona Norte",
        lastMaintenance: "2024-01-10",
        consumption: "9 L/100km",
    },
    {
        id: "V-003",
        name: "Van Express - Azul",
        type: "Van",
        capacity: 800,
        currentLoad: 0,
        fuel: 45,
        status: "mantenimiento",
        driver: "-",
        location: "Taller Central",
        lastMaintenance: "2024-01-20",
        consumption: "8 L/100km",
    },
    {
        id: "V-004",
        name: "Moto Delivery A",
        type: "Moto",
        capacity: 50,
        currentLoad: 35,
        fuel: 90,
        status: "en_ruta",
        driver: "Laura Ruiz",
        location: "Zona Este",
        lastMaintenance: "2024-01-18",
        consumption: "3 L/100km",
    },
    {
        id: "V-005",
        name: "Camión 5T - Negro",
        type: "Camión",
        capacity: 5000,
        currentLoad: 0,
        fuel: 55,
        status: "disponible",
        driver: "-",
        location: "Base Central",
        lastMaintenance: "2024-01-12",
        consumption: "15 L/100km",
    },
    {
        id: "V-006",
        name: "Camioneta 1.5T - Blanca",
        type: "Camioneta",
        capacity: 1500,
        currentLoad: 0,
        fuel: 30,
        status: "combustible_bajo",
        driver: "-",
        location: "Base Central",
        lastMaintenance: "2024-01-08",
        consumption: "10 L/100km",
    },
]

const statusConfig = {
    en_ruta: { label: "En Ruta", icon: Truck, className: "bg-success/20 text-success border-success/30" },
    disponible: { label: "Disponible", icon: CheckCircle2, className: "bg-primary/20 text-primary border-primary/30" },
    mantenimiento: { label: "Mantenimiento", icon: Settings, className: "bg-warning/20 text-warning border-warning/30" },
    combustible_bajo: { label: "Combustible Bajo", icon: AlertTriangle, className: "bg-destructive/20 text-destructive border-destructive/30" },
}

export function Fleet() {
    const activeVehicles = fleetData.filter((v) => v.status === "en_ruta").length
    const availableVehicles = fleetData.filter((v) => v.status === "disponible").length
    const maintenanceVehicles = fleetData.filter((v) => v.status === "mantenimiento").length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Gestión de Flota</h1>
                    <p className="text-sm text-muted-foreground">
                        {fleetData.length} vehículos registrados
                    </p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Agregar Vehículo
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/20">
                            <Truck className="h-5 w-5 text-success" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{activeVehicles}</p>
                            <p className="text-sm text-muted-foreground">En Ruta</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{availableVehicles}</p>
                            <p className="text-sm text-muted-foreground">Disponibles</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/20">
                            <Settings className="h-5 w-5 text-warning" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{maintenanceVehicles}</p>
                            <p className="text-sm text-muted-foreground">Mantenimiento</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Fuel className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">68%</p>
                            <p className="text-sm text-muted-foreground">Combustible Prom.</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Fleet Grid */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {fleetData.map((vehicle) => {
                    const status = statusConfig[vehicle.status as keyof typeof statusConfig]
                    const loadPercentage = (vehicle.currentLoad / vehicle.capacity) * 100

                    return (
                        <Card key={vehicle.id} className="overflow-hidden">
                            <div className="flex items-center justify-between border-b border-border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                        <Truck className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-foreground">{vehicle.id}</span>
                                            <Badge variant="outline" className={cn("text-[10px]", status.className)}>
                                                {status.label}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{vehicle.name}</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                                        <DropdownMenuItem>Editar</DropdownMenuItem>
                                        <DropdownMenuItem>Asignar conductor</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">Desactivar</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="p-4 space-y-4">
                                {/* Driver & Location */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Conductor</p>
                                        <p className="font-medium text-foreground">{vehicle.driver}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground flex items-center gap-1">
                                            <MapPin className="h-3 w-3" /> Ubicación
                                        </p>
                                        <p className="font-medium text-foreground">{vehicle.location}</p>
                                    </div>
                                </div>

                                {/* Capacity */}
                                <div>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-muted-foreground">Capacidad</span>
                                        <span className="text-foreground">
                      {vehicle.currentLoad}/{vehicle.capacity} kg
                    </span>
                                    </div>
                                    <Progress value={loadPercentage} className="h-2" />
                                </div>

                                {/* Fuel */}
                                <div>
                                    <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Fuel className="h-3 w-3" /> Combustible
                    </span>
                                        <span className={cn("text-foreground", vehicle.fuel < 40 && "text-warning")}>
                      {vehicle.fuel}%
                    </span>
                                    </div>
                                    <Progress
                                        value={vehicle.fuel}
                                        className={cn("h-2", vehicle.fuel < 40 && "[&>div]:bg-warning")}
                                    />
                                </div>

                                {/* Footer Info */}
                                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Mant: {vehicle.lastMaintenance}
                  </span>
                                    <span>{vehicle.consumption}</span>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}