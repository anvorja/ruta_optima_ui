// src/components/dashboard/AlertsWidget.tsx
import { AlertCircle, AlertTriangle, Info, CheckCircle, X, Bell, BellRing } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import * as React from "react";

type AlertSeverity = "critical" | "warning" | "info" | "success"

interface Alert {
    id: string
    title: string
    message: string
    severity: AlertSeverity
    timestamp: string
    action?: {
        label: string
        onClick: () => void
    }
    dismissed?: boolean
}

const mockAlerts: Alert[] = [
    {
        id: "1",
        title: "Retraso Crítico",
        message: "Vehículo V-123 tiene 45 min de retraso en ruta Centro",
        severity: "critical",
        timestamp: "hace 2 min",
        action: {
            label: "Ver ruta",
            onClick: () => console.log("Ver ruta")
        }
    },
    {
        id: "2",
        title: "Combustible Bajo",
        message: "Vehículo V-456 con 15% de combustible",
        severity: "warning",
        timestamp: "hace 8 min",
        action: {
            label: "Asignar recarga",
            onClick: () => console.log("Asignar")
        }
    },
    {
        id: "3",
        title: "Entrega Completada",
        message: "Orden ORD-2458 entregada exitosamente",
        severity: "success",
        timestamp: "hace 12 min"
    },
    {
        id: "4",
        title: "Nueva Orden Asignada",
        message: "ORD-2470 asignada a Carlos M.",
        severity: "info",
        timestamp: "hace 15 min"
    },
    {
        id: "5",
        title: "Mantenimiento Programado",
        message: "V-789 requiere mantenimiento en 2 días",
        severity: "warning",
        timestamp: "hace 1 hora"
    }
]

const severityConfig: Record<AlertSeverity, {
    icon: React.ElementType
    bgColor: string
    textColor: string
    borderColor: string
    badgeColor: string
}> = {
    critical: {
        icon: AlertCircle,
        bgColor: "bg-destructive/10",
        textColor: "text-destructive",
        borderColor: "border-l-destructive",
        badgeColor: "bg-destructive/20 text-destructive"
    },
    warning: {
        icon: AlertTriangle,
        bgColor: "bg-warning/10",
        textColor: "text-warning",
        borderColor: "border-l-warning",
        badgeColor: "bg-warning/20 text-warning"
    },
    info: {
        icon: Info,
        bgColor: "bg-primary/10",
        textColor: "text-primary",
        borderColor: "border-l-primary",
        badgeColor: "bg-primary/20 text-primary"
    },
    success: {
        icon: CheckCircle,
        bgColor: "bg-success/10",
        textColor: "text-success",
        borderColor: "border-l-success",
        badgeColor: "bg-success/20 text-success"
    }
}

export function AlertsWidget() {
    const criticalCount = mockAlerts.filter(a => a.severity === "critical").length
    const warningCount = mockAlerts.filter(a => a.severity === "warning").length

    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border p-4 sm:p-5 bg-muted/30">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                        <BellRing className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                        {(criticalCount > 0 || warningCount > 0) && (
                            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive animate-pulse" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-foreground">Alertas</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            {criticalCount} críticas • {warningCount} advertencias
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                    <Bell className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Configurar
                </Button>
            </div>

            <ScrollArea className="h-[300px] sm:h-[350px]">
                <div className="divide-y divide-border">
                    {mockAlerts.map((alert, index) => {
                        const config = severityConfig[alert.severity]
                        const Icon = config.icon

                        return (
                            <div
                                key={alert.id}
                                className={cn(
                                    "relative group p-3 sm:p-4 transition-colors hover:bg-muted/50 border-l-2",
                                    config.borderColor
                                )}
                                style={{
                                    animation: `fade-up 0.3s ease-out ${index * 0.05}s forwards`,
                                    opacity: 0
                                }}
                            >
                                {/* Dismiss button */}
                                <button
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
                                    onClick={() => console.log("Dismiss", alert.id)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground" />
                                </button>

                                <div className="flex gap-3">
                                    {/* Icon */}
                                    <div className={cn(
                                        "flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg",
                                        config.bgColor
                                    )}>
                                        <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", config.textColor)} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                                                {alert.title}
                                            </h4>
                                            <Badge
                                                variant="outline"
                                                className={cn("text-[9px] sm:text-[10px] px-1.5 shrink-0", config.badgeColor)}
                                            >
                                                {alert.severity}
                                            </Badge>
                                        </div>

                                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                            {alert.message}
                                        </p>

                                        <div className="flex items-center justify-between pt-1">
                                            <span className="text-[10px] sm:text-xs text-muted-foreground">
                                                {alert.timestamp}
                                            </span>
                                            {alert.action && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={cn("text-xs h-7 px-2", config.textColor)}
                                                    onClick={alert.action.onClick}
                                                >
                                                    {alert.action.label}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}