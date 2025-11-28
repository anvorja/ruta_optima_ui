import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { useOrdersStore, type Order } from '@/store/useOrdersStore'
import { Package, MapPin, Clock, AlertCircle, Calendar, Weight } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface OrderDetailsDialogProps {
    orderId: string | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

const statusLabels = {
    pending: 'Pendiente',
    'in-route': 'En Ruta',
    delivered: 'Entregada',
    cancelled: 'Cancelada'
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'in-route': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
}

const priorityLabels = {
    high: 'Alta',
    medium: 'Media',
    low: 'Baja'
}

const priorityColors = {
    high: 'text-red-600 dark:text-red-400',
    medium: 'text-orange-600 dark:text-orange-400',
    low: 'text-gray-600 dark:text-gray-400'
}

export function OrderDetailsDialog({ orderId, open, onOpenChange }: OrderDetailsDialogProps) {
    const getOrderById = useOrdersStore((state) => state.getOrderById)
    const order = orderId ? getOrderById(orderId) : null

    if (!order) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>Detalles de la Orden</DialogTitle>
                        <Badge className={statusColors[order.status]}>
                            {statusLabels[order.status]}
                        </Badge>
                    </div>
                    <DialogDescription>
                        Orden {order.id}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Client Info */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground">CLIENTE</h3>
                        <p className="text-lg font-medium">{order.client}</p>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            DIRECCIÓN
                        </h3>
                        <p className="text-base">{order.address}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <Package className="w-4 h-4" />
                                ITEMS
                            </h3>
                            <p className="text-base">{order.items} items</p>
                        </div>

                        {order.weight && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                    <Weight className="w-4 h-4" />
                                    PESO
                                </h3>
                                <p className="text-base">{order.weight} kg</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                VENTANA DE TIEMPO
                            </h3>
                            <p className="text-base">{order.window}</p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                PRIORIDAD
                            </h3>
                            <p className={`text-base font-medium ${priorityColors[order.priority]}`}>
                                {priorityLabels[order.priority]}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                FECHA DE CREACIÓN
                            </h3>
                            <p className="text-base">
                                {format(order.createdAt, "d 'de' MMMM, yyyy", { locale: es })}
                            </p>
                        </div>

                        {order.deliveredAt && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    FECHA DE ENTREGA
                                </h3>
                                <p className="text-base">
                                    {format(order.deliveredAt, "d 'de' MMMM, yyyy", { locale: es })}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Notes */}
                    {order.notes && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground">NOTAS</h3>
                            <p className="text-base text-muted-foreground">{order.notes}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
