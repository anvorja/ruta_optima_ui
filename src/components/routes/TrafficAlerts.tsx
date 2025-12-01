// src/components/routes/TrafficAlerts.tsx
import { AlertTriangle, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TrafficAlert {
    zone: string
    status: "high" | "normal"
    delay?: string
}

interface TrafficAlertsProps {
    alerts?: TrafficAlert[]
}

const defaultAlerts: TrafficAlert[] = [
    { zone: "Zona Centro", status: "high", delay: "+15 min estimados" },
    { zone: "Av. Norte", status: "normal" },
    { zone: "Zona Sur", status: "normal" },
]

export function TrafficAlerts({ alerts = defaultAlerts }: TrafficAlertsProps) {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <h3 className="text-sm font-medium text-foreground">Alertas de Tráfico</h3>
            </div>

            <div className="space-y-2">
                {alerts.map((alert, index) => (
                    <div
                        key={index}
                        className={cn(
                            "rounded-lg border p-3 transition-colors",
                            alert.status === "high"
                                ? "bg-warning/10 border-warning/20 hover:bg-warning/15"
                                : "bg-muted/50 border-border hover:bg-muted"
                        )}
                    >
                        <div className="flex items-start gap-2">
                            {alert.status === "high" ? (
                                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                            ) : (
                                <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                                <p className={cn(
                                    "text-sm font-medium",
                                    alert.status === "high" ? "text-foreground" : "text-muted-foreground"
                                )}>
                                    {alert.zone}
                                    {alert.status === "high" && " - Congestión alta"}
                                    {alert.status === "normal" && " - Tráfico normal"}
                                </p>
                                {alert.delay && (
                                    <p className="text-xs text-muted-foreground mt-1">{alert.delay}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}