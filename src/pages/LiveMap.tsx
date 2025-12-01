// // src/pages/LiveMap.tsx
// import { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import {
//     MapPin,
//     Navigation,
//     Maximize2,
//     Minimize2,
//     RefreshCw,
//     Truck,
//     AlertCircle,
//     Zap,
//     Clock,
// } from 'lucide-react'
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'
// import { useFleetStore } from '@/store/useFleetStore'
// import { useRoutesStore } from '@/store/useRoutesStore'
//
// // Fix for default marker icons in Leaflet
// // @ts-expect-error - Leaflet internal property workaround
// delete L.Icon.Default.prototype._getIconUrl
//
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl:
//         'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl:
//         'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// })
//
// // Custom icons for different vehicle states
// const createVehicleIcon = (status: string) => {
//     const colors = {
//         active: '#10b981', // green
//         available: '#3b82f6', // blue
//         maintenance: '#f59e0b', // orange
//         inactive: '#6b7280', // gray
//     }
//
//     const color = colors[status as keyof typeof colors] || colors.inactive
//
//     return L.divIcon({
//         html: `
//       <div style="position: relative;">
//         <div style="
//           width: 32px;
//           height: 32px;
//           background: ${color};
//           border: 3px solid white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//         ">
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
//             <path d="M14 16l-4-4 4-4"></path>
//           </svg>
//         </div>
//         ${status === 'active' ? '<div style="position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; background: #ef4444; border: 2px solid white; border-radius: 50%; animation: pulse 2s infinite;"></div>' : ''}
//       </div>
//     `,
//         className: 'custom-vehicle-icon',
//         iconSize: [32, 32],
//         iconAnchor: [16, 16],
//     })
// }
//
// // Component to update map view
// function MapUpdater({ center }: { center: [number, number] }) {
//     const map = useMap()
//     useEffect(() => {
//         map.setView(center, 12)
//     }, [center, map])
//     return null
// }
//
// export function LiveMap() {
//     const vehicles = useFleetStore((state) => state.vehicles)
//     const routes = useRoutesStore((state) => state.routes)
//     const [isFullscreen, setIsFullscreen] = useState(false)
//     const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
//     const [lastUpdate, setLastUpdate] = useState(new Date())
//
//     // Default center (Bogotá, Colombia)
//     const defaultCenter: [number, number] = [4.6097, -74.0817]
//
//     // Simular actualización en tiempo real cada 5 segundos
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setLastUpdate(new Date())
//         }, 5000)
//         return () => clearInterval(interval)
//     }, [])
//
//     const handleRefresh = () => {
//         setLastUpdate(new Date())
//     }
//
//     // Estadísticas
//     const activeVehicles = vehicles.filter((v) => v.status === 'active').length
//     const activeRoutes = routes.filter((r) => r.status === 'active').length
//
//     // Mock de posiciones de vehículos (en producción vendrían del backend)
//     const vehiclePositions = vehicles.map((vehicle) => ({
//         ...vehicle,
//         // Posiciones simuladas alrededor de Bogotá
//         position: [
//             4.6097 + (Math.random() - 0.5) * 0.1,
//             -74.0817 + (Math.random() - 0.5) * 0.1,
//         ] as [number, number],
//         speed: vehicle.status === 'active' ? Math.floor(Math.random() * 60) + 20 : 0,
//     }))
//
//     // Obtener rutas activas con coordenadas
//     const activeRoutesWithCoords = routes
//         .filter((r) => r.status === 'active')
//         .map((route) => ({
//             ...route,
//             coordinates: route.stops.map((stop) => stop.coordinates),
//         }))
//
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                     <h1 className="text-2xl font-bold text-foreground">Mapa en Vivo</h1>
//                     <p className="text-sm text-muted-foreground">
//                         Seguimiento en tiempo real · Última actualización:{' '}
//                         {lastUpdate.toLocaleTimeString('es-ES')}
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
//                         <RefreshCw className="h-4 w-4" />
//                         Actualizar
//                     </Button>
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setIsFullscreen(!isFullscreen)}
//                         className="gap-2"
//                     >
//                         {isFullscreen ? (
//                             <>
//                                 <Minimize2 className="h-4 w-4" />
//                                 Salir
//                             </>
//                         ) : (
//                             <>
//                                 <Maximize2 className="h-4 w-4" />
//                                 Pantalla completa
//                             </>
//                         )}
//                     </Button>
//                 </div>
//             </div>
//
//             {/* Stats Cards */}
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/20">
//                                 <Truck className="h-5 w-5 text-success" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">{activeVehicles}</p>
//                                 <p className="text-xs text-muted-foreground">Vehículos activos</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
//                                 <Navigation className="h-5 w-5 text-primary" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">{activeRoutes}</p>
//                                 <p className="text-xs text-muted-foreground">Rutas en progreso</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/20">
//                                 <Clock className="h-5 w-5 text-warning" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">23 min</p>
//                                 <p className="text-xs text-muted-foreground">Tiempo promedio</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
//                                 <Zap className="h-5 w-5 text-muted-foreground" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">92%</p>
//                                 <p className="text-xs text-muted-foreground">Eficiencia</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//
//             {/* Map and Vehicle List */}
//             <div className={`grid gap-6 ${isFullscreen ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
//                 {/* Map */}
//                 <Card
//                     className={`border-0 shadow-lg ${isFullscreen ? 'lg:col-span-1' : 'lg:col-span-2'}`}
//                 >
//                     <CardHeader>
//                         <div className="flex items-center justify-between">
//                             <CardTitle className="flex items-center gap-2">
//                                 <MapPin className="h-5 w-5 text-primary" />
//                                 Rastreo en Tiempo Real
//                             </CardTitle>
//                             <Badge variant="outline" className="gap-1 bg-muted">
//                                 <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                                 En vivo
//                             </Badge>
//                         </div>
//                     </CardHeader>
//                     <CardContent>
//                         <div
//                             className={`rounded-lg overflow-hidden border ${isFullscreen ? 'h-[calc(100vh-20rem)]' : 'h-[500px]'}`}
//                         >
//                             <MapContainer
//                                 center={defaultCenter}
//                                 zoom={12}
//                                 style={{ height: '100%', width: '100%' }}
//                             >
//                                 <MapUpdater center={defaultCenter} />
//                                 <TileLayer
//                                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 />
//
//                                 {/* Rutas activas */}
//                                 {activeRoutesWithCoords.map((route) => (
//                                     <Polyline
//                                         key={route.id}
//                                         positions={route.coordinates}
//                                         color="#3b82f6"
//                                         weight={3}
//                                         opacity={0.6}
//                                         dashArray="5, 10"
//                                     />
//                                 ))}
//
//                                 {/* Vehículos */}
//                                 {vehiclePositions.map((vehicle) => (
//                                     <Marker
//                                         key={vehicle.id}
//                                         position={vehicle.position}
//                                         icon={createVehicleIcon(vehicle.status)}
//                                         eventHandlers={{
//                                             click: () => setSelectedVehicleId(vehicle.id),
//                                         }}
//                                     >
//                                         <Popup>
//                                             <div className="p-2 space-y-1">
//                                                 <p className="font-bold text-sm">{vehicle.name}</p>
//                                                 <p className="text-xs text-muted-foreground">{vehicle.id}</p>
//                                                 <div className="space-y-0.5 text-xs mt-2">
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Conductor:</span>
//                                                         <span className="font-medium">{vehicle.driver}</span>
//                                                     </div>
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Estado:</span>
//                                                         <Badge
//                                                             variant="outline"
//                                                             className={
//                                                                 vehicle.status === 'active'
//                                                                     ? 'bg-success/20 text-success'
//                                                                     : 'bg-muted'
//                                                             }
//                                                         >
//                                                             {vehicle.status === 'active' ? 'En ruta' : 'Disponible'}
//                                                         </Badge>
//                                                     </div>
//                                                     {vehicle.speed > 0 && (
//                                                         <div className="flex items-center justify-between gap-4">
//                                                             <span className="text-muted-foreground">Velocidad:</span>
//                                                             <span className="font-medium">{vehicle.speed} km/h</span>
//                                                         </div>
//                                                     )}
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Combustible:</span>
//                                                         <span
//                                                             className={`font-medium ${vehicle.fuel < 30 ? 'text-destructive' : 'text-success'}`}
//                                                         >
//                               {vehicle.fuel}%
//                             </span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </Popup>
//                                     </Marker>
//                                 ))}
//                             </MapContainer>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 {/* Vehicle List */}
//                 {!isFullscreen && (
//                     <Card className="border-0 shadow-lg">
//                         <CardHeader>
//                             <CardTitle>Vehículos Activos</CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
//                             {vehiclePositions
//                                 .filter((v) => v.status === 'active' || v.status === 'available')
//                                 .map((vehicle) => (
//                                     <div
//                                         key={vehicle.id}
//                                         onClick={() => setSelectedVehicleId(vehicle.id)}
//                                         className={`p-3 rounded-lg border transition-all cursor-pointer ${
//                                             selectedVehicleId === vehicle.id
//                                                 ? 'bg-accent border-primary shadow-sm'
//                                                 : 'hover:bg-accent/50'
//                                         }`}
//                                     >
//                                         <div className="flex items-start justify-between mb-2">
//                                             <div className="flex items-center gap-2">
//                                                 <div
//                                                     className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
//                                                         vehicle.status === 'active' ? 'bg-success/20' : 'bg-muted'
//                                                     }`}
//                                                 >
//                                                     <Truck
//                                                         className={`h-4 w-4 ${vehicle.status === 'active' ? 'text-success' : 'text-muted-foreground'}`}
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-semibold text-sm">{vehicle.name}</p>
//                                                     <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
//                                                 </div>
//                                             </div>
//                                             {vehicle.status === 'active' && (
//                                                 <span className="flex items-center gap-1 text-xs text-success">
//                           <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                           En ruta
//                         </span>
//                                             )}
//                                         </div>
//
//                                         <div className="space-y-1 text-xs text-muted-foreground">
//                                             <div className="flex items-center justify-between">
//                                                 <span>Ubicación:</span>
//                                                 <span className="font-medium text-foreground">{vehicle.location}</span>
//                                             </div>
//                                             {vehicle.speed > 0 && (
//                                                 <div className="flex items-center justify-between">
//                                                     <span>Velocidad:</span>
//                                                     <span className="font-medium text-foreground">{vehicle.speed} km/h</span>
//                                                 </div>
//                                             )}
//                                             <div className="flex items-center justify-between">
//                                                 <span>Combustible:</span>
//                                                 <span
//                                                     className={`font-medium ${vehicle.fuel < 30 ? 'text-destructive' : 'text-foreground'}`}
//                                                 >
//                           {vehicle.fuel}%
//                         </span>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <span>Carga:</span>
//                                                 <span className="font-medium text-foreground">
//                           {vehicle.currentLoad}/{vehicle.capacity} kg
//                         </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//
//                             {vehiclePositions.filter((v) => v.status === 'active' || v.status === 'available')
//                                 .length === 0 && (
//                                 <div className="text-center py-8 text-muted-foreground">
//                                     <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                                     <p className="text-sm">No hay vehículos activos</p>
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>
//                 )}
//             </div>
//
//             {/* CSS for pulse animation */}
//             <style>{`
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.5;
//           }
//         }
//       `}</style>
//         </div>
//     )
// }


