import type { Order } from '@/store/useOrdersStore'
import type { Vehicle } from '@/store/useFleetStore'
import type { Route, RouteStop } from '@/store/useRoutesStore'

// Simulated geocoding for Bogotá addresses
const geocodeAddress = (address: string): [number, number] => {
    // In a real app, this would call a geocoding API using the address parameter
    // For simulation, we return random coordinates within Bogotá
    console.log(`Geocoding address: ${address}`) // Using the address parameter
    const baseLat = 4.6097
    const baseLng = -74.0817
    const randomLat = baseLat + (Math.random() - 0.5) * 0.2
    const randomLng = baseLng + (Math.random() - 0.5) * 0.2
    return [randomLat, randomLng]
}

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const R = 6371 // Earth's radius in km
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

// Nearest Neighbor algorithm for route optimization
const nearestNeighborOptimization = (
    orders: Order[],
    startPoint: [number, number]
): RouteStop[] => {
    const unvisited = orders.map(order => ({
        order,
        coordinates: geocodeAddress(order.address) as [number, number]
    }))

    const route: RouteStop[] = []
    let currentPoint = startPoint
    let sequence = 1

    while (unvisited.length > 0) {
        // Find nearest unvisited order
        let nearestIndex = 0
        let minDistance = Infinity

        unvisited.forEach((item, index) => {
            const distance = calculateDistance(currentPoint, item.coordinates)
            if (distance < minDistance) {
                minDistance = distance
                nearestIndex = index
            }
        })

        const nearest = unvisited[nearestIndex]
        route.push({
            orderId: nearest.order.id,
            address: nearest.order.address,
            coordinates: nearest.coordinates,
            estimatedTime: `${8 + sequence}:${(sequence * 15) % 60}0`,
            sequence
        })

        currentPoint = nearest.coordinates
        unvisited.splice(nearestIndex, 1)
        sequence++
    }

    return route
}

// Calculate route metrics
const calculateRouteMetrics = (stops: RouteStop[]) => {
    let totalDistance = 0
    const depot: [number, number] = [4.6097, -74.0817] // Base location

    // Distance from depot to first stop
    if (stops.length > 0) {
        totalDistance += calculateDistance(depot, stops[0].coordinates)
    }

    // Distance between stops
    for (let i = 0; i < stops.length - 1; i++) {
        totalDistance += calculateDistance(stops[i].coordinates, stops[i + 1].coordinates)
    }

    // Distance from last stop back to depot
    if (stops.length > 0) {
        totalDistance += calculateDistance(stops[stops.length - 1].coordinates, depot)
    }

    // Calculate estimated time (assuming 30 km/h average + 10 min per stop)
    const travelTimeHours = totalDistance / 30
    const stopTimeHours = stops.length * (10 / 60)
    const totalTimeHours = travelTimeHours + stopTimeHours

    const hours = Math.floor(totalTimeHours)
    const minutes = Math.round((totalTimeHours - hours) * 60)

    // Calculate efficiency (simulated - based on route compactness)
    const efficiency = Math.min(95, Math.max(75, 100 - (totalDistance / stops.length) * 2))

    // Calculate savings (simulated - compared to non-optimized route)
    const savings = Math.round(totalDistance * 0.5 * 2.5) // $2.5 per km saved

    return {
        distance: Math.round(totalDistance * 10) / 10,
        estimatedTime: `${hours}h ${minutes}m`,
        efficiency: Math.round(efficiency),
        savings
    }
}

export interface OptimizationResult {
    routes: Route[]
    totalDistance: number
    totalTime: string
    totalSavings: number
    averageEfficiency: number
}

export const optimizeRoutes = (
    orders: Order[],
    vehicles: Vehicle[],
    criteria: {
        priority: 'time' | 'distance' | 'cost'
        considerTraffic: boolean
        respectTimeWindows: boolean
        maxStopsPerRoute: number
    }
): OptimizationResult => {
    // Filter pending orders
    const pendingOrders = orders.filter(order => order.status === 'pending')

    // Filter available vehicles
    const availableVehicles = vehicles.filter(
        vehicle => vehicle.status === 'available' || vehicle.status === 'active'
    )

    if (pendingOrders.length === 0 || availableVehicles.length === 0) {
        return {
            routes: [],
            totalDistance: 0,
            totalTime: '0h 0m',
            totalSavings: 0,
            averageEfficiency: 0
        }
    }

    // Sort orders by priority if needed
    const sortedOrders = [...pendingOrders].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
    })

    // Distribute orders among vehicles
    const routes: Route[] = []
    let orderIndex = 0
    const depot: [number, number] = [4.6097, -74.0817]

    availableVehicles.forEach((vehicle, vehicleIndex) => {
        if (orderIndex >= sortedOrders.length) return

        // Determine how many orders this vehicle can handle
        const ordersForVehicle = sortedOrders.slice(
            orderIndex,
            Math.min(orderIndex + criteria.maxStopsPerRoute, sortedOrders.length)
        )

        if (ordersForVehicle.length === 0) return

        // Optimize route for this vehicle
        const stops = nearestNeighborOptimization(ordersForVehicle, depot)
        const metrics = calculateRouteMetrics(stops)

        routes.push({
            id: `RUTA-${String(routes.length + 1).padStart(3, '0')}`,
            name: `Ruta ${vehicle.name}`,
            vehicleId: vehicle.id,
            driverId: `DRV-${String(vehicleIndex + 1).padStart(3, '0')}`,
            stops,
            distance: metrics.distance,
            estimatedTime: metrics.estimatedTime,
            status: 'pending',
            efficiency: metrics.efficiency,
            savings: metrics.savings,
            createdAt: new Date(),
            optimized: true
        })

        orderIndex += ordersForVehicle.length
    })

    // Calculate totals
    const totalDistance = routes.reduce((sum, route) => sum + route.distance, 0)
    const totalSavings = routes.reduce((sum, route) => sum + route.savings, 0)
    const averageEfficiency = routes.length > 0
        ? Math.round(routes.reduce((sum, route) => sum + route.efficiency, 0) / routes.length)
        : 0

    // Calculate total time
    const totalMinutes = routes.reduce((sum, route) => {
        const [hours, minutes] = route.estimatedTime.split('h ')
        return sum + parseInt(hours) * 60 + parseInt(minutes)
    }, 0)
    const totalHours = Math.floor(totalMinutes / 60)
    const remainingMinutes = totalMinutes % 60

    return {
        routes,
        totalDistance: Math.round(totalDistance * 10) / 10,
        totalTime: `${totalHours}h ${remainingMinutes}m`,
        totalSavings,
        averageEfficiency
    }
}
