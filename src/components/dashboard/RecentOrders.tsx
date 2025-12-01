// src/components/dashboard/RecentOrders.tsx
import { Package, Clock, MapPin, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const orders = [
    {
        id: "ORD-2458",
        customer: "Almacenes García",
        address: "Av. Principal 123, Centro",
        time: "10:30 - 11:00",
        status: "en_camino",
        priority: "alta",
    },
    {
        id: "ORD-2459",
        customer: "Supermercado El Sol",
        address: "Calle Norte 456",
        time: "11:00 - 12:00",
        status: "pendiente",
        priority: "normal",
    },
    {
        id: "ORD-2460",
        customer: "Farmacia Central",
        address: "Plaza Mayor 789",
        time: "11:30 - 12:30",
        status: "en_camino",
        priority: "urgente",
    },
    {
        id: "ORD-2461",
        customer: "Restaurante La Mesa",
        address: "Av. Comercio 321",
        time: "12:00 - 13:00",
        status: "pendiente",
        priority: "normal",
    },
    {
        id: "ORD-2462",
        customer: "Oficinas Corp",
        address: "Torre Empresarial, P5",
        time: "13:00 - 14:00",
        status: "asignado",
        priority: "normal",
    },
]

const statusConfig = {
    en_camino: { label: "En Camino", className: "bg-success/20 text-success border-success/30" },
    pendiente: { label: "Pendiente", className: "bg-muted text-muted-foreground" },
    asignado: { label: "Asignado", className: "bg-primary/20 text-primary border-primary/30" },
}

const priorityConfig = {
    urgente: { label: "Urgente", className: "bg-destructive/20 text-destructive" },
    alta: { label: "Alta", className: "bg-warning/20 text-warning" },
    normal: { label: "", className: "" },
}

export function RecentOrders() {
    return (
        <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-5">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Próximas Entregas</h3>
                    <p className="text-sm text-muted-foreground">Ventanas de tiempo activas</p>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                    Ver todas
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="divide-y divide-border">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Package className="h-5 w-5 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{order.id}</span>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "text-[10px] px-1.5",
                                        statusConfig[order.status as keyof typeof statusConfig].className
                                    )}
                                >
                                    {statusConfig[order.status as keyof typeof statusConfig].label}
                                </Badge>
                                {order.priority !== "normal" && (
                                    <Badge
                                        className={cn(
                                            "text-[10px] px-1.5",
                                            priorityConfig[order.priority as keyof typeof priorityConfig].className
                                        )}
                                    >
                                        {priorityConfig[order.priority as keyof typeof priorityConfig].label}
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm text-foreground truncate">{order.customer}</p>
                        </div>

                        <div className="hidden sm:flex flex-col items-end gap-1">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {order.time}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground max-w-[150px] truncate">
                                <MapPin className="h-3 w-3 shrink-0" />
                                {order.address}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}