// // v2 -a
// /* eslint-disable react-hooks/purity */
// // src/pages/LiveMap.tsx
// import { useState, useEffect, useMemo } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import {
//     MapPin,
//     Navigation,
//     Maximize2,
//     Minimize2,
//     RefreshCw,
//     Truck,
//     AlertCircle,
//     Zap,
//     Clock,
// } from 'lucide-react'
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'
// import { useFleetStore } from '@/store/useFleetStore'
// import { useRoutesStore } from '@/store/useRoutesStore'
//
// // Fix for default marker icons in Leaflet
// // @ts-expect-error - Leaflet internal property workaround
// delete L.Icon.Default.prototype._getIconUrl
//
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl:
//         'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl:
//         'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// })
//
// // Custom icons for different vehicle states
// const createVehicleIcon = (status: string) => {
//     const colors = {
//         active: '#10b981', // green
//         available: '#3b82f6', // blue
//         maintenance: '#f59e0b', // orange
//         inactive: '#6b7280', // gray
//     }
//
//     const color = colors[status as keyof typeof colors] || colors.inactive
//
//     return L.divIcon({
//         html: `
//       <div style="position: relative;">
//         <div style="
//           width: 32px;
//           height: 32px;
//           background: ${color};
//           border: 3px solid white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//         ">
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
//             <path d="M14 16l-4-4 4-4"></path>
//           </svg>
//         </div>
//         ${status === 'active' ? '<div style="position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; background: #ef4444; border: 2px solid white; border-radius: 50%; animation: pulse 2s infinite;"></div>' : ''}
//       </div>
//     `,
//         className: 'custom-vehicle-icon',
//         iconSize: [32, 32],
//         iconAnchor: [16, 16],
//     })
// }
//
// // Component to update map view
// function MapUpdater({ center }: { center: [number, number] }) {
//     const map = useMap()
//     useEffect(() => {
//         map.setView(center, 12)
//     }, [center, map])
//     return null
// }
//
// export function LiveMap() {
//     const vehicles = useFleetStore((state) => state.vehicles)
//     const routes = useRoutesStore((state) => state.routes)
//     const [isFullscreen, setIsFullscreen] = useState(false)
//     const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
//     const [lastUpdate, setLastUpdate] = useState(new Date())
//
//     // Default center (Bogotá, Colombia)
//     const defaultCenter: [number, number] = [4.6097, -74.0817]
//
//     // Simular actualización en tiempo real cada 5 segundos
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setLastUpdate(new Date())
//         }, 5000)
//         return () => clearInterval(interval)
//     }, [])
//
//     const handleRefresh = () => {
//         setLastUpdate(new Date())
//     }
//
//     // Estadísticas
//     const activeVehicles = vehicles.filter((v) => v.status === 'active').length
//     const activeRoutes = routes.filter((r) => r.status === 'active').length
//
//     // Mock de posiciones de vehículos (en producción vendrían del backend)
//     // Usamos useMemo para evitar Math.random() en cada render (impure function)
//     const vehiclePositions = useMemo(
//         () =>
//             vehicles.map((vehicle) => ({
//                 ...vehicle,
//                 // Posiciones simuladas alrededor de Bogotá
//                 position: [
//                     4.6097 + (Math.random() - 0.5) * 0.1,
//                     -74.0817 + (Math.random() - 0.5) * 0.1,
//                 ] as [number, number],
//                 speed: vehicle.status === 'active' ? Math.floor(Math.random() * 60) + 20 : 0,
//             })),
//         // Solo recalcular cuando cambie lastUpdate (cada 5 s) o la lista de vehículos
//         [lastUpdate, vehicles]
//     )
//
//     // Obtener rutas activas con coordenadas
//     const activeRoutesWithCoords = routes
//         .filter((r) => r.status === 'active')
//         .map((route) => ({
//             ...route,
//             coordinates: route.stops.map((stop) => stop.coordinates),
//         }))
//
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                     <h1 className="text-2xl font-bold text-foreground">Mapa en Vivo</h1>
//                     <p className="text-sm text-muted-foreground">
//                         Seguimiento en tiempo real · Última actualización:{' '}
//                         {lastUpdate.toLocaleTimeString('es-ES')}
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
//                         <RefreshCw className="h-4 w-4" />
//                         Actualizar
//                     </Button>
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setIsFullscreen(!isFullscreen)}
//                         className="gap-2"
//                     >
//                         {isFullscreen ? (
//                             <>
//                                 <Minimize2 className="h-4 w-4" />
//                                 Salir
//                             </>
//                         ) : (
//                             <>
//                                 <Maximize2 className="h-4 w-4" />
//                                 Pantalla completa
//                             </>
//                         )}
//                     </Button>
//                 </div>
//             </div>
//
//             {/* Stats Cards */}
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/20">
//                                 <Truck className="h-5 w-5 text-success" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">{activeVehicles}</p>
//                                 <p className="text-xs text-muted-foreground">Vehículos activos</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
//                                 <Navigation className="h-5 w-5 text-primary" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">{activeRoutes}</p>
//                                 <p className="text-xs text-muted-foreground">Rutas en progreso</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/20">
//                                 <Clock className="h-5 w-5 text-warning" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">23 min</p>
//                                 <p className="text-xs text-muted-foreground">Tiempo promedio</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
//                                 <Zap className="h-5 w-5 text-muted-foreground" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">92%</p>
//                                 <p className="text-xs text-muted-foreground">Eficiencia</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//
//             {/* Map and Vehicle List */}
//             <div className={`grid gap-6 ${isFullscreen ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
//                 {/* Map */}
//                 <Card
//                     className={`border-0 shadow-lg ${isFullscreen ? 'lg:col-span-1' : 'lg:col-span-2'}`}
//                 >
//                     <CardHeader>
//                         <div className="flex items-center justify-between">
//                             <CardTitle className="flex items-center gap-2">
//                                 <MapPin className="h-5 w-5 text-primary" />
//                                 Rastreo en Tiempo Real
//                             </CardTitle>
//                             <Badge variant="outline" className="gap-1 bg-muted">
//                                 <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                                 En vivo
//                             </Badge>
//                         </div>
//                     </CardHeader>
//                     <CardContent>
//                         <div
//                             className={`rounded-lg overflow-hidden border ${isFullscreen ? 'h-[calc(100vh-20rem)]' : 'h-[500px]'}`}
//                         >
//                             <MapContainer
//                                 center={defaultCenter}
//                                 zoom={12}
//                                 style={{ height: '100%', width: '100%' }}
//                             >
//                                 <MapUpdater center={defaultCenter} />
//                                 <TileLayer
//                                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 />
//
//                                 {/* Rutas activas */}
//                                 {activeRoutesWithCoords.map((route) => (
//                                     <Polyline
//                                         key={route.id}
//                                         positions={route.coordinates}
//                                         color="#3b82f6"
//                                         weight={3}
//                                         opacity={0.6}
//                                         dashArray="5, 10"
//                                     />
//                                 ))}
//
//                                 {/* Vehículos */}
//                                 {vehiclePositions.map((vehicle) => (
//                                     <Marker
//                                         key={vehicle.id}
//                                         position={vehicle.position}
//                                         icon={createVehicleIcon(vehicle.status)}
//                                         eventHandlers={{
//                                             click: () => setSelectedVehicleId(vehicle.id),
//                                         }}
//                                     >
//                                         <Popup>
//                                             <div className="p-2 space-y-1">
//                                                 <p className="font-bold text-sm">{vehicle.name}</p>
//                                                 <p className="text-xs text-muted-foreground">{vehicle.id}</p>
//                                                 <div className="space-y-0.5 text-xs mt-2">
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Conductor:</span>
//                                                         <span className="font-medium">{vehicle.driver}</span>
//                                                     </div>
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Estado:</span>
//                                                         <Badge
//                                                             variant="outline"
//                                                             className={
//                                                                 vehicle.status === 'active'
//                                                                     ? 'bg-success/20 text-success'
//                                                                     : 'bg-muted'
//                                                             }
//                                                         >
//                                                             {vehicle.status === 'active' ? 'En ruta' : 'Disponible'}
//                                                         </Badge>
//                                                     </div>
//                                                     {vehicle.speed > 0 && (
//                                                         <div className="flex items-center justify-between gap-4">
//                                                             <span className="text-muted-foreground">Velocidad:</span>
//                                                             <span className="font-medium">{vehicle.speed} km/h</span>
//                                                         </div>
//                                                     )}
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Combustible:</span>
//                                                         <span
//                                                             className={`font-medium ${vehicle.fuel < 30 ? 'text-destructive' : 'text-success'}`}
//                                                         >
//                               {vehicle.fuel}%
//                             </span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </Popup>
//                                     </Marker>
//                                 ))}
//                             </MapContainer>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 {/* Vehicle List */}
//                 {!isFullscreen && (
//                     <Card className="border-0 shadow-lg">
//                         <CardHeader>
//                             <CardTitle>Vehículos Activos</CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
//                             {vehiclePositions
//                                 .filter((v) => v.status === 'active' || v.status === 'available')
//                                 .map((vehicle) => (
//                                     <div
//                                         key={vehicle.id}
//                                         onClick={() => setSelectedVehicleId(vehicle.id)}
//                                         className={`p-3 rounded-lg border transition-all cursor-pointer ${
//                                             selectedVehicleId === vehicle.id
//                                                 ? 'bg-accent border-primary shadow-sm'
//                                                 : 'hover:bg-accent/50'
//                                         }`}
//                                     >
//                                         <div className="flex items-start justify-between mb-2">
//                                             <div className="flex items-center gap-2">
//                                                 <div
//                                                     className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
//                                                         vehicle.status === 'active' ? 'bg-success/20' : 'bg-muted'
//                                                     }`}
//                                                 >
//                                                     <Truck
//                                                         className={`h-4 w-4 ${vehicle.status === 'active' ? 'text-success' : 'text-muted-foreground'}`}
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-semibold text-sm">{vehicle.name}</p>
//                                                     <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
//                                                 </div>
//                                             </div>
//                                             {vehicle.status === 'active' && (
//                                                 <span className="flex items-center gap-1 text-xs text-success">
//                           <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                           En ruta
//                         </span>
//                                             )}
//                                         </div>
//
//                                         <div className="space-y-1 text-xs text-muted-foreground">
//                                             <div className="flex items-center justify-between">
//                                                 <span>Ubicación:</span>
//                                                 <span className="font-medium text-foreground">{vehicle.location}</span>
//                                             </div>
//                                             {vehicle.speed > 0 && (
//                                                 <div className="flex items-center justify-between">
//                                                     <span>Velocidad:</span>
//                                                     <span className="font-medium text-foreground">{vehicle.speed} km/h</span>
//                                                 </div>
//                                             )}
//                                             <div className="flex items-center justify-between">
//                                                 <span>Combustible:</span>
//                                                 <span
//                                                     className={`font-medium ${vehicle.fuel < 30 ? 'text-destructive' : 'text-foreground'}`}
//                                                 >
//                           {vehicle.fuel}%
//                         </span>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <span>Carga:</span>
//                                                 <span className="font-medium text-foreground">
//                           {vehicle.currentLoad}/{vehicle.capacity} kg
//                         </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//
//                             {vehiclePositions.filter((v) => v.status === 'active' || v.status === 'available')
//                                 .length === 0 && (
//                                 <div className="text-center py-8 text-muted-foreground">
//                                     <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                                     <p className="text-sm">No hay vehículos activos</p>
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>
//                 )}
//             </div>
//
//             {/* CSS for pulse animation */}
//             <style>{`
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.5;
//           }
//         }
//       `}</style>
//         </div>
//     )
// }


