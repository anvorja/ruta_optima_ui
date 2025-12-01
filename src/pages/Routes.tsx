//
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Zap } from "lucide-react"
import { StopsList } from "@/components/routes/StopsList"
import { OptimizationResults } from "@/components/routes/OptimizationResults"
import { TrafficAlerts } from "@/components/routes/TrafficAlerts"
import { MapPreview } from "@/components/routes/MapPreview"
import { Badge } from "@/components/ui/badge"

const mockStops: Array<{
    id: number
    address: string
    customer: string
    timeWindow: string
    priority: "urgente" | "alta" | "normal"
}> = [
    { id: 1, address: "Av. Principal 123, Centro", customer: "Almacenes García", timeWindow: "10:30 - 11:00", priority: "alta" },
    { id: 2, address: "Calle Norte 456", customer: "Supermercado El Sol", timeWindow: "11:00 - 12:00", priority: "normal" },
    { id: 3, address: "Plaza Mayor 789", customer: "Farmacia Central", timeWindow: "11:30 - 12:30", priority: "urgente" },
    { id: 4, address: "Av. Comercio 321", customer: "Restaurante La Mesa", timeWindow: "12:00 - 13:00", priority: "normal" },
]

const vehicles = [
    { id: "V-001", name: "Camión 3.5T", capacity: "3500 kg", available: true },
    { id: "V-002", name: "Camioneta 1T", capacity: "1000 kg", available: true },
    { id: "V-003", name: "Van Express", capacity: "800 kg", available: false },
    { id: "V-004", name: "Moto Delivery", capacity: "50 kg", available: true },
]

const optimizationResults = {
    totalDistance: "45.2 km",
    estimatedTime: "2h 35min",
    fuelCost: "$85.50",
    savings: "18%",
}

export function Routes() {
    const [stops, setStops] = useState(mockStops)
    const [selectedVehicle, setSelectedVehicle] = useState<string>("")
    const [isOptimizing, setIsOptimizing] = useState(false)
    const [showResults, setShowResults] = useState(false)

    const handleOptimize = () => {
        setIsOptimizing(true)
        setTimeout(() => {
            setIsOptimizing(false)
            setShowResults(true)
        }, 2000)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Planificador de Rutas</h1>
                    <p className="text-sm text-muted-foreground">
                        Optimización multicriterio con IA
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Panel - Stops */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Vehicle Selection */}
                    <Card className="p-4">
                        <h3 className="text-sm font-medium text-foreground mb-3">Seleccionar Vehículo</h3>
                        <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                            <SelectTrigger>
                                <SelectValue placeholder="Elegir vehículo..." />
                            </SelectTrigger>
                            <SelectContent>
                                {vehicles.map((vehicle) => (
                                    <SelectItem
                                        key={vehicle.id}
                                        value={vehicle.id}
                                        disabled={!vehicle.available}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>{vehicle.name}</span>
                                            <span className="text-muted-foreground">({vehicle.capacity})</span>
                                            {!vehicle.available && (
                                                <Badge variant="secondary" className="text-[10px]">
                                                    No disponible
                                                </Badge>
                                            )}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Card>

                    {/* Stops List */}
                    <Card className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-foreground">Paradas ({stops.length})</h3>
                            <Button size="sm" variant="outline" className="gap-1">
                                <Plus className="h-4 w-4" />
                                Agregar
                            </Button>
                        </div>

                        <StopsList stops={stops} onRemove={(id) => setStops(stops.filter(s => s.id !== id))} />

                        {/* Add new stop */}
                        <div className="mt-4 flex items-center gap-2">
                            <Input placeholder="Agregar nueva dirección..." className="flex-1" />
                            <Button size="icon" variant="secondary">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>

                    {/* Optimize Button */}
                    <Button
                        className="w-full gap-2 gradient-primary hover:opacity-90 h-12 text-base"
                        onClick={handleOptimize}
                        disabled={isOptimizing || stops.length === 0}
                    >
                        {isOptimizing ? (
                            <>
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                Optimizando...
                            </>
                        ) : (
                            <>
                                <Zap className="h-5 w-5" />
                                Optimizar Ruta
                            </>
                        )}
                    </Button>
                </div>

                {/* Right Panel - Results */}
                <div className="space-y-4">
                    {/* Optimization Results */}
                    {showResults && (
                        <OptimizationResults
                            totalDistance={optimizationResults.totalDistance}
                            estimatedTime={optimizationResults.estimatedTime}
                            fuelCost={optimizationResults.fuelCost}
                            savings={optimizationResults.savings}
                            onViewMap={() => console.log('Ver en mapa')}
                        />
                    )}

                    {/* Traffic Alerts */}
                    <TrafficAlerts />

                    {/* Mini Map Preview */}
                    <MapPreview hasRoute={showResults} />
                </div>
            </div>
        </div>
    )
}