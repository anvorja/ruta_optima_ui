// src/components/dashboard/OptimizationPanel.tsx
import { Zap, TrendingDown, Clock, Fuel, DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const optimizationMetrics = [
    {
        label: "Ahorro de tiempo",
        value: "2.5h",
        change: "-18%",
        icon: Clock,
        progress: 75,
        color: "bg-primary",
    },
    {
        label: "Combustible",
        value: "45L",
        change: "-22%",
        icon: Fuel,
        progress: 82,
        color: "bg-success",
    },
    {
        label: "Costo operativo",
        value: "$1,250",
        change: "-15%",
        icon: DollarSign,
        progress: 68,
        color: "bg-warning",
    },
]

export function OptimizationPanel() {
    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Header with gradient */}
            <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-5">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                            <Zap className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Motor de Optimización</h3>
                            <p className="text-sm text-muted-foreground">IA + VRP Multicriterio</p>
                        </div>
                    </div>
                    <Button className="gap-2 gradient-primary hover:opacity-90">
                        Optimizar Rutas
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid gap-4 p-5 md:grid-cols-3">
                {optimizationMetrics.map((metric) => (
                    <div key={metric.label} className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <metric.icon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{metric.label}</span>
                            </div>
                            <span className="flex items-center gap-1 text-xs text-success">
                <TrendingDown className="h-3 w-3" />
                                {metric.change}
              </span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                            <Progress value={metric.progress} className={`h-1.5 ${metric.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-muted/30 px-5 py-3">
                <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Última optimización: <span className="text-foreground">hace 15 min</span>
          </span>
                    <span className="text-muted-foreground">
            Algoritmo: <span className="text-primary">CVRPTW + A*</span>
          </span>
                </div>
            </div>
        </div>
    )
}