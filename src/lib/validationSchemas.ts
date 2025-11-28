import { z } from 'zod'

// Order validation schema
export const orderSchema = z.object({
    client: z.string().min(3, 'El nombre del cliente debe tener al menos 3 caracteres'),
    address: z.string().min(10, 'La dirección debe tener al menos 10 caracteres'),
    items: z.number().min(1, 'Debe haber al menos 1 item'),
    priority: z.enum(['high', 'medium', 'low']),
    status: z.enum(['pending', 'in-route', 'delivered', 'cancelled']),
    window: z.string().min(1, 'La ventana de tiempo es requerida'),
    weight: z.number().optional(),
    notes: z.string().optional()
})

export type OrderFormData = z.infer<typeof orderSchema>

// Vehicle validation schema
export const vehicleSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    type: z.enum(['Camión', 'Camioneta', 'Moto', 'Van']),
    plate: z.string().min(6, 'La placa debe tener al menos 6 caracteres'),
    capacity: z.number().min(1, 'La capacidad debe ser mayor a 0'),
    fuel: z.number().min(0).max(100, 'El combustible debe estar entre 0 y 100'),
    status: z.enum(['active', 'available', 'maintenance', 'inactive']),
    driver: z.string().min(1, 'El conductor es requerido'),
    currentLoad: z.number().min(0),
    location: z.string().min(1, 'La ubicación es requerida'),
    fuelType: z.enum(['Gasolina', 'Diesel', 'Eléctrico']).optional(),
    year: z.number().min(1990).max(new Date().getFullYear() + 1).optional()
})

export type VehicleFormData = z.infer<typeof vehicleSchema>

// User profile validation schema
export const profileSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos').optional(),
    role: z.string().optional()
})

export type ProfileFormData = z.infer<typeof profileSchema>

// Password change validation schema
export const passwordSchema = z.object({
    currentPassword: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    newPassword: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
})

export type PasswordFormData = z.infer<typeof passwordSchema>
