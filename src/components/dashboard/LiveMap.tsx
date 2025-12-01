// src/components/dashboard/LiveMap.tsx
import { useState } from "react"
import { MapPin, Navigation, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock route points for visualization
const routes = [
    {
        id: 1,
        color: "hsl(199, 89%, 48%)",
        vehicle: "V-001",
        points: [
            { x: 20, y: 30 },
            { x: 35, y: 45 },
            { x: 50, y: 35 },
            { x: 70, y: 50 },
        ],
    },
    {
        id: 2,
        color: "hsl(142, 76%, 36%)",
        vehicle: "V-002",
        points: [
            { x: 25, y: 60 },
            { x: 45, y: 70 },
            { x: 60, y: 55 },
            { x: 80, y: 65 },
        ],
    },
    {
        id: 3,
        color: "hsl(280, 65%, 60%)",
        vehicle: "V-004",
        points: [
            { x: 15, y: 75 },
            { x: 30, y: 85 },
            { x: 55, y: 80 },
            { x: 75, y: 90 },
        ],
    },
]

const deliveryPoints = [
    { x: 35, y: 45, status: "completed" },
    { x: 50, y: 35, status: "current" },
    { x: 70, y: 50, status: "pending" },
    { x: 45, y: 70, status: "completed" },
    { x: 60, y: 55, status: "current" },
    { x: 30, y: 85, status: "pending" },
    { x: 55, y: 80, status: "pending" },
]

export function LiveMap() {
    const [hoveredRoute, setHoveredRoute] = useState<number | null>(null)

    return (
        <div className="relative rounded-xl border border-border bg-card overflow-hidden">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                <Badge variant="secondary" className="gap-1 bg-background/80 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    En vivo
                </Badge>
            </div>

            <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                    <Maximize2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Map visualization */}
            <div className="relative h-[400px] bg-gradient-to-br from-muted/50 to-muted">
                {/* Grid background */}
                <svg className="absolute inset-0 h-full w-full opacity-20">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Routes */}
                <svg className="absolute inset-0 h-full w-full">
                    {routes.map((route) => {
                        const pathD = route.points
                            .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x}% ${p.y}%`)
                            .join(" ")

                        return (
                            <g key={route.id}>
                                {/* Route shadow/glow */}
                                <path
                                    d={pathD}
                                    fill="none"
                                    stroke={route.color}
                                    strokeWidth={hoveredRoute === route.id ? "6" : "4"}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    opacity={0.3}
                                    className="transition-all duration-300"
                                />
                                {/* Route line */}
                                <path
                                    d={pathD}
                                    fill="none"
                                    stroke={route.color}
                                    strokeWidth={hoveredRoute === route.id ? "3" : "2"}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="8 4"
                                    className="transition-all duration-300"
                                    onMouseEnter={() => setHoveredRoute(route.id)}
                                    onMouseLeave={() => setHoveredRoute(null)}
                                    style={{ cursor: "pointer" }}
                                />
                            </g>
                        )
                    })}
                </svg>

                {/* Delivery points */}
                {deliveryPoints.map((point, index) => (
                    <div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125"
                        style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    >
                        <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                                point.status === "completed"
                                    ? "bg-success"
                                    : point.status === "current"
                                        ? "bg-primary animate-pulse"
                                        : "bg-muted-foreground"
                            }`}
                        >
                            <MapPin className="h-3 w-3 text-background" />
                        </div>
                    </div>
                ))}

                {/* Vehicle positions */}
                {routes.map((route) => {
                    const lastPoint = route.points[route.points.length - 2]
                    return (
                        <div
                            key={`vehicle-${route.id}`}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                            style={{ left: `${lastPoint.x}%`, top: `${lastPoint.y}%` }}
                        >
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background shadow-lg"
                                style={{ borderColor: route.color }}
                            >
                                <Navigation className="h-4 w-4" style={{ color: route.color }} />
                            </div>
                            <div
                                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-background px-1.5 py-0.5 text-[10px] font-medium shadow"
                                style={{ color: route.color }}
                            >
                                {route.vehicle}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
                <div className="flex items-center gap-4 text-xs">
                    {routes.map((route) => (
                        <div
                            key={route.id}
                            className="flex items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-80"
                            onMouseEnter={() => setHoveredRoute(route.id)}
                            onMouseLeave={() => setHoveredRoute(null)}
                        >
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: route.color }} />
                            <span className="text-muted-foreground">{route.vehicle}</span>
                        </div>
                    ))}
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                    Ver mapa completo
                </Button>
            </div>
        </div>
    )
}