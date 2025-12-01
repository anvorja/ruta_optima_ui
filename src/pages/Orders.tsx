// import { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Package, Search, Filter, Plus, MapPin, Clock, CheckCircle2 } from 'lucide-react'
// import { NewOrderDialog } from '@/components/orders/NewOrderDialog'
// import { OrderDetailsDialog } from '@/components/orders/OrderDetailsDialog'
// import { EditOrderDialog } from '@/components/orders/EditOrderDialog'
// import { useOrdersStore } from '@/store/useOrdersStore'
// import { Toaster } from '@/components/ui/toaster'
//
// const statusColors = {
//     pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
//     'in-route': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
//     delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
// }
//
// const priorityColors = {
//     high: 'text-red-600 dark:text-red-400',
//     medium: 'text-orange-600 dark:text-orange-400',
//     low: 'text-gray-600 dark:text-gray-400',
// }
//
// export function Orders() {
//     const orders = useOrdersStore((state) => state.orders)
//     const [newOrderOpen, setNewOrderOpen] = useState(false)
//     const [detailsOrderId, setDetailsOrderId] = useState<string | null>(null)
//     const [editOrderId, setEditOrderId] = useState<string | null>(null)
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h2 className="text-2xl font-bold">Órdenes de Entrega</h2>
//                     <p className="text-muted-foreground">Gestiona y optimiza tus entregas</p>
//                 </div>
//                 <Button className="gap-2" onClick={() => setNewOrderOpen(true)}>
//                     <Plus className="w-4 h-4" />
//                     Nueva Orden
//                 </Button>
//             </div>
//
//             {/* Stats */}
//             <div className="grid gap-4 md:grid-cols-4">
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
//                                 <Package className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Pendientes</p>
//                                 <p className="text-2xl font-bold">48</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
//                                 <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">En Ruta</p>
//                                 <p className="text-2xl font-bold">12</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
//                                 <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Entregadas Hoy</p>
//                                 <p className="text-2xl font-bold">87</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//
//                 <Card className="border-0 shadow-lg">
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
//                                 <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
//                                 <p className="text-2xl font-bold">24m</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//
//             {/* Filters */}
//             <Card className="border-0 shadow-lg">
//                 <CardContent className="p-4">
//                     <div className="flex gap-4">
//                         <div className="flex-1 relative">
//                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                             <Input placeholder="Buscar órdenes..." className="pl-10" />
//                         </div>
//                         <Button variant="outline" className="gap-2">
//                             <Filter className="w-4 h-4" />
//                             Filtros
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>
//
//             {/* Orders Table */}
//             <Card className="border-0 shadow-lg">
//                 <CardHeader>
//                     <CardTitle>Lista de Órdenes</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="space-y-4">
//                         {orders.map((order) => (
//                             <div
//                                 key={order.id}
//                                 className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
//                             >
//                                 <div className="flex-1 min-w-0">
//                                     <div className="flex items-center gap-3 mb-2">
//                                         <span className="font-mono font-semibold">{order.id}</span>
//                                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
//                                             {order.status === 'pending' ? 'Pendiente' :
//                                                 order.status === 'in-route' ? 'En Ruta' : 'Entregada'}
//                                         </span>
//                                         <span className={`text-xs font-medium ${priorityColors[order.priority as keyof typeof priorityColors]}`}>
//                                             ● {order.priority === 'high' ? 'Alta' :
//                                                 order.priority === 'medium' ? 'Media' : 'Baja'}
//                                         </span>
//                                     </div>
//                                     <p className="font-medium">{order.client}</p>
//                                     <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
//                                         <span className="flex items-center gap-1">
//                                             <MapPin className="w-3 h-3" />
//                                             {order.address}
//                                         </span>
//                                         <span className="flex items-center gap-1">
//                                             <Clock className="w-3 h-3" />
//                                             {order.window}
//                                         </span>
//                                         <span className="flex items-center gap-1">
//                                             <Package className="w-3 h-3" />
//                                             {order.items} items
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <Button
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => setDetailsOrderId(order.id)}
//                                 >
//                                     Ver Detalles
//                                 </Button>
//                             </div>
//                         ))}
//                     </div>
//                 </CardContent>
//             </Card>
//
//             {/* Modals */}
//             <NewOrderDialog open={newOrderOpen} onOpenChange={setNewOrderOpen} />
//             <OrderDetailsDialog
//                 orderId={detailsOrderId}
//                 open={detailsOrderId !== null}
//                 onOpenChange={(open) => !open && setDetailsOrderId(null)}
//             />
//             <EditOrderDialog
//                 orderId={editOrderId}
//                 open={editOrderId !== null}
//                 onOpenChange={(open) => !open && setEditOrderId(null)}
//             />
//             <Toaster />
//         </div>
//     )
// }

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Package,
    Search,
    Filter,
    Upload,
    Plus,
    MapPin,
    Clock,
    Truck,
    MoreVertical,
    CheckCircle2,
    AlertCircle,
    Timer,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const ordersData = [
    {
        id: "ORD-2458",
        customer: "Almacenes García",
        address: "Av. Principal 123, Centro",
        timeWindow: "10:30 - 11:00",
        status: "entregado",
        priority: "alta",
        vehicle: "V-001",
        items: 12,
        weight: "45 kg",
    },
    {
        id: "ORD-2459",
        customer: "Supermercado El Sol",
        address: "Calle Norte 456",
        timeWindow: "11:00 - 12:00",
        status: "en_camino",
        priority: "normal",
        vehicle: "V-002",
        items: 8,
        weight: "32 kg",
    },
    {
        id: "ORD-2460",
        customer: "Farmacia Central",
        address: "Plaza Mayor 789",
        timeWindow: "11:30 - 12:30",
        status: "en_camino",
        priority: "urgente",
        vehicle: "V-001",
        items: 3,
        weight: "5 kg",
    },
    {
        id: "ORD-2461",
        customer: "Restaurante La Mesa",
        address: "Av. Comercio 321",
        timeWindow: "12:00 - 13:00",
        status: "pendiente",
        priority: "normal",
        vehicle: "-",
        items: 15,
        weight: "78 kg",
    },
    {
        id: "ORD-2462",
        customer: "Oficinas Corp",
        address: "Torre Empresarial, P5",
        timeWindow: "13:00 - 14:00",
        status: "asignado",
        priority: "normal",
        vehicle: "V-004",
        items: 5,
        weight: "12 kg",
    },
    {
        id: "ORD-2463",
        customer: "Tienda Express",
        address: "Zona Industrial 45",
        timeWindow: "14:00 - 15:00",
        status: "pendiente",
        priority: "alta",
        vehicle: "-",
        items: 20,
        weight: "95 kg",
    },
    {
        id: "ORD-2464",
        customer: "Centro Médico",
        address: "Av. Salud 100",
        timeWindow: "10:00 - 11:00",
        status: "retrasado",
        priority: "urgente",
        vehicle: "V-002",
        items: 2,
        weight: "3 kg",
    },
]

