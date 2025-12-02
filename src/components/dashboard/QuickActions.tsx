// src/components/dashboard/QuickActions.tsx
import { Plus, Zap, Map, FileText, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import * as React from "react";

interface QuickAction {
    id: string
    title: string
    description: string
    icon: React.ElementType
    color: string
    bgColor: string
    action: () => void
}

const quickActions: QuickAction[] = [
    {
        id: "new-order",
        title: "Nueva Orden",
        description: "Crear orden de entrega",
        icon: Plus,
        color: "text-primary",
        bgColor: "bg-primary/10 group-hover:bg-primary/20",
        action: () => console.log("Nueva Orden")
    },
    {
        id: "optimize-routes",
        title: "Optimizar Rutas",
        description: "Rutas pendientes",
        icon: Zap,
        color: "text-warning",
        bgColor: "bg-warning/10 group-hover:bg-warning/20",
        action: () => console.log("Optimizar")
    },
    {
        id: "live-map",
        title: "Mapa en Vivo",
        description: "Ver ubicaciones",
        icon: Map,
        color: "text-success",
        bgColor: "bg-success/10 group-hover:bg-success/20",
        action: () => console.log("Mapa")
    },
    {
        id: "daily-report",
        title: "Reporte Diario",
        description: "Generar reporte",
        icon: FileText,
        color: "text-route-tertiary",
        bgColor: "bg-purple-500/10 group-hover:bg-purple-500/20",
        action: () => console.log("Reporte")
    }
]

export function QuickActions() {
    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border p-4 sm:p-5 bg-muted/30">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Acciones Rápidas</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Accesos directos a funciones principales</p>
            </div>

            <div className="p-3 sm:p-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon
                        return (
                            <button
                                key={action.id}
                                onClick={action.action}
                                className={cn(
                                    "group relative overflow-hidden rounded-lg border border-border bg-card p-3 sm:p-4",
                                    "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50",
                                    "text-left"
                                )}
                                style={{
                                    animation: `fade-up 0.3s ease-out ${index * 0.1}s forwards`,
                                    opacity: 0
                                }}
                            >
                                {/* Background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative space-y-2 sm:space-y-3">
                                    {/* Icon */}
                                    <div className={cn(
                                        "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg transition-all duration-300",
                                        action.bgColor
                                    )}>
                                        <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", action.color)} />
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-0.5 sm:space-y-1">
                                        <h4 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1">
                                            {action.title}
                                        </h4>
                                        <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                                            {action.description}
                                        </p>
                                    </div>

                                    {/* Arrow icon on hover */}
                                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className={cn("h-3 w-3 sm:h-4 sm:w-4", action.color)} />
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}