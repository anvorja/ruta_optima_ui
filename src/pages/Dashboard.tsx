// src/pages/Dashboard.tsx
import { KPICard } from "@/components/dashboard/KPICard"
import { RouteChart } from "@/components/dashboard/RouteChart"
import { VehicleStatus } from "@/components/dashboard/VehicleStatus"
import { LiveMap } from "@/components/dashboard/LiveMap"
import { RecentOrders } from "@/components/dashboard/RecentOrders"
import { OptimizationPanel } from "@/components/dashboard/OptimizationPanel"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { AlertsWidget } from "@/components/dashboard/AlertsWidget"
import { Package, Truck, Route, DollarSign, Clock } from "lucide-react"

const kpis = [
    {
        title: "Entregas Hoy",
        value: "156",
        change: "+12% vs ayer",
        changeType: "positive" as const,
        icon: Package,
        iconColor: "text-primary",
        sparklineData: [120, 130, 125, 140, 145, 150, 156]
    },
    {
        title: "Vehículos Activos",
        value: "12/15",
        change: "3 en mantenimiento",
        changeType: "neutral" as const,
        icon: Truck,
        iconColor: "text-success",
        sparklineData: [15, 14, 15, 13, 12, 12, 12]
    },
    {
        title: "Km Optimizados",
        value: "1,234",
        change: "-18% distancia",
        changeType: "positive" as const,
        icon: Route,
        iconColor: "text-route-tertiary",
        sparklineData: [1500, 1450, 1400, 1350, 1300, 1250, 1234]
    },
    {
        title: "Ahorro del Día",
        value: "$2,450",
        change: "+22% eficiencia",
        changeType: "positive" as const,
        icon: DollarSign,
        iconColor: "text-warning",
        sparklineData: [1800, 2000, 2100, 2200, 2300, 2400, 2450]
    },
]

export function Dashboard() {
    return (
        <div className="space-y-5 sm:space-y-6 lg:space-y-7">
            {/* Page Header mejorado */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-7 border border-border/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                            Dashboard
                        </h1>
                        <div className="flex items-center gap-2.5">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground/80 font-medium">
                                Monitoreo en tiempo real · Última actualización: hace 30 seg
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm bg-muted/30 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-border/30">
                        <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        <span className="text-muted-foreground font-medium">
            {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })}
          </span>
                    </div>
                </div>
            </div>

            {/* KPI Cards con animaciones escalonadas */}
            <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, index) => (
                    <div key={kpi.title}
                         className={`animate-fade-up-delay-${index}`}>
                        <KPICard {...kpi} />
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="animate-fade-up-delay-1">
                <QuickActions />
            </div>

            {/* Optimization Panel */}
            <div className="animate-fade-up-delay-1">
                <OptimizationPanel />
            </div>

            {/* Main Content Grid con mejor espaciado */}
            <div className="grid gap-5 sm:gap-6 lg:gap-7 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-5 sm:space-y-6 lg:space-y-7">
                    <div className="animate-fade-up-delay-2">
                        <LiveMap />
                    </div>
                    <div className="animate-fade-up-delay-3">
                        <RouteChart />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5 sm:space-y-6 lg:space-y-7">
                    <div className="animate-fade-up-delay-2">
                        <AlertsWidget />
                    </div>
                    <div className="animate-fade-up-delay-2">
                        <VehicleStatus />
                    </div>
                    <div className="animate-fade-up-delay-3">
                        <RecentOrders />
                    </div>
                </div>
            </div>
        </div>
    )
}