// src/pages/Dashboard.tsx
import { KPICard } from "@/components/dashboard/KPICard"
import { RouteChart } from "@/components/dashboard/RouteChart"
import { VehicleStatus } from "@/components/dashboard/VehicleStatus"
import { LiveMap } from "@/components/dashboard/LiveMap"
import { RecentOrders } from "@/components/dashboard/RecentOrders"
import { OptimizationPanel } from "@/components/dashboard/OptimizationPanel"
import { Package, Truck, Route, DollarSign, Clock } from "lucide-react"

const kpis = [
    {
        title: "Entregas Hoy",
        value: "156",
        change: "+12% vs ayer",
        changeType: "positive" as const,
        icon: Package,
        iconColor: "text-primary",
    },
    {
        title: "Vehículos Activos",
        value: "12/15",
        change: "3 en mantenimiento",
        changeType: "neutral" as const,
        icon: Truck,
        iconColor: "text-success",
    },
    {
        title: "Km Optimizados",
        value: "1,234",
        change: "-18% distancia",
        changeType: "positive" as const,
        icon: Route,
        iconColor: "text-route-tertiary",
    },
    {
        title: "Ahorro del Día",
        value: "$2,450",
        change: "+22% eficiencia",
        changeType: "positive" as const,
        icon: DollarSign,
        iconColor: "text-warning",
    },
]

export function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                        Monitoreo en tiempo real · Última actualización: hace 30 seg
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
            {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })}
          </span>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, index) => (
                    <div key={kpi.title} className={`animate-fade-up-delay-${index}`}>
                        <KPICard {...kpi} />
                    </div>
                ))}
            </div>

            {/* Optimization Panel */}
            <div className="animate-fade-up-delay-1">
                <OptimizationPanel />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                    <div className="animate-fade-up-delay-2">
                        <LiveMap />
                    </div>
                    <div className="animate-fade-up-delay-3">
                        <RouteChart />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
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