// v2 -b
// /* eslint-disable react-hooks/purity */
// // src/pages/LiveMap.tsx
// import { useState, useEffect, useMemo } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import {
//     MapPin,
//     Navigation,
//     Maximize2,
//     Minimize2,
//     RefreshCw,
//     Truck,
//     AlertCircle,
//     Zap,
//     Clock,
// } from 'lucide-react'
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'
// import { useFleetStore } from '@/store/useFleetStore'
// import { useRoutesStore } from '@/store/useRoutesStore'
//
// // Fix for default marker icons in Leaflet
// // @ts-expect-error - Leaflet internal property workaround
// delete L.Icon.Default.prototype._getIconUrl
//
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl:
//         'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl:
//         'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// })
//
// // Custom icons for different vehicle states
// const createVehicleIcon = (status: string) => {
//     const colors = {
//         active: '#10b981', // green
//         available: '#3b82f6', // blue
//         maintenance: '#f59e0b', // orange
//         inactive: '#6b7280', // gray
//     }
//
//     const color = colors[status as keyof typeof colors] || colors.inactive
//
//     return L.divIcon({
//         html: `
//       <div style="position: relative;">
//         <div style="
//           width: 32px;
//           height: 32px;
//           background: ${color};
//           border: 3px solid white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//         ">
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
//             <path d="M14 16l-4-4 4-4"></path>
//           </svg>
//         </div>
//         ${status === 'active' ? '<div style="position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; background: #ef4444; border: 2px solid white; border-radius: 50%; animation: pulse 2s infinite;"></div>' : ''}
//       </div>
//     `,
//         className: 'custom-vehicle-icon',
//         iconSize: [32, 32],
//         iconAnchor: [16, 16],
//     })
// }
//
// // Component to update map view
// function MapUpdater({ center }: { center: [number, number] }) {
//     const map = useMap()
//     useEffect(() => {
//         map.setView(center, 12)
//     }, [center, map])
//     return null
// }
//
// export function LiveMap() {
//     const vehicles = useFleetStore((state) => state.vehicles)
//     const routes = useRoutesStore((state) => state.routes)
//     const [isFullscreen, setIsFullscreen] = useState(false)
//     const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
//     const [lastUpdate, setLastUpdate] = useState(new Date())
//
//     // Default center (Bogotá, Colombia)
//     const defaultCenter: [number, number] = [4.6097, -74.0817]
//
//     // Simular actualización en tiempo real cada 5 segundos
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setLastUpdate(new Date())
//         }, 5000)
//         return () => clearInterval(interval)
//     }, [])
//
//     const handleRefresh = () => {
//         setLastUpdate(new Date())
//     }
//
//     // Estadísticas
//     const activeVehicles = vehicles.filter((v) => v.status === 'active').length
//     const activeRoutes = routes.filter((r) => r.status === 'active').length
//
//     // Mock de posiciones de vehículos (en producción vendrían del backend)
//     // Usamos useMemo para evitar Math.random() en cada render (impure function)
//     const vehiclePositions = useMemo(() => {
//         return vehicles.map((vehicle) => ({
//             ...vehicle,
//             position: [
//                 4.6097 + (Math.random() - 0.5) * 0.1,
//                 -74.0817 + (Math.random() - 0.5) * 0.1,
//             ] as [number, number],
//             speed: vehicle.status === 'active' ? Math.floor(Math.random() * 60) + 20 : 0,
//             // Añadimos timestamp para que se vea que usamos lastUpdate
//             lastUpdated: lastUpdate.getTime(),
//         }));
//     }, [lastUpdate, vehicles]);
//
//     // Obtener rutas activas con coordenadas
//     const activeRoutesWithCoords = routes
//         .filter((r) => r.status === 'active')
//         .map((route) => ({
//             ...route,
//             coordinates: route.stops.map((stop) => stop.coordinates),
//         }))
//
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                     <h1 className="text-2xl font-bold text-foreground">Mapa en Vivo</h1>
//                     <p className="text-sm text-muted-foreground">
//                         Seguimiento en tiempo real · Última actualización:{' '}
//                         {lastUpdate.toLocaleTimeString('es-ES')}
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
//                         <RefreshCw className="h-4 w-4" />
//                         Actualizar
//                     </Button>
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setIsFullscreen(!isFullscreen)}
//                         className="gap-2"
//                     >
//                         {isFullscreen ? (
//                             <>
//                                 <Minimize2 className="h-4 w-4" />
//                                 Salir
//                             </>
//                         ) : (
//                             <>
//                                 <Maximize2 className="h-4 w-4" />
//                                 Pantalla completa
//                             </>
//                         )}
//                     </Button>
//                 </div>
//             </div>
//
//             {/* Stats Cards */}
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/20">
//                                 <Truck className="h-5 w-5 text-success" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">{activeVehicles}</p>
//                                 <p className="text-xs text-muted-foreground">Vehículos activos</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
//                                 <Navigation className="h-5 w-5 text-primary" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">{activeRoutes}</p>
//                                 <p className="text-xs text-muted-foreground">Rutas en progreso</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/20">
//                                 <Clock className="h-5 w-5 text-warning" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">23 min</p>
//                                 <p className="text-xs text-muted-foreground">Tiempo promedio</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
//                                 <Zap className="h-5 w-5 text-muted-foreground" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">92%</p>
//                                 <p className="text-xs text-muted-foreground">Eficiencia</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//
//             {/* Map and Vehicle List */}
//             <div className={`grid gap-6 ${isFullscreen ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
//                 {/* Map */}
//                 <Card
//                     className={`border-0 shadow-lg ${isFullscreen ? 'lg:col-span-1' : 'lg:col-span-2'}`}
//                 >
//                     <CardHeader>
//                         <div className="flex items-center justify-between">
//                             <CardTitle className="flex items-center gap-2">
//                                 <MapPin className="h-5 w-5 text-primary" />
//                                 Rastreo en Tiempo Real
//                             </CardTitle>
//                             <Badge variant="outline" className="gap-1 bg-muted">
//                                 <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                                 En vivo
//                             </Badge>
//                         </div>
//                     </CardHeader>
//                     <CardContent>
//                         <div
//                             className={`rounded-lg overflow-hidden border ${isFullscreen ? 'h-[calc(100vh-20rem)]' : 'h-[500px]'}`}
//                         >
//                             <MapContainer
//                                 center={defaultCenter}
//                                 zoom={12}
//                                 style={{ height: '100%', width: '100%' }}
//                             >
//                                 <MapUpdater center={defaultCenter} />
//                                 <TileLayer
//                                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 />
//
//                                 {/* Rutas activas */}
//                                 {activeRoutesWithCoords.map((route) => (
//                                     <Polyline
//                                         key={route.id}
//                                         positions={route.coordinates}
//                                         color="#3b82f6"
//                                         weight={3}
//                                         opacity={0.6}
//                                         dashArray="5, 10"
//                                     />
//                                 ))}
//
//                                 {/* Vehículos */}
//                                 {vehiclePositions.map((vehicle) => (
//                                     <Marker
//                                         key={vehicle.id}
//                                         position={vehicle.position}
//                                         icon={createVehicleIcon(vehicle.status)}
//                                         eventHandlers={{
//                                             click: () => setSelectedVehicleId(vehicle.id),
//                                         }}
//                                     >
//                                         <Popup>
//                                             <div className="p-2 space-y-1">
//                                                 <p className="font-bold text-sm">{vehicle.name}</p>
//                                                 <p className="text-xs text-muted-foreground">{vehicle.id}</p>
//                                                 <div className="space-y-0.5 text-xs mt-2">
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Conductor:</span>
//                                                         <span className="font-medium">{vehicle.driver}</span>
//                                                     </div>
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Estado:</span>
//                                                         <Badge
//                                                             variant="outline"
//                                                             className={
//                                                                 vehicle.status === 'active'
//                                                                     ? 'bg-success/20 text-success'
//                                                                     : 'bg-muted'
//                                                             }
//                                                         >
//                                                             {vehicle.status === 'active' ? 'En ruta' : 'Disponible'}
//                                                         </Badge>
//                                                     </div>
//                                                     {vehicle.speed > 0 && (
//                                                         <div className="flex items-center justify-between gap-4">
//                                                             <span className="text-muted-foreground">Velocidad:</span>
//                                                             <span className="font-medium">{vehicle.speed} km/h</span>
//                                                         </div>
//                                                     )}
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Combustible:</span>
//                                                         <span
//                                                             className={`font-medium ${vehicle.fuel < 30 ? 'text-destructive' : 'text-success'}`}
//                                                         >
//                               {vehicle.fuel}%
//                             </span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </Popup>
//                                     </Marker>
//                                 ))}
//                             </MapContainer>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 {/* Vehicle List */}
//                 {!isFullscreen && (
//                     <Card className="border-0 shadow-lg">
//                         <CardHeader>
//                             <CardTitle>Vehículos Activos</CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
//                             {vehiclePositions
//                                 .filter((v) => v.status === 'active' || v.status === 'available')
//                                 .map((vehicle) => (
//                                     <div
//                                         key={vehicle.id}
//                                         onClick={() => setSelectedVehicleId(vehicle.id)}
//                                         className={`p-3 rounded-lg border transition-all cursor-pointer ${
//                                             selectedVehicleId === vehicle.id
//                                                 ? 'bg-accent border-primary shadow-sm'
//                                                 : 'hover:bg-accent/50'
//                                         }`}
//                                     >
//                                         <div className="flex items-start justify-between mb-2">
//                                             <div className="flex items-center gap-2">
//                                                 <div
//                                                     className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
//                                                         vehicle.status === 'active' ? 'bg-success/20' : 'bg-muted'
//                                                     }`}
//                                                 >
//                                                     <Truck
//                                                         className={`h-4 w-4 ${vehicle.status === 'active' ? 'text-success' : 'text-muted-foreground'}`}
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-semibold text-sm">{vehicle.name}</p>
//                                                     <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
//                                                 </div>
//                                             </div>
//                                             {vehicle.status === 'active' && (
//                                                 <span className="flex items-center gap-1 text-xs text-success">
//                           <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                           En ruta
//                         </span>
//                                             )}
//                                         </div>
//
//                                         <div className="space-y-1 text-xs text-muted-foreground">
//                                             <div className="flex items-center justify-between">
//                                                 <span>Ubicación:</span>
//                                                 <span className="font-medium text-foreground">{vehicle.location}</span>
//                                             </div>
//                                             {vehicle.speed > 0 && (
//                                                 <div className="flex items-center justify-between">
//                                                     <span>Velocidad:</span>
//                                                     <span className="font-medium text-foreground">{vehicle.speed} km/h</span>
//                                                 </div>
//                                             )}
//                                             <div className="flex items-center justify-between">
//                                                 <span>Combustible:</span>
//                                                 <span
//                                                     className={`font-medium ${vehicle.fuel < 30 ? 'text-destructive' : 'text-foreground'}`}
//                                                 >
//                           {vehicle.fuel}%
//                         </span>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <span>Carga:</span>
//                                                 <span className="font-medium text-foreground">
//                           {vehicle.currentLoad}/{vehicle.capacity} kg
//                         </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//
//                             {vehiclePositions.filter((v) => v.status === 'active' || v.status === 'available')
//                                 .length === 0 && (
//                                 <div className="text-center py-8 text-muted-foreground">
//                                     <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                                     <p className="text-sm">No hay vehículos activos</p>
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>
//                 )}
//             </div>
//
//             {/* CSS for pulse animation */}
//             <style>{`
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.5;
//           }
//         }
//       `}</style>
//         </div>
//     )
// }