const statusConfig = {
    entregado: { label: "Entregado", icon: CheckCircle2, className: "bg-success/20 text-success" },
    en_camino: { label: "En Camino", icon: Truck, className: "bg-primary/20 text-primary" },
    asignado: { label: "Asignado", icon: Package, className: "bg-muted text-muted-foreground" },
    pendiente: { label: "Pendiente", icon: Timer, className: "bg-warning/20 text-warning" },
    retrasado: { label: "Retrasado", icon: AlertCircle, className: "bg-destructive/20 text-destructive" },
}

const priorityConfig = {
    urgente: { label: "Urgente", className: "bg-destructive/20 text-destructive" },
    alta: { label: "Alta", className: "bg-warning/20 text-warning" },
    normal: { label: "Normal", className: "bg-muted text-muted-foreground" },
}

export function Orders() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredOrders = ordersData.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Órdenes</h1>
                    <p className="text-sm text-muted-foreground">
                        {ordersData.length} órdenes totales · {ordersData.filter((o) => o.status === "pendiente").length} pendientes
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Importar Excel
                    </Button>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nueva Orden
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por ID o cliente..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los estados</SelectItem>
                            <SelectItem value="pendiente">Pendiente</SelectItem>
                            <SelectItem value="asignado">Asignado</SelectItem>
                            <SelectItem value="en_camino">En Camino</SelectItem>
                            <SelectItem value="entregado">Entregado</SelectItem>
                            <SelectItem value="retrasado">Retrasado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Card>

            {/* Orders Table */}
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Orden</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead className="hidden md:table-cell">Dirección</TableHead>
                            <TableHead className="hidden lg:table-cell">Ventana</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="hidden sm:table-cell">Prioridad</TableHead>
                            <TableHead className="hidden xl:table-cell">Vehículo</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.map((order) => {
                            const status = statusConfig[order.status as keyof typeof statusConfig]
                            const priority = priorityConfig[order.priority as keyof typeof priorityConfig]

                            return (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{order.id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{order.customer}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {order.items} items · {order.weight}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground max-w-[200px] truncate">
                                            <MapPin className="h-3 w-3 shrink-0" />
                                            {order.address}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <div className="flex items-center gap-1 text-sm">
                                            <Clock className="h-3 w-3 text-muted-foreground" />
                                            {order.timeWindow}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn("gap-1", status.className)}>
                                            <status.icon className="h-3 w-3" />
                                            {status.label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge variant="outline" className={priority.className}>
                                            {priority.label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden xl:table-cell">
                                        <span className="text-sm">{order.vehicle}</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                                <DropdownMenuItem>Asignar vehículo</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}