// // src/components/dashboard/RecentOrders.tsx
// import { Package, Clock, MapPin, ChevronRight } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
//
// const orders = [
//     {
//         id: "ORD-2458",
//         customer: "Almacenes García",
//         address: "Av. Principal 123, Centro",
//         time: "10:30 - 11:00",
//         status: "en_camino",
//         priority: "alta",
//     },
//     {
//         id: "ORD-2459",
//         customer: "Supermercado El Sol",
//         address: "Calle Norte 456",
//         time: "11:00 - 12:00",
//         status: "pendiente",
//         priority: "normal",
//     },
//     {
//         id: "ORD-2460",
//         customer: "Farmacia Central",
//         address: "Plaza Mayor 789",
//         time: "11:30 - 12:30",
//         status: "en_camino",
//         priority: "urgente",
//     },
//     {
//         id: "ORD-2461",
//         customer: "Restaurante La Mesa",
//         address: "Av. Comercio 321",
//         time: "12:00 - 13:00",
//         status: "pendiente",
//         priority: "normal",
//     },
//     {
//         id: "ORD-2462",
//         customer: "Oficinas Corp",
//         address: "Torre Empresarial, P5",
//         time: "13:00 - 14:00",
//         status: "asignado",
//         priority: "normal",
//     },
// ]
//
// const statusConfig = {
//     en_camino: { label: "En Camino", className: "bg-success/20 text-success border-success/30" },
//     pendiente: { label: "Pendiente", className: "bg-muted text-muted-foreground" },
//     asignado: { label: "Asignado", className: "bg-primary/20 text-primary border-primary/30" },
// }
//
// const priorityConfig = {
//     urgente: { label: "Urgente", className: "bg-destructive/20 text-destructive" },
//     alta: { label: "Alta", className: "bg-warning/20 text-warning" },
//     normal: { label: "", className: "" },
// }
//
// export function RecentOrders() {
//     return (
//         <div className="rounded-xl border border-border bg-card">
//             <div className="flex items-center justify-between border-b border-border p-5">
//                 <div>
//                     <h3 className="text-lg font-semibold text-foreground">Próximas Entregas</h3>
//                     <p className="text-sm text-muted-foreground">Ventanas de tiempo activas</p>
//                 </div>
//                 <Button variant="ghost" size="sm" className="gap-1">
//                     Ver todas
//                     <ChevronRight className="h-4 w-4" />
//                 </Button>
//             </div>
//
//             <div className="divide-y divide-border">
//                 {orders.map((order) => (
//                     <div
//                         key={order.id}
//                         className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
//                     >
//                         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
//                             <Package className="h-5 w-5 text-primary" />
//                         </div>
//
//                         <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2">
//                                 <span className="font-medium text-foreground">{order.id}</span>
//                                 <Badge
//                                     variant="outline"
//                                     className={cn(
//                                         "text-[10px] px-1.5",
//                                         statusConfig[order.status as keyof typeof statusConfig].className
//                                     )}
//                                 >
//                                     {statusConfig[order.status as keyof typeof statusConfig].label}
//                                 </Badge>
//                                 {order.priority !== "normal" && (
//                                     <Badge
//                                         className={cn(
//                                             "text-[10px] px-1.5",
//                                             priorityConfig[order.priority as keyof typeof priorityConfig].className
//                                         )}
//                                     >
//                                         {priorityConfig[order.priority as keyof typeof priorityConfig].label}
//                                     </Badge>
//                                 )}
//                             </div>
//                             <p className="text-sm text-foreground truncate">{order.customer}</p>
//                         </div>
//
//                         <div className="hidden sm:flex flex-col items-end gap-1">
//                             <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                                 <Clock className="h-3 w-3" />
//                                 {order.time}
//                             </div>
//                             <div className="flex items-center gap-1 text-xs text-muted-foreground max-w-[150px] truncate">
//                                 <MapPin className="h-3 w-3 shrink-0" />
//                                 {order.address}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// src/components/dashboard/RecentOrders.tsx
import { Package, Clock, MapPin, ChevronRight, AlertCircle, Navigation } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const orders = [
    {
        id: "ORD-2458",
        customer: "Almacenes García",
        address: "Av. Principal 123, Centro",
        time: "10:30 - 11:00",
        status: "en_camino",
        priority: "alta",
        timestamp: "hace 5 min",
        driver: "Carlos M.",
        distance: "2.3 km"
    },
    {
        id: "ORD-2459",
        customer: "Supermercado El Sol",
        address: "Calle Norte 456",
        time: "11:00 - 12:00",
        status: "pendiente",
        priority: "normal",
        timestamp: "hace 12 min",
        distance: "5.8 km"
    },
    {
        id: "ORD-2460",
        customer: "Farmacia Central",
        address: "Plaza Mayor 789",
        time: "11:30 - 12:30",
        status: "en_camino",
        priority: "urgente",
        timestamp: "hace 15 min",
        driver: "Ana L.",
        distance: "1.2 km"
    },
    {
        id: "ORD-2461",
        customer: "Restaurante La Mesa",
        address: "Av. Comercio 321",
        time: "12:00 - 13:00",
        status: "pendiente",
        priority: "normal",
        timestamp: "hace 23 min",
        distance: "7.1 km"
    },
    {
        id: "ORD-2462",
        customer: "Oficinas Corp",
        address: "Torre Empresarial, P5",
        time: "13:00 - 14:00",
        status: "asignado",
        priority: "normal",
        timestamp: "hace 28 min",
        driver: "Pedro R.",
        distance: "4.5 km"
    },
    {
        id: "ORD-2463",
        customer: "Distribuidora Norte",
        address: "Zona Industrial 890",
        time: "13:30 - 14:30",
        status: "pendiente",
        priority: "alta",
        timestamp: "hace 32 min",
        distance: "9.2 km"
    },
    {
        id: "ORD-2464",
        customer: "Centro Comercial",
        address: "Plaza Central Local 45",
        time: "14:00 - 15:00",
        status: "asignado",
        priority: "normal",
        timestamp: "hace 35 min",
        driver: "María S.",
        distance: "3.7 km"
    },
    {
        id: "ORD-2465",
        customer: "Clínica Santa María",
        address: "Av. Salud 234",
        time: "14:30 - 15:30",
        status: "en_camino",
        priority: "urgente",
        timestamp: "hace 40 min",
        driver: "Jorge P.",
        distance: "2.8 km"
    },
]

