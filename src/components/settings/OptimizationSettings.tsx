// src/components/settings/OptimizationSettings.tsx
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Zap, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import * as React from "react";

export function OptimizationSettings() {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const [settings, setSettings] = useState({
        priority: "time",
        considerTraffic: true,
        respectTimeWindows: true,
        maxStopsPerRoute: 10,
        algorithm: "cvrptw",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Preferencias guardadas",
            description: "Las configuraciones de optimización han sido actualizadas.",
        })
        setIsLoading(false)
    }

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Preferencias de Optimización
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="priority">Prioridad de Optimización *</Label>
                        <Select
                            value={settings.priority}
                            onValueChange={(value) => setSettings({ ...settings, priority: value })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="time">Tiempo</SelectItem>
                                <SelectItem value="distance">Distancia</SelectItem>
                                <SelectItem value="cost">Costo</SelectItem>
                                <SelectItem value="balanced">Balanceado</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            Define qué factor es más importante al optimizar rutas
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="algorithm">Algoritmo de Optimización</Label>
                        <Select
                            value={settings.algorithm}
                            onValueChange={(value) => setSettings({ ...settings, algorithm: value })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cvrptw">CVRPTW (Recomendado)</SelectItem>
                                <SelectItem value="astar">A* Algorithm</SelectItem>
                                <SelectItem value="genetic">Algoritmo Genético</SelectItem>
                                <SelectItem value="hybrid">Híbrido (IA + Heurística)</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            Capacitated Vehicle Routing Problem with Time Windows
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="maxStops">Máximo de Paradas por Ruta *</Label>
                        <Input
                            id="maxStops"
                            type="number"
                            min="1"
                            max="50"
                            value={settings.maxStopsPerRoute}
                            onChange={(e) =>
                                setSettings({ ...settings, maxStopsPerRoute: parseInt(e.target.value) })
                            }
                        />
                        <p className="text-xs text-muted-foreground">
                            Limita el número de paradas asignadas a cada ruta
                        </p>
                    </div>

                    <div className="space-y-4 pt-2 border-t">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label>Considerar Tráfico en Tiempo Real</Label>
                                <p className="text-xs text-muted-foreground">
                                    Ajusta las rutas según condiciones de tráfico actuales
                                </p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={settings.considerTraffic}
                                onClick={() =>
                                    setSettings({ ...settings, considerTraffic: !settings.considerTraffic })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                    settings.considerTraffic ? "bg-primary" : "bg-input"
                                }`}
                            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        settings.considerTraffic ? "translate-x-6" : "translate-x-1"
                    }`}
                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label>Respetar Ventanas de Tiempo</Label>
                                <p className="text-xs text-muted-foreground">
                                    Prioriza las entregas dentro del horario especificado
                                </p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={settings.respectTimeWindows}
                                onClick={() =>
                                    setSettings({ ...settings, respectTimeWindows: !settings.respectTimeWindows })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                    settings.respectTimeWindows ? "bg-primary" : "bg-input"
                                }`}
                            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        settings.respectTimeWindows ? "translate-x-6" : "translate-x-1"
                    }`}
                />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
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