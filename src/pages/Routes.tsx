// import { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { MapPin, Navigation, Clock, TrendingUp, Zap, DollarSign } from 'lucide-react'
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'
// import { useRoutesStore } from '@/store/useRoutesStore'
// import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog'
// import { RouteOptimizer } from '@/components/routes/RouteOptimizer'
//
// // Fix for default marker icons in Leaflet
// // @ts-expect-error - Leaflet internal property workaround
// delete L.Icon.Default.prototype._getIconUrl
//
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// })
// // Component to update map view when center changes
// function MapUpdater({ center }: { center: [number, number] }) {
//     const map = useMap()
//     useEffect(() => {
//         map.setView(center, 13)
//     }, [center, map])
//     return null
// }
//
// export function Routes() {
//     const routes = useRoutesStore((state) => state.routes)
//     const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null)
//     const [isOptimizerOpen, setIsOptimizerOpen] = useState(false)
//
//     // Default center (Bogotá)
//     const defaultCenter: [number, number] = [4.6097, -74.0817]
//
//     const selectedRoute = selectedRouteId
//         ? routes.find(r => r.id === selectedRouteId)
//         : routes.length > 0 ? routes[0] : null
//
//     const mapCenter = selectedRoute && selectedRoute.stops.length > 0
//         ? selectedRoute.stops[0].coordinates
//         : defaultCenter
//
//     const routeCoordinates = selectedRoute
//         ? selectedRoute.stops.map(stop => stop.coordinates)
//         : []
//
//     // Calculate stats
//     const activeRoutes = routes.filter(r => r.status === 'active').length
//     const avgEfficiency = routes.length > 0
//         ? Math.round(routes.reduce((acc, curr) => acc + curr.efficiency, 0) / routes.length)
//         : 0
//     const totalSavings = routes.reduce((acc, curr) => acc + curr.savings, 0)
//
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h2 className="text-2xl font-bold">Optimización de Rutas</h2>
//                     <p className="text-muted-foreground">Planifica y optimiza tus rutas de entrega</p>
//                 </div>
//                 <Dialog open={isOptimizerOpen} onOpenChange={setIsOptimizerOpen}>
//                     <DialogTrigger asChild>
//                         <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
//                             <Zap className="w-4 h-4" />
//                             Optimizar Rutas
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//                         <DialogHeader>
//                             <DialogTitle>Optimización de Rutas</DialogTitle>
//                         </DialogHeader>
//                         <RouteOptimizer onOptimizationComplete={() => setIsOptimizerOpen(false)} />
//                     </DialogContent>
//                 </Dialog>
//             </div>
//
//             {/* Stats */}
//             <div className="grid gap-4 md:grid-cols-4">
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
//                                 <Navigation className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Rutas Activas</p>
//                                 <p className="text-2xl font-bold">{activeRoutes}</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
//                                 <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Eficiencia Prom.</p>
//                                 <p className="text-2xl font-bold">{avgEfficiency}%</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
//                                 <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Tiempo Ahorrado</p>
//                                 <p className="text-2xl font-bold">4.2h</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
//                                 <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Ahorro Total</p>
//                                 <p className="text-2xl font-bold">${totalSavings}</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//
//             {/* Map and Routes */}
//             <div className="grid gap-4 lg:grid-cols-3">
//                 {/* Map */}
//                 <Card className="border-0 shadow-lg lg:col-span-2">
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <MapPin className="w-5 h-5" />
//                             Mapa de Rutas {selectedRoute && `- ${selectedRoute.name}`}
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="h-[500px] rounded-lg overflow-hidden border z-0 relative">
//                             <MapContainer
//                                 center={mapCenter}
//                                 zoom={13}
//                                 style={{ height: '100%', width: '100%' }}
//                             >
//                                 <MapUpdater center={mapCenter} />
//                                 <TileLayer
//                                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 />
//                                 {routeCoordinates.length > 0 && (
//                                     <Polyline
//                                         positions={routeCoordinates}
//                                         color="#3b82f6"
//                                         weight={4}
//                                         opacity={0.7}
//                                     />
//                                 )}
//                                 {selectedRoute?.stops.map((stop, idx) => (
//                                     <Marker key={`${selectedRoute.id}-stop-${idx}`} position={stop.coordinates}>
//                                         <Popup>
//                                             <div className="p-2">
//                                                 <p className="font-bold">Parada {stop.sequence}</p>
//                                                 <p className="text-sm">{stop.address}</p>
//                                                 <p className="text-xs text-muted-foreground">Est: {stop.estimatedTime}</p>
//                                             </div>
//                                         </Popup>
//                                     </Marker>
//                                 ))}
//                             </MapContainer>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 {/* Routes List */}
//                 <Card className="border-0 shadow-lg">
//                     <CardHeader>
//                         <CardTitle>Rutas del Día</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
//                         {routes.length === 0 ? (
//                             <p className="text-muted-foreground text-center py-8">No hay rutas generadas aún.</p>
//                         ) : (
//                             routes.map((route) => (
//                                 <div
//                                     key={route.id}
//                                     onClick={() => setSelectedRouteId(route.id)}
//                                     className={`p-4 rounded-lg border transition-all cursor-pointer ${selectedRouteId === route.id || (!selectedRouteId && route === routes[0])
//                                         ? 'bg-accent border-blue-500 shadow-sm'
//                                         : 'hover:bg-accent/50'
//                                         }`}
//                                 >
//                                     <div className="flex items-start justify-between mb-2">
//                                         <div>
//                                             <p className="font-semibold text-sm">{route.name}</p>
//                                             <p className="text-xs text-muted-foreground">{route.id}</p>
//                                         </div>
//                                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${route.status === 'active'
//                                             ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
//                                             : route.status === 'completed'
//                                                 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
//                                                 : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
//                                             }`}>
//                                             {route.status === 'active' ? 'Activa' : route.status === 'completed' ? 'Completada' : 'Pendiente'}
//                                         </span>
//                                     </div>
//
//                                     <div className="space-y-1 text-xs text-muted-foreground">
//                                         <div className="flex items-center justify-between">
//                                             <span>Vehículo:</span>
//                                             <span className="font-medium text-foreground">{route.vehicleId}</span>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <span>Paradas:</span>
//                                             <span className="font-medium text-foreground">{route.stops.length}</span>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <span>Distancia:</span>
//                                             <span className="font-medium text-foreground">{route.distance} km</span>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <span>Tiempo Est.:</span>
//                                             <span className="font-medium text-foreground">{route.estimatedTime}</span>
//                                         </div>
//                                         {route.status !== 'pending' && (
//                                             <>
//                                                 <div className="flex items-center justify-between">
//                                                     <span>Eficiencia:</span>
//                                                     <span className="font-medium text-green-600 dark:text-green-400">
//                                                         {route.efficiency}%
//                                                     </span>
//                                                 </div>
//                                                 <div className="flex items-center justify-between">
//                                                     <span>Ahorro:</span>
//                                                     <span className="font-medium text-green-600 dark:text-green-400">
//                                                         ${route.savings}
//                                                     </span>
//                                                 </div>
//                                             </>
//                                         )}
//                                     </div>
//
//                                     <Button variant="outline" size="sm" className="w-full mt-3">
//                                         Ver Detalles
//                                     </Button>
//                                 </div>
//                             ))
//                         )}
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     )
// }

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Card } from "@/components/ui/card"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import {
//     MapPin,
//     Plus,
//     Trash2,
//     Zap,
//     Clock,
//     Fuel,
//     Route,
//     DollarSign,
//     ChevronRight,
//     GripVertical,
//     Navigation,
//     AlertTriangle,
// } from "lucide-react"
//
// const mockStops = [
//     { id: 1, address: "Av. Principal 123, Centro", customer: "Almacenes García", timeWindow: "10:30 - 11:00", priority: "alta" },
//     { id: 2, address: "Calle Norte 456", customer: "Supermercado El Sol", timeWindow: "11:00 - 12:00", priority: "normal" },
//     { id: 3, address: "Plaza Mayor 789", customer: "Farmacia Central", timeWindow: "11:30 - 12:30", priority: "urgente" },
//     { id: 4, address: "Av. Comercio 321", customer: "Restaurante La Mesa", timeWindow: "12:00 - 13:00", priority: "normal" },
// ]
//
// const vehicles = [
//     { id: "V-001", name: "Camión 3.5T", capacity: "3500 kg", available: true },
//     { id: "V-002", name: "Camioneta 1T", capacity: "1000 kg", available: true },
//     { id: "V-003", name: "Van Express", capacity: "800 kg", available: false },
//     { id: "V-004", name: "Moto Delivery", capacity: "50 kg", available: true },
// ]
//
// const optimizationResults = {
//     totalDistance: "45.2 km",
//     estimatedTime: "2h 35min",
//     fuelCost: "$85.50",
//     savings: "18%",
// }
//
// export function RoutePlanner() {
//     const [stops] = useState(mockStops)
//     const [selectedVehicle, setSelectedVehicle] = useState<string>("")
//     const [isOptimizing, setIsOptimizing] = useState(false)
//     const [showResults, setShowResults] = useState(false)
//
//     const handleOptimize = () => {
//         setIsOptimizing(true)
//         setTimeout(() => {
//             setIsOptimizing(false)
//             setShowResults(true)
//         }, 2000)
//     }
//
//     const priorityConfig = {
//         urgente: { label: "Urgente", className: "bg-destructive/20 text-destructive" },
//         alta: { label: "Alta", className: "bg-warning/20 text-warning" },
//         normal: { label: "Normal", className: "bg-muted text-muted-foreground" },
//     }
//
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-2xl font-bold text-foreground">Planificador de Rutas</h1>
//                     <p className="text-sm text-muted-foreground">
//                         Optimización multicriterio con IA
//                     </p>
//                 </div>
//             </div>
//
//             <div className="grid gap-6 lg:grid-cols-3">
//                 {/* Left Panel - Stops */}
//                 <div className="lg:col-span-2 space-y-4">
//                     {/* Vehicle Selection */}
//                     <Card className="p-4">
//                         <h3 className="text-sm font-medium text-foreground mb-3">Seleccionar Vehículo</h3>
//                         <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Elegir vehículo..." />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {vehicles.map((vehicle) => (
//                                     <SelectItem
//                                         key={vehicle.id}
//                                         value={vehicle.id}
//                                         disabled={!vehicle.available}
//                                     >
//                                         <div className="flex items-center gap-2">
//                                             <span>{vehicle.name}</span>
//                                             <span className="text-muted-foreground">({vehicle.capacity})</span>
//                                             {!vehicle.available && (
//                                                 <Badge variant="secondary" className="text-[10px]">
//                                                     No disponible
//                                                 </Badge>
//                                             )}
//                                         </div>
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </Card>
//
//                     {/* Stops List */}
//                     <Card className="p-4">
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-sm font-medium text-foreground">Paradas ({stops.length})</h3>
//                             <Button size="sm" variant="outline" className="gap-1">
//                                 <Plus className="h-4 w-4" />
//                                 Agregar
//                             </Button>
//                         </div>
//
//                         <div className="space-y-2">
//                             {stops.map((stop, index) => (
//                                 <div
//                                     key={stop.id}
//                                     className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted/50"
//                                 >
//                                     <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
//                                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
//                                         {index + 1}
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <div className="flex items-center gap-2">
//                       <span className="font-medium text-foreground truncate">
//                         {stop.customer}
//                       </span>
//                                             <Badge
//                                                 className={`text-[10px] px-1.5 ${
//                                                     priorityConfig[stop.priority as keyof typeof priorityConfig].className
//                                                 }`}
//                                             >
//                                                 {priorityConfig[stop.priority as keyof typeof priorityConfig].label}
//                                             </Badge>
//                                         </div>
//                                         <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
//                       <span className="flex items-center gap-1">
//                         <MapPin className="h-3 w-3" />
//                           {stop.address}
//                       </span>
//                                             <span className="flex items-center gap-1">
//                         <Clock className="h-3 w-3" />
//                                                 {stop.timeWindow}
//                       </span>
//                                         </div>
//                                     </div>
//                                     <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive">
//                                         <Trash2 className="h-4 w-4" />
//                                     </Button>
//                                 </div>
//                             ))}
//                         </div>
//
//                         {/* Add new stop */}
//                         <div className="mt-4 flex items-center gap-2">
//                             <Input placeholder="Agregar nueva dirección..." className="flex-1" />
//                             <Button size="icon" variant="secondary">
//                                 <Plus className="h-4 w-4" />
//                             </Button>
//                         </div>
//                     </Card>
//
//                     {/* Optimize Button */}
//                     <Button
//                         className="w-full gap-2 gradient-primary hover:opacity-90 h-12 text-base"
//                         onClick={handleOptimize}
//                         disabled={isOptimizing || stops.length === 0}
//                     >
//                         {isOptimizing ? (
//                             <>
//                                 <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
//                                 Optimizando...
//                             </>
//                         ) : (
//                             <>
//                                 <Zap className="h-5 w-5" />
//                                 Optimizar Ruta
//                             </>
//                         )}
//                     </Button>
//                 </div>
//
//                 {/* Right Panel - Results */}
//                 <div className="space-y-4">
//                     {/* Optimization Results */}
//                     {showResults && (
//                         <Card className="overflow-hidden animate-fade-up">
//                             <div className="bg-gradient-to-r from-success/20 via-success/10 to-transparent p-4 border-b border-border">
//                                 <div className="flex items-center gap-2">
//                                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success">
//                                         <Zap className="h-4 w-4 text-success-foreground" />
//                                     </div>
//                                     <div>
//                                         <h3 className="font-semibold text-foreground">Ruta Optimizada</h3>
//                                         <p className="text-xs text-muted-foreground">CVRPTW + A* Algorithm</p>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             <div className="p-4 space-y-4">
//                                 <div className="grid grid-cols-2 gap-3">
//                                     <div className="rounded-lg bg-muted/50 p-3">
//                                         <div className="flex items-center gap-2 text-muted-foreground mb-1">
//                                             <Route className="h-4 w-4" />
//                                             <span className="text-xs">Distancia</span>
//                                         </div>
//                                         <span className="text-lg font-bold text-foreground">
//                       {optimizationResults.totalDistance}
//                     </span>
//                                     </div>
//                                     <div className="rounded-lg bg-muted/50 p-3">
//                                         <div className="flex items-center gap-2 text-muted-foreground mb-1">
//                                             <Clock className="h-4 w-4" />
//                                             <span className="text-xs">Tiempo</span>
//                                         </div>
//                                         <span className="text-lg font-bold text-foreground">
//                       {optimizationResults.estimatedTime}
//                     </span>
//                                     </div>
//                                     <div className="rounded-lg bg-muted/50 p-3">
//                                         <div className="flex items-center gap-2 text-muted-foreground mb-1">
//                                             <Fuel className="h-4 w-4" />
//                                             <span className="text-xs">Combustible</span>
//                                         </div>
//                                         <span className="text-lg font-bold text-foreground">
//                       {optimizationResults.fuelCost}
//                     </span>
//                                     </div>
//                                     <div className="rounded-lg bg-success/10 p-3">
//                                         <div className="flex items-center gap-2 text-success mb-1">
//                                             <DollarSign className="h-4 w-4" />
//                                             <span className="text-xs">Ahorro</span>
//                                         </div>
//                                         <span className="text-lg font-bold text-success">
//                       {optimizationResults.savings}
//                     </span>
//                                     </div>
//                                 </div>
//
//                                 <Button className="w-full gap-2" variant="outline">
//                                     Ver en Mapa
//                                     <ChevronRight className="h-4 w-4" />
//                                 </Button>
//                             </div>
//                         </Card>
//                     )}
//
//                     {/* Traffic Alerts */}
//                     <Card className="p-4">
//                         <div className="flex items-center gap-2 mb-3">
//                             <AlertTriangle className="h-4 w-4 text-warning" />
//                             <h3 className="text-sm font-medium text-foreground">Alertas de Tráfico</h3>
//                         </div>
//                         <div className="space-y-2">
//                             <div className="rounded-lg bg-warning/10 border border-warning/20 p-3">
//                                 <p className="text-sm font-medium text-foreground">Zona Centro - Congestión alta</p>
//                                 <p className="text-xs text-muted-foreground mt-1">+15 min estimados</p>
//                             </div>
//                             <div className="rounded-lg bg-muted/50 p-3">
//                                 <p className="text-sm text-muted-foreground">Av. Norte - Tráfico normal</p>
//                             </div>
//                         </div>
//                     </Card>
//
//                     {/* Mini Map Preview */}
//                     <Card className="p-4">
//                         <h3 className="text-sm font-medium text-foreground mb-3">Vista Previa</h3>
//                         <div className="relative h-48 rounded-lg bg-muted/50 overflow-hidden">
//                             <svg className="absolute inset-0 h-full w-full opacity-20">
//                                 <defs>
//                                     <pattern id="grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
//                                         <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
//                                     </pattern>
//                                 </defs>
//                                 <rect width="100%" height="100%" fill="url(#grid-small)" />
//                             </svg>
//                             <div className="absolute inset-0 flex items-center justify-center">
//                                 <div className="text-center">
//                                     <Navigation className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
//                                     <p className="text-xs text-muted-foreground">Optimiza para ver la ruta</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     )
//}


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