// // v3
// // src/pages/LiveMap.tsx
// /* eslint-disable react-hooks/purity */
// import { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import {
//     MapPin,
//     Navigation,
//     Maximize2,
//     Minimize2,
//     RefreshCw,
//     Truck,
//     AlertCircle,
//     Zap,
//     Clock,
// } from 'lucide-react'
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'
// import { useFleetStore } from '@/store/useFleetStore'
// import { useRoutesStore } from '@/store/useRoutesStore'
//
// // MOVER ESTO A UN ARCHIVO SEPARADO O EJECUTARLO EN UN EFFECT
// // @ts-expect-error - Leaflet internal property workaround
// delete L.Icon.Default.prototype._getIconUrl
//
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl:
//         'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl:
//         'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// })
//
// // Función pura para crear iconos
// const createVehicleIcon = (status: string) => {
//     const colors = {
//         active: '#10b981', // green
//         available: '#3b82f6', // blue
//         maintenance: '#f59e0b', // orange
//         inactive: '#6b7280', // gray
//     }
//
//     const color = colors[status as keyof typeof colors] || colors.inactive
//
//     return L.divIcon({
//         html: `
//       <div style="position: relative;">
//         <div style="
//           width: 32px;
//           height: 32px;
//           background: ${color};
//           border: 3px solid white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//         ">
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
//             <path d="M14 16l-4-4 4-4"></path>
//           </svg>
//         </div>
//         ${status === 'active' ? '<div style="position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; background: #ef4444; border: 2px solid white; border-radius: 50%; animation: pulse 2s infinite;"></div>' : ''}
//       </div>
//     `,
//         className: 'custom-vehicle-icon',
//         iconSize: [32, 32],
//         iconAnchor: [16, 16],
//     })
// }
//
// // Component to update map view
// function MapUpdater({ center }: { center: [number, number] }) {
//     const map = useMap()
//     useEffect(() => {
//         map.setView(center, 12)
//     }, [center, map])
//     return null
// }
//
// export function LiveMap() {
//     const vehicles = useFleetStore((state) => state.vehicles)
//     const routes = useRoutesStore((state) => state.routes)
//     const [isFullscreen, setIsFullscreen] = useState(false)
//     const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
//     const [lastUpdate, setLastUpdate] = useState(new Date())
//
//     // Default center (Bogotá, Colombia)
//     const defaultCenter: [number, number] = [4.6097, -74.0817]
//
//     // Simular actualización en tiempo real cada 5 segundos
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setLastUpdate(new Date())
//         }, 5000)
//         return () => clearInterval(interval)
//     }, [])
//
//     const handleRefresh = () => {
//         setLastUpdate(new Date())
//     }
//
//     // Estadísticas
//     const activeVehicles = vehicles.filter((v) => v.status === 'active').length
//     const activeRoutes = routes.filter((r) => r.status === 'active').length
//
//     // Mock de posiciones de vehículos (en producción vendrían del backend)
//     const vehiclePositions = vehicles.map((vehicle) => ({
//         ...vehicle,
//         // Posiciones simuladas alrededor de Bogotá
//         position: [
//             4.6097 + (Math.random() - 0.5) * 0.1,
//             -74.0817 + (Math.random() - 0.5) * 0.1,
//         ] as [number, number],
//         speed: vehicle.status === 'active' ? Math.floor(Math.random() * 60) + 20 : 0,
//     }))
//
//     // Obtener rutas activas con coordenadas
//     const activeRoutesWithCoords = routes
//         .filter((r) => r.status === 'active')
//         .map((route) => ({
//             ...route,
//             coordinates: route.stops.map((stop) => stop.coordinates),
//         }))
//
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                     <h1 className="text-2xl font-bold text-foreground">Mapa en Vivo</h1>
//                     <p className="text-sm text-muted-foreground">
//                         Seguimiento en tiempo real · Última actualización:{' '}
//                         {lastUpdate.toLocaleTimeString('es-ES')}
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
//                         <RefreshCw className="h-4 w-4" />
//                         Actualizar
//                     </Button>
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setIsFullscreen(!isFullscreen)}
//                         className="gap-2"
//                     >
//                         {isFullscreen ? (
//                             <>
//                                 <Minimize2 className="h-4 w-4" />
//                                 Salir
//                             </>
//                         ) : (
//                             <>
//                                 <Maximize2 className="h-4 w-4" />
//                                 Pantalla completa
//                             </>
//                         )}
//                     </Button>
//                 </div>
//             </div>
//
//             {/* Stats Cards */}
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/20">
//                                 <Truck className="h-5 w-5 text-success" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">{activeVehicles}</p>
//                                 <p className="text-xs text-muted-foreground">Vehículos activos</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
//                                 <Navigation className="h-5 w-5 text-primary" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">{activeRoutes}</p>
//                                 <p className="text-xs text-muted-foreground">Rutas en progreso</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/20">
//                                 <Clock className="h-5 w-5 text-warning" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">23 min</p>
//                                 <p className="text-xs text-muted-foreground">Tiempo promedio</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
//                                 <Zap className="h-5 w-5 text-muted-foreground" />
//                             </div>
//                             <div>
//                                 <p className="text-2xl font-bold text-foreground">92%</p>
//                                 <p className="text-xs text-muted-foreground">Eficiencia</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//
//             {/* Map and Vehicle List */}
//             <div className={`grid gap-6 ${isFullscreen ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
//                 {/* Map */}
//                 <Card
//                     className={`border-0 shadow-lg ${isFullscreen ? 'lg:col-span-1' : 'lg:col-span-2'}`}
//                 >
//                     <CardHeader>
//                         <div className="flex items-center justify-between">
//                             <CardTitle className="flex items-center gap-2">
//                                 <MapPin className="h-5 w-5 text-primary" />
//                                 Rastreo en Tiempo Real
//                             </CardTitle>
//                             <Badge variant="outline" className="gap-1 bg-muted">
//                                 <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                                 En vivo
//                             </Badge>
//                         </div>
//                     </CardHeader>
//                     <CardContent>
//                         <div
//                             className={`rounded-lg overflow-hidden border ${isFullscreen ? 'h-[calc(100vh-20rem)]' : 'h-[500px]'}`}
//                         >
//                             <MapContainer
//                                 center={defaultCenter}
//                                 zoom={12}
//                                 style={{ height: '100%', width: '100%' }}
//                             >
//                                 <MapUpdater center={defaultCenter} />
//                                 <TileLayer
//                                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 />
//
//                                 {/* Rutas activas */}
//                                 {activeRoutesWithCoords.map((route) => (
//                                     <Polyline
//                                         key={route.id}
//                                         positions={route.coordinates}
//                                         color="#3b82f6"
//                                         weight={3}
//                                         opacity={0.6}
//                                         dashArray="5, 10"
//                                     />
//                                 ))}
//
//                                 {/* Vehículos */}
//                                 {vehiclePositions.map((vehicle) => (
//                                     <Marker
//                                         key={vehicle.id}
//                                         position={vehicle.position}
//                                         icon={createVehicleIcon(vehicle.status)}
//                                         eventHandlers={{
//                                             click: () => setSelectedVehicleId(vehicle.id),
//                                         }}
//                                     >
//                                         <Popup>
//                                             <div className="p-2 space-y-1">
//                                                 <p className="font-bold text-sm">{vehicle.name}</p>
//                                                 <p className="text-xs text-muted-foreground">{vehicle.id}</p>
//                                                 <div className="space-y-0.5 text-xs mt-2">
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Conductor:</span>
//                                                         <span className="font-medium">{vehicle.driver}</span>
//                                                     </div>
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Estado:</span>
//                                                         <Badge
//                                                             variant="outline"
//                                                             className={
//                                                                 vehicle.status === 'active'
//                                                                     ? 'bg-success/20 text-success'
//                                                                     : 'bg-muted'
//                                                             }
//                                                         >
//                                                             {vehicle.status === 'active' ? 'En ruta' : 'Disponible'}
//                                                         </Badge>
//                                                     </div>
//                                                     {vehicle.speed > 0 && (
//                                                         <div className="flex items-center justify-between gap-4">
//                                                             <span className="text-muted-foreground">Velocidad:</span>
//                                                             <span className="font-medium">{vehicle.speed} km/h</span>
//                                                         </div>
//                                                     )}
//                                                     <div className="flex items-center justify-between gap-4">
//                                                         <span className="text-muted-foreground">Combustible:</span>
//                                                         <span
//                                                             className={`font-medium ${vehicle.fuel < 30 ? 'text-destructive' : 'text-success'}`}
//                                                         >
//                               {vehicle.fuel}%
//                             </span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </Popup>
//                                     </Marker>
//                                 ))}
//                             </MapContainer>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 {/* Vehicle List */}
//                 {!isFullscreen && (
//                     <Card className="border-0 shadow-lg">
//                         <CardHeader>
//                             <CardTitle>Vehículos Activos</CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
//                             {vehiclePositions
//                                 .filter((v) => v.status === 'active' || v.status === 'available')
//                                 .map((vehicle) => (
//                                     <div
//                                         key={vehicle.id}
//                                         onClick={() => setSelectedVehicleId(vehicle.id)}
//                                         className={`p-3 rounded-lg border transition-all cursor-pointer ${
//                                             selectedVehicleId === vehicle.id
//                                                 ? 'bg-accent border-primary shadow-sm'
//                                                 : 'hover:bg-accent/50'
//                                         }`}
//                                     >
//                                         <div className="flex items-start justify-between mb-2">
//                                             <div className="flex items-center gap-2">
//                                                 <div
//                                                     className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
//                                                         vehicle.status === 'active' ? 'bg-success/20' : 'bg-muted'
//                                                     }`}
//                                                 >
//                                                     <Truck
//                                                         className={`h-4 w-4 ${vehicle.status === 'active' ? 'text-success' : 'text-muted-foreground'}`}
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-semibold text-sm">{vehicle.name}</p>
//                                                     <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
//                                                 </div>
//                                             </div>
//                                             {vehicle.status === 'active' && (
//                                                 <span className="flex items-center gap-1 text-xs text-success">
//                           <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                           En ruta
//                         </span>
//                                             )}
//                                         </div>
//
//                                         <div className="space-y-1 text-xs text-muted-foreground">
//                                             <div className="flex items-center justify-between">
//                                                 <span>Ubicación:</span>
//                                                 <span className="font-medium text-foreground">{vehicle.location}</span>
//                                             </div>
//                                             {vehicle.speed > 0 && (
//                                                 <div className="flex items-center justify-between">
//                                                     <span>Velocidad:</span>
//                                                     <span className="font-medium text-foreground">{vehicle.speed} km/h</span>
//                                                 </div>
//                                             )}
//                                             <div className="flex items-center justify-between">
//                                                 <span>Combustible:</span>
//                                                 <span
//                                                     className={`font-medium ${vehicle.fuel < 30 ? 'text-destructive' : 'text-foreground'}`}
//                                                 >
//                           {vehicle.fuel}%
//                         </span>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <span>Carga:</span>
//                                                 <span className="font-medium text-foreground">
//                           {vehicle.currentLoad}/{vehicle.capacity} kg
//                         </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//
//                             {vehiclePositions.filter((v) => v.status === 'active' || v.status === 'available')
//                                 .length === 0 && (
//                                 <div className="text-center py-8 text-muted-foreground">
//                                     <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                                     <p className="text-sm">No hay vehículos activos</p>
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>
//                 )}
//             </div>
//
//             {/* CSS for pulse animation */}
//             <style>{`
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.5;
//           }
//         }
//       `}</style>
//         </div>
//     )
// }





