// src/components/settings/NotificationSettings.tsx
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import * as React from "react";

interface NotificationSetting {
    id: string
    title: string
    description: string
    enabled: boolean
}

export function NotificationSettings() {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const [notifications, setNotifications] = useState<NotificationSetting[]>([
        {
            id: "new-orders",
            title: "Nuevas Órdenes",
            description: "Recibe notificaciones cuando se crean nuevas órdenes",
            enabled: true,
        },
        {
            id: "deliveries",
            title: "Entregas Completadas",
            description: "Notificación cuando se completa una entrega",
            enabled: true,
        },
        {
            id: "delays",
            title: "Retrasos en Rutas",
            description: "Alertas cuando una ruta está retrasada",
            enabled: true,
        },
        {
            id: "maintenance",
            title: "Alertas de Mantenimiento",
            description: "Recordatorios de mantenimiento de vehículos",
            enabled: true,
        },
        {
            id: "fuel",
            title: "Combustible Bajo",
            description: "Notifica cuando un vehículo tiene combustible bajo",
            enabled: true,
        },
        {
            id: "optimization",
            title: "Optimización Completada",
            description: "Aviso cuando se completa la optimización de rutas",
            enabled: false,
        },
        {
            id: "reports",
            title: "Reportes Semanales",
            description: "Resumen semanal de operaciones por email",
            enabled: false,
        },
        {
            id: "system",
            title: "Actualizaciones del Sistema",
            description: "Notificaciones sobre nuevas funciones y mejoras",
            enabled: true,
        },
    ])

    const toggleNotification = (id: string) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
            )
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Configuración guardada",
            description: "Tus preferencias de notificación han sido actualizadas.",
        })
        setIsLoading(false)
    }

    const enabledCount = notifications.filter((n) => n.enabled).length

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        Configuración de Notificaciones
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
            {enabledCount} de {notifications.length} activas
          </span>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                            >
                                <div className="space-y-1 flex-1">
                                    <p className="font-medium text-foreground">{notification.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {notification.description}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={notification.enabled}
                                    onClick={() => toggleNotification(notification.id)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ml-4 ${
                                        notification.enabled ? "bg-primary" : "bg-input"
                                    }`}
                                >
                  <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                          notification.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                        <Button type="submit" disabled={isLoading} className="gap-2">
                            <Save className="h-4 w-4" />
                            {isLoading ? "Guardando..." : "Guardar Configuración"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}