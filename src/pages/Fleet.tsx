// import { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Truck, Search, Plus, Fuel, Package, Activity } from 'lucide-react'
// import { NewVehicleDialog } from '@/components/fleet/NewVehicleDialog'
// import { VehicleDetailsDialog } from '@/components/fleet/VehicleDetailsDialog'
// import { useFleetStore } from '@/store/useFleetStore'
// import { Toaster } from '@/components/ui/toaster'
//
//
//
// const statusConfig = {
//     active: { label: 'En Ruta', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
//     available: { label: 'Disponible', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
//     maintenance: { label: 'Mantenimiento', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
// }
//
// export function Fleet() {
//     const vehicles = useFleetStore((state) => state.vehicles)
//     const [newVehicleOpen, setNewVehicleOpen] = useState(false)
//     const [detailsVehicleId, setDetailsVehicleId] = useState<string | null>(null)
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h2 className="text-2xl font-bold">Gestión de Flota</h2>
//                     <p className="text-muted-foreground">Administra tus vehículos y conductores</p>
//                 </div>
//                 <Button className="gap-2" onClick={() => setNewVehicleOpen(true)}>
//                     <Plus className="w-4 h-4" />
//                     Agregar Vehículo
//                 </Button>
//             </div>
//
//             {/* Stats */}
//             <div className="grid gap-4 md:grid-cols-4">
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
//                                 <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Total Vehículos</p>
//                                 <p className="text-2xl font-bold">25</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
//                                 <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">En Ruta</p>
//                                 <p className="text-2xl font-bold">12</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
//                                 <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Disponibles</p>
//                                 <p className="text-2xl font-bold">11</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
//                                 <Fuel className="w-6 h-6 text-orange-600 dark:text-orange-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Combustible Prom.</p>
//                                 <p className="text-2xl font-bold">72%</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//
//             {/* Search */}
//             <Card className="border-0 shadow-lg">
//                 <CardContent className="p-4">
//                     <div className="relative">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                         <Input placeholder="Buscar vehículos..." className="pl-10" />
//                     </div>
//                 </CardContent>
//             </Card>
//
//             {/* Vehicles Grid */}
//             <div className="grid gap-4 md:grid-cols-2">
//                 {vehicles.map((vehicle) => (
//                     <Card key={vehicle.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//                         <CardHeader className="pb-3">
//                             <div className="flex items-start justify-between">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
//                                         <Truck className="w-6 h-6 text-white" />
//                                     </div>
//                                     <div>
//                                         <CardTitle className="text-lg">{vehicle.name}</CardTitle>
//                                         <p className="text-sm text-muted-foreground">{vehicle.plate}</p>
//                                     </div>
//                                 </div>
//                                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[vehicle.status as keyof typeof statusConfig].color}`}>
//                                     {statusConfig[vehicle.status as keyof typeof statusConfig].label}
//                                 </span>
//                             </div>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             {/* Driver */}
//                             <div className="flex items-center justify-between text-sm">
//                                 <span className="text-muted-foreground">Conductor:</span>
//                                 <span className="font-medium">{vehicle.driver}</span>
//                             </div>
//
//                             {/* Location */}
//                             <div className="flex items-center justify-between text-sm">
//                                 <span className="text-muted-foreground">Ubicación:</span>
//                                 <span className="font-medium">{vehicle.location}</span>
//                             </div>
//
//                             {/* Capacity */}
//                             <div>
//                                 <div className="flex items-center justify-between text-sm mb-2">
//                                     <span className="text-muted-foreground">Capacidad:</span>
//                                     <span className="font-medium">{vehicle.currentLoad} / {vehicle.capacity} kg</span>
//                                 </div>
//                                 <div className="w-full bg-muted rounded-full h-2">
//                                     <div
//                                         className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
//                                         style={{ width: `${(vehicle.currentLoad / vehicle.capacity) * 100}%` }}
//                                     />
//                                 </div>
//                             </div>
//
//                             {/* Fuel */}
//                             <div>
//                                 <div className="flex items-center justify-between text-sm mb-2">
//                                     <span className="text-muted-foreground flex items-center gap-1">
//                                         <Fuel className="w-3 h-3" />
//                                         Combustible:
//                                     </span>
//                                     <span className="font-medium">{vehicle.fuel}%</span>
//                                 </div>
//                                 <div className="w-full bg-muted rounded-full h-2">
//                                     <div
//                                         className={`h-2 rounded-full transition-all ${vehicle.fuel > 60 ? 'bg-green-500' :
//                                             vehicle.fuel > 30 ? 'bg-yellow-500' :
//                                                 'bg-red-500'
//                                             }`}
//                                         style={{ width: `${vehicle.fuel}%` }}
//                                     />
//                                 </div>
//                             </div>
//
//                             <Button
//                                 variant="outline"
//                                 className="w-full"
//                                 onClick={() => setDetailsVehicleId(vehicle.id)}
//                             >
//                                 Ver Detalles
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//
//             {/* Modals */}
//             <NewVehicleDialog open={newVehicleOpen} onOpenChange={setNewVehicleOpen} />
//             <VehicleDetailsDialog
//                 vehicleId={detailsVehicleId}
//                 open={detailsVehicleId !== null}
//                 onOpenChange={(open) => !open && setDetailsVehicleId(null)}
//             />
//             <Toaster />
//         </div>
//     )
// }


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