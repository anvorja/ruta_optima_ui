import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Truck, Search, Plus, Fuel, Package, Activity } from 'lucide-react'
import { NewVehicleDialog } from '@/components/fleet/NewVehicleDialog'
import { VehicleDetailsDialog } from '@/components/fleet/VehicleDetailsDialog'
import { useFleetStore } from '@/store/useFleetStore'
import { Toaster } from '@/components/ui/toaster'



const statusConfig = {
    active: { label: 'En Ruta', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
    available: { label: 'Disponible', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
    maintenance: { label: 'Mantenimiento', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
}

export function Fleet() {
    const vehicles = useFleetStore((state) => state.vehicles)
    const [newVehicleOpen, setNewVehicleOpen] = useState(false)
    const [detailsVehicleId, setDetailsVehicleId] = useState<string | null>(null)
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Gestión de Flota</h2>
                    <p className="text-muted-foreground">Administra tus vehículos y conductores</p>
                </div>
                <Button className="gap-2" onClick={() => setNewVehicleOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Agregar Vehículo
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Vehículos</p>
                                <p className="text-2xl font-bold">25</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">En Ruta</p>
                                <p className="text-2xl font-bold">12</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Disponibles</p>
                                <p className="text-2xl font-bold">11</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                <Fuel className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Combustible Prom.</p>
                                <p className="text-2xl font-bold">72%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Buscar vehículos..." className="pl-10" />
                    </div>
                </CardContent>
            </Card>

            {/* Vehicles Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                        <Truck className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{vehicle.plate}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[vehicle.status as keyof typeof statusConfig].color}`}>
                                    {statusConfig[vehicle.status as keyof typeof statusConfig].label}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Driver */}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Conductor:</span>
                                <span className="font-medium">{vehicle.driver}</span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Ubicación:</span>
                                <span className="font-medium">{vehicle.location}</span>
                            </div>

                            {/* Capacity */}
                            <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">Capacidad:</span>
                                    <span className="font-medium">{vehicle.currentLoad} / {vehicle.capacity} kg</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                                        style={{ width: `${(vehicle.currentLoad / vehicle.capacity) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Fuel */}
                            <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-muted-foreground flex items-center gap-1">
                                        <Fuel className="w-3 h-3" />
                                        Combustible:
                                    </span>
                                    <span className="font-medium">{vehicle.fuel}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all ${vehicle.fuel > 60 ? 'bg-green-500' :
                                            vehicle.fuel > 30 ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}
                                        style={{ width: `${vehicle.fuel}%` }}
                                    />
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setDetailsVehicleId(vehicle.id)}
                            >
                                Ver Detalles
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modals */}
            <NewVehicleDialog open={newVehicleOpen} onOpenChange={setNewVehicleOpen} />
            <VehicleDetailsDialog
                vehicleId={detailsVehicleId}
                open={detailsVehicleId !== null}
                onOpenChange={(open) => !open && setDetailsVehicleId(null)}
            />
            <Toaster />
        </div>
    )
}
