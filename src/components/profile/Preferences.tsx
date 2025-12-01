// src/components/profile/Preferences.tsx
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Settings2, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import * as React from "react";

export function Preferences() {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const [preferences, setPreferences] = useState({
        theme: "dark",
        language: "es",
        dateFormat: "dd/mm/yyyy",
        timeFormat: "24h",
        notifications: true,
        sounds: false,
        autoOptimize: true,
        emailReports: true,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Preferencias guardadas",
            description: "Tus preferencias de interfaz han sido actualizadas.",
        })
        setIsLoading(false)
    }

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings2 className="h-5 w-5 text-primary" />
                    Preferencias de Interfaz
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="theme">Tema de Color</Label>
                            <Select
                                value={preferences.theme}
                                onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Claro</SelectItem>
                                    <SelectItem value="dark">Oscuro</SelectItem>
                                    <SelectItem value="system">Sistema</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="language">Idioma</Label>
                            <Select
                                value={preferences.language}
                                onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="es">Español</SelectItem>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="pt">Português</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="dateFormat">Formato de Fecha</Label>
                            <Select
                                value={preferences.dateFormat}
                                onValueChange={(value) =>
                                    setPreferences({ ...preferences, dateFormat: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dd/mm/yyyy">DD/MM/AAAA</SelectItem>
                                    <SelectItem value="mm/dd/yyyy">MM/DD/AAAA</SelectItem>
                                    <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="timeFormat">Formato de Hora</Label>
                            <Select
                                value={preferences.timeFormat}
                                onValueChange={(value) =>
                                    setPreferences({ ...preferences, timeFormat: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                                    <SelectItem value="24h">24 horas</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4 pt-2 border-t">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label>Notificaciones de Escritorio</Label>
                                <p className="text-xs text-muted-foreground">
                                    Recibir notificaciones en el navegador
                                </p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={preferences.notifications}
                                onClick={() =>
                                    setPreferences({ ...preferences, notifications: !preferences.notifications })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                    preferences.notifications ? "bg-primary" : "bg-input"
                                }`}
                            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        preferences.notifications ? "translate-x-6" : "translate-x-1"
                    }`}
                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label>Sonidos</Label>
                                <p className="text-xs text-muted-foreground">
                                    Reproducir sonidos para notificaciones
                                </p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={preferences.sounds}
                                onClick={() =>
                                    setPreferences({ ...preferences, sounds: !preferences.sounds })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                    preferences.sounds ? "bg-primary" : "bg-input"
                                }`}
                            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        preferences.sounds ? "translate-x-6" : "translate-x-1"
                    }`}
                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label>Optimización Automática</Label>
                                <p className="text-xs text-muted-foreground">
                                    Optimizar rutas automáticamente cada día
                                </p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={preferences.autoOptimize}
                                onClick={() =>
                                    setPreferences({ ...preferences, autoOptimize: !preferences.autoOptimize })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                    preferences.autoOptimize ? "bg-primary" : "bg-input"
                                }`}
                            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        preferences.autoOptimize ? "translate-x-6" : "translate-x-1"
                    }`}
                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label>Reportes por Email</Label>
                                <p className="text-xs text-muted-foreground">
                                    Recibir resumen semanal por correo
                                </p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={preferences.emailReports}
                                onClick={() =>
                                    setPreferences({ ...preferences, emailReports: !preferences.emailReports })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                    preferences.emailReports ? "bg-primary" : "bg-input"
                                }`}
                            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        preferences.emailReports ? "translate-x-6" : "translate-x-1"
                    }`}
                />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                        <Button type="submit" disabled={isLoading} className="gap-2">
                            <Save className="h-4 w-4" />
                            {isLoading ? "Guardando..." : "Guardar Preferencias"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}