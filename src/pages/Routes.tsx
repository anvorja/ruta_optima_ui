import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Navigation, Clock, TrendingUp, Zap, DollarSign } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useRoutesStore } from '@/store/useRoutesStore'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { RouteOptimizer } from '@/components/routes/RouteOptimizer'

// Fix for default marker icons in Leaflet
// @ts-expect-error - Leaflet internal property workaround
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})
// Component to update map view when center changes
function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap()
    useEffect(() => {
        map.setView(center, 13)
    }, [center, map])
    return null
}

export function Routes() {
    const routes = useRoutesStore((state) => state.routes)
    const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null)
    const [isOptimizerOpen, setIsOptimizerOpen] = useState(false)

    // Default center (Bogotá)
    const defaultCenter: [number, number] = [4.6097, -74.0817]

    const selectedRoute = selectedRouteId
        ? routes.find(r => r.id === selectedRouteId)
        : routes.length > 0 ? routes[0] : null

    const mapCenter = selectedRoute && selectedRoute.stops.length > 0
        ? selectedRoute.stops[0].coordinates
        : defaultCenter

    const routeCoordinates = selectedRoute
        ? selectedRoute.stops.map(stop => stop.coordinates)
        : []

    // Calculate stats
    const activeRoutes = routes.filter(r => r.status === 'active').length
    const avgEfficiency = routes.length > 0
        ? Math.round(routes.reduce((acc, curr) => acc + curr.efficiency, 0) / routes.length)
        : 0
    const totalSavings = routes.reduce((acc, curr) => acc + curr.savings, 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Optimización de Rutas</h2>
                    <p className="text-muted-foreground">Planifica y optimiza tus rutas de entrega</p>
                </div>
                <Dialog open={isOptimizerOpen} onOpenChange={setIsOptimizerOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                            <Zap className="w-4 h-4" />
                            Optimizar Rutas
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Optimización de Rutas</DialogTitle>
                        </DialogHeader>
                        <RouteOptimizer onOptimizationComplete={() => setIsOptimizerOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <Navigation className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Rutas Activas</p>
                                <p className="text-2xl font-bold">{activeRoutes}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Eficiencia Prom.</p>
                                <p className="text-2xl font-bold">{avgEfficiency}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Tiempo Ahorrado</p>
                                <p className="text-2xl font-bold">4.2h</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Ahorro Total</p>
                                <p className="text-2xl font-bold">${totalSavings}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Map and Routes */}
            <div className="grid gap-4 lg:grid-cols-3">
                {/* Map */}
                <Card className="border-0 shadow-lg lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Mapa de Rutas {selectedRoute && `- ${selectedRoute.name}`}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] rounded-lg overflow-hidden border z-0 relative">
                            <MapContainer
                                center={mapCenter}
                                zoom={13}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <MapUpdater center={mapCenter} />
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {routeCoordinates.length > 0 && (
                                    <Polyline
                                        positions={routeCoordinates}
                                        color="#3b82f6"
                                        weight={4}
                                        opacity={0.7}
                                    />
                                )}
                                {selectedRoute?.stops.map((stop, idx) => (
                                    <Marker key={`${selectedRoute.id}-stop-${idx}`} position={stop.coordinates}>
                                        <Popup>
                                            <div className="p-2">
                                                <p className="font-bold">Parada {stop.sequence}</p>
                                                <p className="text-sm">{stop.address}</p>
                                                <p className="text-xs text-muted-foreground">Est: {stop.estimatedTime}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Routes List */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle>Rutas del Día</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {routes.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">No hay rutas generadas aún.</p>
                        ) : (
                            routes.map((route) => (
                                <div
                                    key={route.id}
                                    onClick={() => setSelectedRouteId(route.id)}
                                    className={`p-4 rounded-lg border transition-all cursor-pointer ${selectedRouteId === route.id || (!selectedRouteId && route === routes[0])
                                        ? 'bg-accent border-blue-500 shadow-sm'
                                        : 'hover:bg-accent/50'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="font-semibold text-sm">{route.name}</p>
                                            <p className="text-xs text-muted-foreground">{route.id}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${route.status === 'active'
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                            : route.status === 'completed'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                            {route.status === 'active' ? 'Activa' : route.status === 'completed' ? 'Completada' : 'Pendiente'}
                                        </span>
                                    </div>

                                    <div className="space-y-1 text-xs text-muted-foreground">
                                        <div className="flex items-center justify-between">
                                            <span>Vehículo:</span>
                                            <span className="font-medium text-foreground">{route.vehicleId}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Paradas:</span>
                                            <span className="font-medium text-foreground">{route.stops.length}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Distancia:</span>
                                            <span className="font-medium text-foreground">{route.distance} km</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Tiempo Est.:</span>
                                            <span className="font-medium text-foreground">{route.estimatedTime}</span>
                                        </div>
                                        {route.status !== 'pending' && (
                                            <>
                                                <div className="flex items-center justify-between">
                                                    <span>Eficiencia:</span>
                                                    <span className="font-medium text-green-600 dark:text-green-400">
                                                        {route.efficiency}%
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Ahorro:</span>
                                                    <span className="font-medium text-green-600 dark:text-green-400">
                                                        ${route.savings}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <Button variant="outline" size="sm" className="w-full mt-3">
                                        Ver Detalles
                                    </Button>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
