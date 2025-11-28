import { create } from 'zustand'

export interface Vehicle {
    id: string
    name: string
    type: 'Camión' | 'Camioneta' | 'Moto' | 'Van'
    plate: string
    capacity: number
    fuel: number
    status: 'active' | 'available' | 'maintenance' | 'inactive'
    driver: string
    currentLoad: number
    location: string
    fuelType?: 'Gasolina' | 'Diesel' | 'Eléctrico'
    year?: number
    lastMaintenance?: Date
}

interface FleetState {
    vehicles: Vehicle[]
    addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void
    updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void
    deleteVehicle: (id: string) => void
    getVehicleById: (id: string) => Vehicle | undefined
    getAvailableVehicles: () => Vehicle[]
}

export const useFleetStore = create<FleetState>((set, get) => ({
    vehicles: [
        {
            id: 'VEH-001',
            name: 'Camión Grande 1',
            type: 'Camión',
            plate: 'ABC-123',
            capacity: 1500,
            fuel: 85,
            status: 'active',
            driver: 'Juan Pérez',
            currentLoad: 1200,
            location: 'Zona Norte',
            fuelType: 'Diesel',
            year: 2020,
            lastMaintenance: new Date('2025-11-01')
        },
        {
            id: 'VEH-002',
            name: 'Camioneta 2',
            type: 'Camioneta',
            plate: 'DEF-456',
            capacity: 800,
            fuel: 60,
            status: 'active',
            driver: 'María García',
            currentLoad: 650,
            location: 'Centro',
            fuelType: 'Gasolina',
            year: 2021,
            lastMaintenance: new Date('2025-10-15')
        },
        {
            id: 'VEH-003',
            name: 'Camión Grande 2',
            type: 'Camión',
            plate: 'GHI-789',
            capacity: 1500,
            fuel: 45,
            status: 'maintenance',
            driver: '-',
            currentLoad: 0,
            location: 'Taller',
            fuelType: 'Diesel',
            year: 2019,
            lastMaintenance: new Date('2025-11-20')
        },
        {
            id: 'VEH-004',
            name: 'Moto 1',
            type: 'Moto',
            plate: 'JKL-012',
            capacity: 50,
            fuel: 90,
            status: 'available',
            driver: '-',
            currentLoad: 0,
            location: 'Base',
            fuelType: 'Gasolina',
            year: 2022,
            lastMaintenance: new Date('2025-11-10')
        },
    ],
    addVehicle: (vehicleData) => {
        const newVehicle: Vehicle = {
            ...vehicleData,
            id: `VEH-${String(get().vehicles.length + 1).padStart(3, '0')}`
        }
        set((state) => ({ vehicles: [...state.vehicles, newVehicle] }))
    },
    updateVehicle: (id, vehicleData) => {
        set((state) => ({
            vehicles: state.vehicles.map((vehicle) =>
                vehicle.id === id ? { ...vehicle, ...vehicleData } : vehicle
            )
        }))
    },
    deleteVehicle: (id) => {
        set((state) => ({
            vehicles: state.vehicles.filter((vehicle) => vehicle.id !== id)
        }))
    },
    getVehicleById: (id) => {
        return get().vehicles.find((vehicle) => vehicle.id === id)
    },
    getAvailableVehicles: () => {
        return get().vehicles.filter((vehicle) =>
            vehicle.status === 'available' || vehicle.status === 'active'
        )
    }
}))
