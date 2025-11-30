// src/components/orders/NewOrderDialog.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useOrdersStore } from '@/store/useOrdersStore'
import { orderSchema, type OrderFormData } from '@/lib/validationSchemas'
import { useToast } from '@/components/ui/use-toast'

interface NewOrderDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function NewOrderDialog({ open, onOpenChange }: NewOrderDialogProps) {
    const addOrder = useOrdersStore((state) => state.addOrder)
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<OrderFormData>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            priority: 'medium',
            status: 'pending',
            items: 1,
            weight: 0
        }
    })

    const onSubmit = async (data: OrderFormData) => {
        setIsSubmitting(true)
        try {
            addOrder(data)
            toast({
                title: "Orden creada",
                description: `La orden para ${data.client} ha sido creada exitosamente.`,
            })
            reset()
            onOpenChange(false)
        } catch {
            toast({
                title: "Error",
                description: "No se pudo crear la orden. Intenta de nuevo.",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Nueva Orden de Entrega</DialogTitle>
                    <DialogDescription>
                        Completa los detalles de la nueva orden de entrega
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="client">Cliente *</Label>
                            <Input
                                id="client"
                                placeholder="Nombre del cliente"
                                {...register('client')}
                            />
                            {errors.client && (
                                <p className="text-sm text-red-500">{errors.client.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="window">Ventana de Tiempo *</Label>
                            <Input
                                id="window"
                                placeholder="08:00 - 10:00"
                                {...register('window')}
                            />
                            {errors.window && (
                                <p className="text-sm text-red-500">{errors.window.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Dirección *</Label>
                        <Input
                            id="address"
                            placeholder="Calle 45 #23-12, Bogotá"
                            {...register('address')}
                        />
                        {errors.address && (
                            <p className="text-sm text-red-500">{errors.address.message}</p>
                        )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="items">Cantidad de Items *</Label>
                            <Input
                                id="items"
                                type="number"
                                min="1"
                                {...register('items', { valueAsNumber: true })}
                            />
                            {errors.items && (
                                <p className="text-sm text-red-500">{errors.items.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="weight">Peso (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                min="0"
                                step="0.1"
                                {...register('weight', { valueAsNumber: true })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority">Prioridad *</Label>
                            <Select
                                value={watch('priority')}
                                onValueChange={(value) => setValue('priority', value as 'high' | 'medium' | 'low')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">Alta</SelectItem>
                                    <SelectItem value="medium">Media</SelectItem>
                                    <SelectItem value="low">Baja</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notas</Label>
                        <Textarea
                            id="notes"
                            placeholder="Notas adicionales sobre la entrega..."
                            rows={3}
                            {...register('notes')}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creando...' : 'Crear Orden'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
