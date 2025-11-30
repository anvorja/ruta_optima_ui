// src/components/fleet/NewVehicleDialog.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFleetStore } from '@/store/useFleetStore'
import { vehicleSchema, type VehicleFormData } from '@/lib/validationSchemas'
import { useToast } from '@/components/ui/use-toast'

interface NewVehicleDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function NewVehicleDialog({ open, onOpenChange }: NewVehicleDialogProps) {
    const addVehicle = useFleetStore((state) => state.addVehicle)
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            type: 'Camioneta',
            status: 'available',
            fuel: 100,
            currentLoad: 0,
            fuelType: 'Gasolina'
        }
    })

    const onSubmit = async (data: VehicleFormData) => {
        setIsSubmitting(true)
        try {
            addVehicle(data)
            toast({
                title: "Vehículo agregado",
                description: `El vehículo ${data.name} ha sido agregado exitosamente.`,
            })
            reset()
            onOpenChange(false)
        } catch {
            toast({
                title: "Error",
                description: "No se pudo agregar el vehículo. Intenta de nuevo.",
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
                    <DialogTitle>Agregar Vehículo</DialogTitle>
                    <DialogDescription>
                        Completa los detalles del nuevo vehículo
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre *</Label>
                            <Input
                                id="name"
                                placeholder="Camión Grande 1"
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="plate">Placa *</Label>
                            <Input
                                id="plate"
                                placeholder="ABC-123"
                                {...register('plate')}
                            />
                            {errors.plate && (
                                <p className="text-sm text-red-500">{errors.plate.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo *</Label>
                            <Select
                                value={watch('type')}
                                onValueChange={(value) => setValue('type', value as 'Camión' | 'Camioneta' | 'Moto' | 'Van')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Camión">Camión</SelectItem>
                                    <SelectItem value="Camioneta">Camioneta</SelectItem>
                                    <SelectItem value="Van">Van</SelectItem>
                                    <SelectItem value="Moto">Moto</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fuelType">Tipo de Combustible</Label>
                            <Select
                                value={watch('fuelType')}
                                onValueChange={(value) => setValue('fuelType', value as 'Gasolina' | 'Diesel' | 'Eléctrico')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Gasolina">Gasolina</SelectItem>
                                    <SelectItem value="Diesel">Diesel</SelectItem>
                                    <SelectItem value="Eléctrico">Eléctrico</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="capacity">Capacidad (kg) *</Label>
                            <Input
                                id="capacity"
                                type="number"
                                min="1"
                                {...register('capacity', { valueAsNumber: true })}
                            />
                            {errors.capacity && (
                                <p className="text-sm text-red-500">{errors.capacity.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fuel">Combustible (%) *</Label>
                            <Input
                                id="fuel"
                                type="number"
                                min="0"
                                max="100"
                                {...register('fuel', { valueAsNumber: true })}
                            />
                            {errors.fuel && (
                                <p className="text-sm text-red-500">{errors.fuel.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year">Año</Label>
                            <Input
                                id="year"
                                type="number"
                                min="1990"
                                max={new Date().getFullYear() + 1}
                                {...register('year', { valueAsNumber: true })}
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="driver">Conductor *</Label>
                            <Input
                                id="driver"
                                placeholder="Nombre del conductor"
                                {...register('driver')}
                            />
                            {errors.driver && (
                                <p className="text-sm text-red-500">{errors.driver.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Ubicación *</Label>
                            <Input
                                id="location"
                                placeholder="Base, Zona Norte, etc."
                                {...register('location')}
                            />
                            {errors.location && (
                                <p className="text-sm text-red-500">{errors.location.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Estado *</Label>
                        <Select
                            value={watch('status')}
                            onValueChange={(value) => setValue('status', value as 'active' | 'available' | 'maintenance' | 'inactive')}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="available">Disponible</SelectItem>
                                <SelectItem value="active">En Ruta</SelectItem>
                                <SelectItem value="maintenance">Mantenimiento</SelectItem>
                                <SelectItem value="inactive">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
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
                            {isSubmitting ? 'Agregando...' : 'Agregar Vehículo'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
