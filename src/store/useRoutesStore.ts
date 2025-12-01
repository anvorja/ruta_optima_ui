// src/store/useRoutesStore.ts
import { create } from 'zustand'

export interface RouteStop {
    orderId: string
    address: string
    coordinates: [number, number]
    estimatedTime: string
    sequence: number
}

export interface Route {
    id: string
    name: string
    vehicleId: string
    driverId: string
    stops: RouteStop[]
    distance: number
    estimatedTime: string
    status: 'pending' | 'active' | 'completed'
    efficiency: number
    savings: number
    createdAt: Date
    optimized: boolean
}

export interface OptimizationCriteria {
    priority: 'time' | 'distance' | 'cost'
    considerTraffic: boolean
    respectTimeWindows: boolean
    maxStopsPerRoute: number
}

interface RoutesState {
    routes: Route[]
    optimizationCriteria: OptimizationCriteria
    addRoute: (route: Omit<Route, 'id' | 'createdAt'>) => void
    updateRoute: (id: string, route: Partial<Route>) => void
    deleteRoute: (id: string) => void
    getRouteById: (id: string) => Route | undefined
    setOptimizationCriteria: (criteria: Partial<OptimizationCriteria>) => void
    optimizeRoutes: () => void
}

export const useRoutesStore = create<RoutesState>((set, get) => ({
    routes: [
        {
            id: 'RUTA-001',
            name: 'Ruta Norte - Mañana',
            vehicleId: 'VEH-001',
            driverId: 'DRV-001',
            stops: [
                {
                    orderId: 'ORD-001',
                    address: 'Calle 45 #23-12',
                    coordinates: [4.6500, -74.0900],
                    estimatedTime: '08:30',
                    sequence: 1
                },
                {
                    orderId: 'ORD-002',
                    address: 'Av. 68 #102-34',
                    coordinates: [4.6800, -74.0500],
                    estimatedTime: '10:15',
                    sequence: 2
                }
            ],
            distance: 45.2,
            estimatedTime: '2h 15m',
            status: 'active',
            efficiency: 92,
            savings: 180,
            createdAt: new Date('2025-11-28T06:00:00'),
            optimized: true
        },
        {
            id: 'RUTA-002',
            name: 'Ruta Centro - Tarde',
            vehicleId: 'VEH-002',
            driverId: 'DRV-002',
            stops: [
                {
                    orderId: 'ORD-003',
                    address: 'Carrera 7 #45-67',
                    coordinates: [4.6097, -74.0817],
                    estimatedTime: '14:30',
                    sequence: 1
                }
            ],
            distance: 28.5,
            estimatedTime: '1h 30m',
            status: 'active',
            efficiency: 88,
            savings: 120,
            createdAt: new Date('2025-11-28T07:00:00'),
            optimized: true
        }
    ],
    optimizationCriteria: {
        priority: 'time',
        considerTraffic: true,
        respectTimeWindows: true,
        maxStopsPerRoute: 10
    },
    addRoute: (routeData) => {
        const newRoute: Route = {
            ...routeData,
            id: `RUTA-${String(get().routes.length + 1).padStart(3, '0')}`,
            createdAt: new Date()
        }
        set((state) => ({ routes: [...state.routes, newRoute] }))
    },
    updateRoute: (id, routeData) => {
        set((state) => ({
            routes: state.routes.map((route) =>
                route.id === id ? { ...route, ...routeData } : route
            )
        }))
    },
    deleteRoute: (id) => {
        set((state) => ({
            routes: state.routes.filter((route) => route.id !== id)
        }))
    },
    getRouteById: (id) => {
        return get().routes.find((route) => route.id === id)
    },
    setOptimizationCriteria: (criteria) => {
        set((state) => ({
            optimizationCriteria: { ...state.optimizationCriteria, ...criteria }
        }))
    },
    optimizeRoutes: () => {
        // This will be implemented with the optimization service
        console.log('Optimizing routes with criteria:', get().optimizationCriteria)
    }
}))