const statusConfig = {
    en_camino: { label: "En Camino", className: "bg-success/20 text-success border-success/30", dot: "bg-success" },
    pendiente: { label: "Pendiente", className: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" },
    asignado: { label: "Asignado", className: "bg-primary/20 text-primary border-primary/30", dot: "bg-primary" },
}

const priorityConfig = {
    urgente: { label: "Urgente", className: "bg-destructive/20 text-destructive border-destructive/30", border: "border-l-destructive" },
    alta: { label: "Alta", className: "bg-warning/20 text-warning border-warning/30", border: "border-l-warning" },
    normal: { label: "", className: "", border: "border-l-muted" },
}

export function RecentOrders() {
    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border p-4 sm:p-5 bg-muted/30">
                <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">Próximas Entregas</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">8 entregas activas • En tiempo real</p>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-xs sm:text-sm">
                    Ver todas
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
            </div>

            <ScrollArea className="h-[400px] sm:h-[450px]">
                <div className="divide-y divide-border">
                    {orders.map((order, index) => (
                        <div
                            key={order.id}
                            className={cn(
                                "relative flex items-center gap-3 p-3 sm:gap-4 sm:p-4 transition-all hover:bg-muted/50 cursor-pointer group",
                                "border-l-2",
                                priorityConfig[order.priority as keyof typeof priorityConfig].border
                            )}
                            style={{
                                animation: `fade-up 0.3s ease-out ${index * 0.05}s forwards`,
                                opacity: 0
                            }}
                        >
                            {/* Status indicator dot */}
                            <div className="relative flex items-center justify-center">
                                <div className={cn(
                                    "h-2 w-2 rounded-full animate-pulse",
                                    statusConfig[order.status as keyof typeof statusConfig].dot
                                )} />
                                <div className={cn(
                                    "absolute h-2 w-2 rounded-full opacity-75",
                                    statusConfig[order.status as keyof typeof statusConfig].dot
                                )}
                                     style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                                />
                            </div>

                            {/* Icon */}
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-muted/70 transition-colors">
                                <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-medium text-sm sm:text-base text-foreground">{order.id}</span>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "text-[10px] px-1.5 h-5",
                                            statusConfig[order.status as keyof typeof statusConfig].className
                                        )}
                                    >
                                        {statusConfig[order.status as keyof typeof statusConfig].label}
                                    </Badge>
                                    {order.priority !== "normal" && (
                                        <Badge
                                            className={cn(
                                                "text-[10px] px-1.5 h-5",
                                                priorityConfig[order.priority as keyof typeof priorityConfig].className
                                            )}
                                        >
                                            <AlertCircle className="h-2.5 w-2.5 mr-0.5" />
                                            {priorityConfig[order.priority as keyof typeof priorityConfig].label}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xs sm:text-sm text-foreground font-medium truncate">{order.customer}</p>
                                <div className="flex items-center gap-3 text-[10px] sm:text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3 shrink-0" />
                                        {order.time}
                                    </span>
                                    <span>•</span>
                                    <span>{order.timestamp}</span>
                                </div>
                            </div>

                            {/* Right side info */}
                            <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
                                {order.driver && (
                                    <div className="text-xs font-medium text-foreground">
                                        {order.driver}
                                    </div>
                                )}
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Navigation className="h-3 w-3" />
                                    {order.distance}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground max-w-[150px] truncate">
                                    <MapPin className="h-3 w-3 shrink-0" />
                                    {order.address}
                                </div>
                            </div>

                            {/* Mobile bottom info */}
                            <div className="lg:hidden absolute bottom-2 right-3 flex items-center gap-2 text-[10px] text-muted-foreground">
                                {order.driver && <span>{order.driver}</span>}
                                <span>•</span>
                                <span className="flex items-center gap-0.5">
                                    <Navigation className="h-2.5 w-2.5" />
                                    {order.distance}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}