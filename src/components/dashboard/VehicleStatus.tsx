// src/components/dashboard/VehicleStatus.tsx
import { Truck, MapPin, Clock, Fuel } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const vehicles = [
    {
        id: "V-001",
        driver: "Carlos Méndez",
        status: "en_ruta",
        location: "Zona Centro",
        progress: 75,
        eta: "15 min",
        fuel: 85,
    },
    {
        id: "V-002",
        driver: "Ana García",
        status: "en_ruta",
        location: "Zona Norte",
        progress: 45,
        eta: "32 min",
        fuel: 72,
    },
    {
        id: "V-003",
        driver: "Miguel Torres",
        status: "detenido",
        location: "Zona Sur",
        progress: 60,
        eta: "-",
        fuel: 45,
    },
    {
        id: "V-004",
        driver: "Laura Ruiz",
        status: "en_ruta",
        location: "Zona Este",
        progress: 90,
        eta: "8 min",
        fuel: 63,
    },
    {
        id: "V-005",
        driver: "Roberto Díaz",
        status: "completado",
        location: "Base",
        progress: 100,
        eta: "-",
        fuel: 55,
    },
]

const statusConfig = {
    en_ruta: { label: "En Ruta", variant: "default" as const, className: "bg-success/20 text-success border-success/30" },
    detenido: { label: "Detenido", variant: "secondary" as const, className: "bg-warning/20 text-warning border-warning/30" },
    completado: { label: "Completado", variant: "outline" as const, className: "bg-muted text-muted-foreground" },
}

export function VehicleStatus() {
    return (
        <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-5">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Estado de Flota</h3>
                    <p className="text-sm text-muted-foreground">Seguimiento en tiempo real</p>
                </div>
                <Badge variant="outline" className="gap-1">
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    12 activos
                </Badge>
            </div>

            <div className="divide-y divide-border">
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle.id}
                        className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Truck className="h-5 w-5 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{vehicle.id}</span>
                                <Badge
                                    variant={statusConfig[vehicle.status as keyof typeof statusConfig].variant}
                                    className={cn(
                                        "text-[10px] px-1.5",
                                        statusConfig[vehicle.status as keyof typeof statusConfig].className
                                    )}
                                >
                                    {statusConfig[vehicle.status as keyof typeof statusConfig].label}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{vehicle.driver}</p>
                        </div>

                        <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {vehicle.location}
                        </div>

                        <div className="hidden md:block w-24">
                            <Progress value={vehicle.progress} className="h-1.5" />
                            <p className="mt-1 text-[10px] text-muted-foreground text-right">
                                {vehicle.progress}%
                            </p>
                        </div>

                        <div className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground w-16">
                            <Clock className="h-3 w-3" />
                            {vehicle.eta}
                        </div>

                        <div className="hidden xl:flex items-center gap-1 text-xs w-12">
                            <Fuel className={cn("h-3 w-3", vehicle.fuel < 50 ? "text-warning" : "text-muted-foreground")} />
                            <span className={vehicle.fuel < 50 ? "text-warning" : "text-muted-foreground"}>
                {vehicle.fuel}%
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}