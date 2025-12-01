// src/components/profile/ActivityLog.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Package, Route, Settings, Zap, MapPin } from "lucide-react"

interface ActivityItem {
    id: string
    action: string
    description: string
    timestamp: string
    type: "order" | "route" | "optimization" | "settings" | "vehicle"
}

const activityTypeConfig = {
    order: { icon: Package, color: "text-primary" },
    route: { icon: Route, color: "text-success" },
    optimization: { icon: Zap, color: "text-warning" },
    settings: { icon: Settings, color: "text-muted-foreground" },
    vehicle: { icon: MapPin, color: "text-route-tertiary" },
}

export function ActivityLog() {
    const activities: ActivityItem[] = [
        {
            id: "1",
            action: "Optimización de rutas",
            description: "Optimizaste 3 rutas con 18% de ahorro",
            timestamp: "Hace 2 horas",
            type: "optimization",
        },
        {
            id: "2",
            action: "Nueva orden creada",
            description: "Orden ORD-2465 para Almacenes Central",
            timestamp: "Hace 3 horas",
            type: "order",
        },
        {
            id: "3",
            action: "Ruta completada",
            description: "Ruta RUTA-023 completada exitosamente",
            timestamp: "Hace 5 horas",
            type: "route",
        },
        {
            id: "4",
            action: "Vehículo asignado",
            description: "V-004 asignado a Carlos Méndez",
            timestamp: "Ayer",
            type: "vehicle",
        },
        {
            id: "5",
            action: "Configuración actualizada",
            description: "Cambios en preferencias de notificación",
            timestamp: "Ayer",
            type: "settings",
        },
        {
            id: "6",
            action: "Optimización de rutas",
            description: "Optimizaste 5 rutas con 22% de ahorro",
            timestamp: "Hace 2 días",
            type: "optimization",
        },
        {
            id: "7",
            action: "Nueva orden creada",
            description: "Orden ORD-2463 para Supermercado Norte",
            timestamp: "Hace 2 días",
            type: "order",
        },
        {
            id: "8",
            action: "Ruta modificada",
            description: "Ruta RUTA-020 actualizada manualmente",
            timestamp: "Hace 3 días",
            type: "route",
        },
    ]

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Actividad Reciente
                    </CardTitle>
                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                        {activities.length} eventos
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => {
                        const config = activityTypeConfig[activity.type]
                        const Icon = config.icon

                        return (
                            <div key={activity.id} className="relative">
                                {/* Timeline line */}
                                {index !== activities.length - 1 && (
                                    <div className="absolute left-5 top-10 h-full w-px bg-border" />
                                )}

                                {/* Activity item */}
                                <div className="flex gap-4">
                                    {/* Icon */}
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted shrink-0 relative z-10">
                                        <Icon className={`h-5 w-5 ${config.color}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 pb-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-foreground">{activity.action}</p>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {activity.description}
                                                </p>
                                            </div>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {activity.timestamp}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Mostrando las últimas 8 actividades
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}