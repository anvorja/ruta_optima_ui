// src/store/useOrdersStore.ts
import { create } from 'zustand'

export interface Order {
    id: string
    client: string
    address: string
    items: number
    priority: 'high' | 'medium' | 'low'
    status: 'pending' | 'in-route' | 'delivered' | 'cancelled'
    window: string
    weight?: number
    notes?: string
    createdAt: Date
    deliveredAt?: Date
}

interface OrdersState {
    orders: Order[]
    addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void
    updateOrder: (id: string, order: Partial<Order>) => void
    deleteOrder: (id: string) => void
    getOrderById: (id: string) => Order | undefined
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
    orders: [
        {
            id: 'ORD-001',
            client: 'Distribuidora Central',
            address: 'Calle 45 #23-12, Bogotá',
            items: 15,
            priority: 'high',
            status: 'pending',
            window: '08:00 - 10:00',
            weight: 120,
            createdAt: new Date('2025-11-28T08:00:00')
        },
        {
            id: 'ORD-002',
            client: 'Supermercado Norte',
            address: 'Av. 68 #102-34, Bogotá',
            items: 8,
            priority: 'medium',
            status: 'pending',
            window: '10:00 - 12:00',
            weight: 80,
            createdAt: new Date('2025-11-28T08:15:00')
        },
        {
            id: 'ORD-003',
            client: 'Tienda La Esperanza',
            address: 'Carrera 7 #45-67, Bogotá',
            items: 22,
            priority: 'low',
            status: 'in-route',
            window: '14:00 - 16:00',
            weight: 150,
            createdAt: new Date('2025-11-28T07:30:00')
        },
        {
            id: 'ORD-004',
            client: 'Almacén El Dorado',
            address: 'Calle 100 #15-23, Bogotá',
            items: 12,
            priority: 'high',
            status: 'delivered',
            window: '08:00 - 10:00',
            weight: 95,
            createdAt: new Date('2025-11-28T06:00:00'),
            deliveredAt: new Date('2025-11-28T09:30:00')
        },
    ],
    addOrder: (orderData) => {
        const newOrder: Order = {
            ...orderData,
            id: `ORD-${String(get().orders.length + 1).padStart(3, '0')}`,
            createdAt: new Date()
        }
        set((state) => ({ orders: [...state.orders, newOrder] }))
    },
    updateOrder: (id, orderData) => {
        set((state) => ({
            orders: state.orders.map((order) =>
                order.id === id ? { ...order, ...orderData } : order
            )
        }))
    },
    deleteOrder: (id) => {
        set((state) => ({
            orders: state.orders.filter((order) => order.id !== id)
        }))
    },
    getOrderById: (id) => {
        return get().orders.find((order) => order.id === id)
    }
}))
