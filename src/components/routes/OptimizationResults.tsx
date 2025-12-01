import { Zap, Route, Clock, Fuel, DollarSign, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface OptimizationResultsProps {
    totalDistance: string
    estimatedTime: string
    fuelCost: string
    savings: string
    onViewMap?: () => void
}

export function OptimizationResults({
                                        totalDistance,
                                        estimatedTime,
                                        fuelCost,
                                        savings,
                                        onViewMap,
                                    }: OptimizationResultsProps) {
    return (
        <Card className="overflow-hidden animate-fade-up">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-success/20 via-success/10 to-transparent p-4 border-b border-border">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-success/10 blur-2xl" />
                <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success shadow-sm">
                        <Zap className="h-5 w-5 text-success-foreground" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Ruta Optimizada</h3>
                        <p className="text-xs text-muted-foreground">CVRPTW + A* Algorithm</p>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    {/* Distance */}
                    <div className="group rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Route className="h-4 w-4 transition-colors group-hover:text-primary" />
                            <span className="text-xs">Distancia</span>
                        </div>
                        <span className="text-lg font-bold text-foreground">
              {totalDistance}
            </span>
                    </div>

                    {/* Time */}
                    <div className="group rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Clock className="h-4 w-4 transition-colors group-hover:text-primary" />
                            <span className="text-xs">Tiempo</span>
                        </div>
                        <span className="text-lg font-bold text-foreground">
              {estimatedTime}
            </span>
                    </div>

                    {/* Fuel */}
                    <div className="group rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Fuel className="h-4 w-4 transition-colors group-hover:text-warning" />
                            <span className="text-xs">Combustible</span>
                        </div>
                        <span className="text-lg font-bold text-foreground">
              {fuelCost}
            </span>
                    </div>

                    {/* Savings */}
                    <div className="group rounded-lg bg-success/10 p-3 transition-colors hover:bg-success/15">
                        <div className="flex items-center gap-2 text-success mb-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="text-xs">Ahorro</span>
                        </div>
                        <span className="text-lg font-bold text-success">
              {savings}
            </span>
                    </div>
                </div>

                {/* Action Button */}
                <Button
                    className="w-full gap-2"
                    variant="outline"
                    onClick={onViewMap}
                >
                    Ver en Mapa
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    )
}