import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    MapPin,
    Navigation,
    Maximize2,
    Minimize2,
    RefreshCw,
    Truck,
    AlertCircle,
    Zap,
    Clock,
} from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useFleetStore } from '@/store/useFleetStore'
import { useRoutesStore } from '@/store/useRoutesStore'
import { createVehicleIcon } from '@/utils/leaflet-config'

/* eslint-disable react-hooks/purity */
// Component to update map view
function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap()
    useEffect(() => {
        map.setView(center, 12)
    }, [center, map])
    return null
}

export function LiveMap() {
    const vehicles = useFleetStore((state) => state.vehicles)
    const routes = useRoutesStore((state) => state.routes)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
    const [lastUpdate, setLastUpdate] = useState(new Date())

    // Default center (Bogotá, Colombia)
    const defaultCenter: [number, number] = [4.6097, -74.0817]

    // Simular actualización en tiempo real cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdate(new Date())
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const handleRefresh = () => {
        setLastUpdate(new Date())
    }

    // Estadísticas
    const activeVehicles = vehicles.filter((v) => v.status === 'active').length
    const activeRoutes = routes.filter((r) => r.status === 'active').length

    // Mock de posiciones de vehículos (en producción vendrían del backend)
    const vehiclePositions = vehicles.map((vehicle) => ({
        ...vehicle,
        // Posiciones simuladas alrededor de Bogotá
        position: [
            4.6097 + (Math.random() - 0.5) * 0.1,
            -74.0817 + (Math.random() - 0.5) * 0.1,
        ] as [number, number],
        speed: vehicle.status === 'active' ? Math.floor(Math.random() * 60) + 20 : 0,
    }))

    // Obtener rutas activas con coordenadas
    const activeRoutesWithCoords = routes
        .filter((r) => r.status === 'active')
        .map((route) => ({
            ...route,
            coordinates: route.stops.map((stop) => stop.coordinates),
        }))

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Mapa en Vivo</h1>
                    <p className="text-sm text-muted-foreground">
                        Seguimiento en tiempo real · Última actualización:{' '}
                        {lastUpdate.toLocaleTimeString('es-ES')}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Actualizar
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="gap-2"
                    >
                        {isFullscreen ? (
                            <>
                                <Minimize2 className="h-4 w-4" />
                                Salir
                            </>
                        ) : (
                            <>
                                <Maximize2 className="h-4 w-4" />
                                Pantalla completa
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/20">
                                <Truck className="h-5 w-5 text-success" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{activeVehicles}</p>
                                <p className="text-xs text-muted-foreground">Vehículos activos</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                                <Navigation className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{activeRoutes}</p>
                                <p className="text-xs text-muted-foreground">Rutas en progreso</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/20">
                                <Clock className="h-5 w-5 text-warning" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">23 min</p>
                                <p className="text-xs text-muted-foreground">Tiempo promedio</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                                <Zap className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">92%</p>
                                <p className="text-xs text-muted-foreground">Eficiencia</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Map and Vehicle List */}
            <div className={`grid gap-6 ${isFullscreen ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
                {/* Map */}
                <Card
                    className={`border-0 shadow-lg ${isFullscreen ? 'lg:col-span-1' : 'lg:col-span-2'}`}
                >
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                Rastreo en Tiempo Real
                            </CardTitle>
                            <Badge variant="outline" className="gap-1 bg-muted">
                                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                                En vivo
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div
                            className={`rounded-lg overflow-hidden border ${isFullscreen ? 'h-[calc(100vh-20rem)]' : 'h-[500px]'}`}
                        >
                            <MapContainer
                                center={defaultCenter}
                                zoom={12}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <MapUpdater center={defaultCenter} />
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {/* Rutas activas */}
                                {activeRoutesWithCoords.map((route) => (
                                    <Polyline
                                        key={route.id}
                                        positions={route.coordinates}
                                        color="#3b82f6"
                                        weight={3}
                                        opacity={0.6}
                                        dashArray="5, 10"
                                    />
                                ))}

                                {/* Vehículos */}
                                {vehiclePositions.map((vehicle) => (
                                    <Marker
                                        key={vehicle.id}
                                        position={vehicle.position}
                                        icon={createVehicleIcon(vehicle.status)}
                                        eventHandlers={{
                                            click: () => setSelectedVehicleId(vehicle.id),
                                        }}
                                    >
                                        <Popup>
                                            <div className="p-2 space-y-1">
                                                <p className="font-bold text-sm">{vehicle.name}</p>
                                                <p className="text-xs text-muted-foreground">{vehicle.id}</p>
                                                <div className="space-y-0.5 text-xs mt-2">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="text-muted-foreground">Conductor:</span>
                                                        <span className="font-medium">{vehicle.driver}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="text-muted-foreground">Estado:</span>
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                vehicle.status === 'active'
                                                                    ? 'bg-success/20 text-success'
                                                                    : 'bg-muted'
                                                            }
                                                        >
                                                            {vehicle.status === 'active' ? 'En ruta' : 'Disponible'}
                                                        </Badge>
                                                    </div>
                                                    {vehicle.speed > 0 && (
                                                        <div className="flex items-center justify-between gap-4">
                                                            <span className="text-muted-foreground">Velocidad:</span>
                                                            <span className="font-medium">{vehicle.speed} km/h</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="text-muted-foreground">Combustible:</span>
                                                        <span
                                                            className={`font-medium ${vehicle.fuel < 30 ? 'text-destructive' : 'text-success'}`}
                                                        >
                              {vehicle.fuel}%
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Vehicle List */}
                {!isFullscreen && (
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>Vehículos Activos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                            {vehiclePositions
                                .filter((v) => v.status === 'active' || v.status === 'available')
                                .map((vehicle) => (
                                    <div
                                        key={vehicle.id}
                                        onClick={() => setSelectedVehicleId(vehicle.id)}
                                        className={`p-3 rounded-lg border transition-all cursor-pointer ${
                                            selectedVehicleId === vehicle.id
                                                ? 'bg-accent border-primary shadow-sm'
                                                : 'hover:bg-accent/50'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                                        vehicle.status === 'active' ? 'bg-success/20' : 'bg-muted'
                                                    }`}
                                                >
                                                    <Truck
                                                        className={`h-4 w-4 ${vehicle.status === 'active' ? 'text-success' : 'text-muted-foreground'}`}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">{vehicle.name}</p>
                                                    <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
                                                </div>
                                            </div>
                                            {vehicle.status === 'active' && (
                                                <span className="flex items-center gap-1 text-xs text-success">
                          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                          En ruta
                        </span>
                                            )}
                                        </div>

                                        <div className="space-y-1 text-xs text-muted-foreground">
                                            <div className="flex items-center justify-between">
                                                <span>Ubicación:</span>
                                                <span className="font-medium text-foreground">{vehicle.location}</span>
                                            </div>
                                            {vehicle.speed > 0 && (
                                                <div className="flex items-center justify-between">
                                                    <span>Velocidad:</span>
                                                    <span className="font-medium text-foreground">{vehicle.speed} km/h</span>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <span>Combustible:</span>
                                                <span
                                                    className={`font-medium ${vehicle.fuel < 30 ? 'text-destructive' : 'text-foreground'}`}
                                                >
                          {vehicle.fuel}%
                        </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Carga:</span>
                                                <span className="font-medium text-foreground">
                          {vehicle.currentLoad}/{vehicle.capacity} kg
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            {vehiclePositions.filter((v) => v.status === 'active' || v.status === 'available')
                                .length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No hay vehículos activos</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* CSS for pulse animation */}
            <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
        </div>
    )
}