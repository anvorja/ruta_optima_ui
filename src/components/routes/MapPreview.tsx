import { Navigation, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"

interface MapPreviewProps {
    hasRoute?: boolean
}

export function MapPreview({ hasRoute = false }: MapPreviewProps) {
    return (
        <Card className="p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Vista Previa</h3>

            <div className="relative h-48 rounded-lg bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
                {/* Grid Pattern */}
                <svg className="absolute inset-0 h-full w-full opacity-20">
                    <defs>
                        <pattern id="grid-preview" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-preview)" />
                </svg>

                {hasRoute ? (
                    <>
                        {/* Simple route visualization */}
                        <svg className="absolute inset-0 h-full w-full">
                            <path
                                d="M 20% 30% Q 40% 50%, 60% 40% T 80% 70%"
                                fill="none"
                                stroke="hsl(199, 89%, 48%)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="8 4"
                                className="animate-pulse-slow"
                            />
                        </svg>

                        {/* Markers */}
                        <div className="absolute" style={{ left: "20%", top: "30%" }}>
                            <MapPin className="h-4 w-4 text-success" />
                        </div>
                        <div className="absolute" style={{ left: "60%", top: "40%" }}>
                            <MapPin className="h-4 w-4 text-primary animate-pulse" />
                        </div>
                        <div className="absolute" style={{ left: "80%", top: "70%" }}>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </div>

                        {/* Vehicle */}
                        <div
                            className="absolute transition-all duration-1000"
                            style={{ left: "40%", top: "45%" }}
                        >
                            <Navigation className="h-5 w-5 text-primary" />
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <Navigation className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">
                                Optimiza para ver la ruta
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {hasRoute && (
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-success" />
            Inicio
          </span>
                    <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            En progreso
          </span>
                    <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
            Pendiente
          </span>
                </div>
            )}
        </Card>
    )
}