import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package, Search, Filter, Plus, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { NewOrderDialog } from '@/components/orders/NewOrderDialog'
import { OrderDetailsDialog } from '@/components/orders/OrderDetailsDialog'
import { EditOrderDialog } from '@/components/orders/EditOrderDialog'
import { useOrdersStore } from '@/store/useOrdersStore'
import { Toaster } from '@/components/ui/toaster'



const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'in-route': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
}

const priorityColors = {
    high: 'text-red-600 dark:text-red-400',
    medium: 'text-orange-600 dark:text-orange-400',
    low: 'text-gray-600 dark:text-gray-400',
}

export function Orders() {
    const orders = useOrdersStore((state) => state.orders)
    const [newOrderOpen, setNewOrderOpen] = useState(false)
    const [detailsOrderId, setDetailsOrderId] = useState<string | null>(null)
    const [editOrderId, setEditOrderId] = useState<string | null>(null)
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Órdenes de Entrega</h2>
                    <p className="text-muted-foreground">Gestiona y optimiza tus entregas</p>
                </div>
                <Button className="gap-2" onClick={() => setNewOrderOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Nueva Orden
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                <Package className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Pendientes</p>
                                <p className="text-2xl font-bold">48</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">En Ruta</p>
                                <p className="text-2xl font-bold">12</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Entregadas Hoy</p>
                                <p className="text-2xl font-bold">87</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
                                <p className="text-2xl font-bold">24m</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Buscar órdenes..." className="pl-10" />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Filtros
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle>Lista de Órdenes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-mono font-semibold">{order.id}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                                            {order.status === 'pending' ? 'Pendiente' :
                                                order.status === 'in-route' ? 'En Ruta' : 'Entregada'}
                                        </span>
                                        <span className={`text-xs font-medium ${priorityColors[order.priority as keyof typeof priorityColors]}`}>
                                            ● {order.priority === 'high' ? 'Alta' :
                                                order.priority === 'medium' ? 'Media' : 'Baja'}
                                        </span>
                                    </div>
                                    <p className="font-medium">{order.client}</p>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {order.address}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {order.window}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Package className="w-3 h-3" />
                                            {order.items} items
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setDetailsOrderId(order.id)}
                                >
                                    Ver Detalles
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Modals */}
            <NewOrderDialog open={newOrderOpen} onOpenChange={setNewOrderOpen} />
            <OrderDetailsDialog
                orderId={detailsOrderId}
                open={detailsOrderId !== null}
                onOpenChange={(open) => !open && setDetailsOrderId(null)}
            />
            <EditOrderDialog
                orderId={editOrderId}
                open={editOrderId !== null}
                onOpenChange={(open) => !open && setEditOrderId(null)}
            />
            <Toaster />
        </div>
    )
}
