// src/components/routes/RouteOptimizer.tsx
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Zap, TrendingUp, Clock, DollarSign, MapPin } from 'lucide-react'
import { useOrdersStore } from '@/store/useOrdersStore'
import { useFleetStore } from '@/store/useFleetStore'
import { useRoutesStore } from '@/store/useRoutesStore'
import { optimizeRoutes, type OptimizationResult } from '@/services/optimizationService'
import { useToast } from '@/components/ui/use-toast'

interface RouteOptimizerProps {
    onOptimizationComplete?: (result: OptimizationResult) => void
}

export function RouteOptimizer({ onOptimizationComplete }: RouteOptimizerProps) {
    const { toast } = useToast()
    const orders = useOrdersStore((state) => state.orders)
    const vehicles = useFleetStore((state) => state.vehicles)
    const { optimizationCriteria, setOptimizationCriteria, addRoute } = useRoutesStore()

    const [isOptimizing, setIsOptimizing] = useState(false)
    const [result, setResult] = useState<OptimizationResult | null>(null)

    const handleOptimize = async () => {
        setIsOptimizing(true)

        // Simulate optimization delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        try {
            const optimizationResult = optimizeRoutes(
                orders,
                vehicles,
                optimizationCriteria
            )

            setResult(optimizationResult)

            // Add optimized routes to store
            optimizationResult.routes.forEach(route => {
                addRoute(route)
            })

            toast({
                title: "Optimización completada",
                description: `Se crearon ${optimizationResult.routes.length} rutas optimizadas.`,
            })

            onOptimizationComplete?.(optimizationResult)
        } catch {
            toast({
                title: "Error",
                description: "No se pudo completar la optimización.",
                variant: "destructive"
            })
        } finally {
            setIsOptimizing(false)
        }
    }

    const pendingOrders = orders.filter(o => o.status === 'pending').length
    const availableVehicles = vehicles.filter(v => v.status === 'available' || v.status === 'active').length

    return (
        <div className="space-y-4">
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Optimizador de Rutas
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Current Status */}
                    <div className="grid gap-3 md:grid-cols-2 p-4 bg-muted/50 rounded-lg">
                        <div>
                            <p className="text-sm text-muted-foreground">Órdenes Pendientes</p>
                            <p className="text-2xl font-bold">{pendingOrders}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Vehículos Disponibles</p>
                            <p className="text-2xl font-bold">{availableVehicles}</p>
                        </div>
                    </div>

                    {/* Optimization Criteria */}
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <Label>Prioridad de Optimización</Label>
                            <Select
                                value={optimizationCriteria.priority}
                                onValueChange={(value: 'time' | 'distance' | 'cost') =>
                                    setOptimizationCriteria({ priority: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="time">Tiempo</SelectItem>
                                    <SelectItem value="distance">Distancia</SelectItem>
                                    <SelectItem value="cost">Costo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Máximo de Paradas por Ruta</Label>
                            <Input
                                type="number"
                                min="1"
                                max="20"
                                value={optimizationCriteria.maxStopsPerRoute}
                                onChange={(e) =>
                                    setOptimizationCriteria({ maxStopsPerRoute: parseInt(e.target.value) })
                                }
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="considerTraffic"
                                checked={optimizationCriteria.considerTraffic}
                                onChange={(e) =>
                                    setOptimizationCriteria({ considerTraffic: e.target.checked })
                                }
                                className="w-4 h-4"
                            />
                            <Label htmlFor="considerTraffic" className="font-normal">
                                Considerar tráfico en tiempo real
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="respectTimeWindows"
                                checked={optimizationCriteria.respectTimeWindows}
                                onChange={(e) =>
                                    setOptimizationCriteria({ respectTimeWindows: e.target.checked })
                                }
                                className="w-4 h-4"
                            />
                            <Label htmlFor="respectTimeWindows" className="font-normal">
                                Respetar ventanas de tiempo
                            </Label>
                        </div>
                    </div>

                    <Button
                        onClick={handleOptimize}
                        disabled={isOptimizing || pendingOrders === 0 || availableVehicles === 0}
                        className="w-full gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                        <Zap className="w-4 h-4" />
                        {isOptimizing ? 'Optimizando...' : 'Optimizar Rutas'}
                    </Button>
                </CardContent>
            </Card>

            {/* Results */}
            {result && result.routes.length > 0 && (
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle>Resultados de Optimización</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Rutas Creadas</p>
                                    <p className="text-2xl font-bold">{result.routes.length}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Distancia Total</p>
                                    <p className="text-2xl font-bold">{result.totalDistance} km</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Tiempo Total</p>
                                    <p className="text-2xl font-bold">{result.totalTime}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Ahorro Estimado</p>
                                    <p className="text-2xl font-bold">${result.totalSavings}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium mb-2">Rutas Generadas:</p>
                            <div className="space-y-2">
                                {result.routes.map((route) => (
                                    <div key={route.id} className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{route.name}</span>
                                        <div className="flex items-center gap-4 text-muted-foreground">
                                            <span>{route.stops.length} paradas</span>
                                            <span>{route.distance} km</span>
                                            <span className="text-green-600 dark:text-green-400">
                                                {route.efficiency}% eficiencia
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
