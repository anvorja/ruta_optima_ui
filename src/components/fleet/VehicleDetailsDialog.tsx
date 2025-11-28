import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useFleetStore } from '@/store/useFleetStore'
import { Truck, Fuel, Package, MapPin, Wrench } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface VehicleDetailsDialogProps {
    vehicleId: string | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

const statusLabels = {
    active: 'En Ruta',
    available: 'Disponible',
    maintenance: 'Mantenimiento',
    inactive: 'Inactivo'
}

const statusColors = {
    active: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    available: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    maintenance: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
}

export function VehicleDetailsDialog({ vehicleId, open, onOpenChange }: VehicleDetailsDialogProps) {
    const getVehicleById = useFleetStore((state) => state.getVehicleById)
    const vehicle = vehicleId ? getVehicleById(vehicleId) : null

    if (!vehicle) return null

    const capacityPercentage = (vehicle.currentLoad / vehicle.capacity) * 100

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>Detalles del Vehículo</DialogTitle>
                        <Badge className={statusColors[vehicle.status]}>
                            {statusLabels[vehicle.status]}
                        </Badge>
                    </div>
                    <DialogDescription>
                        {vehicle.id} - {vehicle.plate}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Vehicle Info */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            INFORMACIÓN DEL VEHÍCULO
                        </h3>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">Nombre</p>
                                <p className="text-base font-medium">{vehicle.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Tipo</p>
                                <p className="text-base font-medium">{vehicle.type}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Placa</p>
                                <p className="text-base font-medium">{vehicle.plate}</p>
                            </div>
                            {vehicle.year && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Año</p>
                                    <p className="text-base font-medium">{vehicle.year}</p>
                                </div>
                            )}
                            {vehicle.fuelType && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Tipo de Combustible</p>
                                    <p className="text-base font-medium">{vehicle.fuelType}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Driver and Location */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground">CONDUCTOR</h3>
                            <p className="text-base font-medium">{vehicle.driver}</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                UBICACIÓN
                            </h3>
                            <p className="text-base font-medium">{vehicle.location}</p>
                        </div>
                    </div>

                    {/* Capacity */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            CAPACIDAD
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>{vehicle.currentLoad} kg / {vehicle.capacity} kg</span>
                                <span className="font-medium">{capacityPercentage.toFixed(0)}%</span>
                            </div>
                            <Progress value={capacityPercentage} className="h-2" />
                        </div>
                    </div>

                    {/* Fuel */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                            <Fuel className="w-4 h-4" />
                            COMBUSTIBLE
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Nivel de combustible</span>
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
                    </div>

                    {/* Maintenance */}
                    {vehicle.lastMaintenance && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <Wrench className="w-4 h-4" />
                                ÚLTIMO MANTENIMIENTO
                            </h3>
                            <p className="text-base">
                                {format(vehicle.lastMaintenance, "d 'de' MMMM, yyyy", { locale: es })}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
