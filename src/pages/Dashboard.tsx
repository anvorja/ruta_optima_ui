// src/pages/Dashboard.tsx
import { KPICard } from "@/components/dashboard/KPICard"
import { RouteChart } from "@/components/dashboard/RouteChart"
import { VehicleStatus } from "@/components/dashboard/VehicleStatus"
import { LiveMap } from "@/components/dashboard/LiveMap"
import { RecentOrders } from "@/components/dashboard/RecentOrders"
import { OptimizationPanel } from "@/components/dashboard/OptimizationPanel"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { AlertsWidget } from "@/components/dashboard/AlertsWidget"
import { Package, Truck, Route, DollarSign, Clock, Zap } from "lucide-react"

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
        <div className="space-y-6 sm:space-y-7 lg:space-y-8">
            {/* Page Header Premium con Gradient Mesh Background */}
            <div className="relative">
                {/* Gradient Mesh Background */}
                <div className="absolute inset-0 gradient-mesh opacity-60 rounded-3xl pointer-events-none" />

                {/* Header Content */}
                <div className="relative glass-strong rounded-3xl p-6 sm:p-7 lg:p-8 border border-white/40 dark:border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5">
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-gradient-primary-glow">
                                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
                                    Dashboard
                                </h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success shadow-lg shadow-success/50"></span>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground font-medium">
                                    Monitoreo en tiempo real · Última actualización: <span className="text-foreground font-semibold">hace 30 seg</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 glass-input px-5 py-3 rounded-2xl">
                            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                            <span className="text-sm sm:text-base text-foreground font-semibold capitalize">
                                {new Date().toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI Cards con animaciones escalonadas y glassmorphism */}
            <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, index) => (
                    <div
                        key={kpi.title}
                        className={`animate-fade-up-delay-${index}`}
                    >
                        <KPICard {...kpi} />
                    </div>
                ))}
            </div>

            {/* Quick Actions con glassmorphism */}
            <div className="animate-fade-up-delay-1">
                <QuickActions />
            </div>

            {/* Optimization Panel */}
            <div className="animate-fade-up-delay-1">
                <OptimizationPanel />
            </div>

            {/* Main Content Grid con mejor espaciado */}
            <div className="grid gap-6 sm:gap-7 lg:gap-8 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6 sm:space-y-7 lg:space-y-8">
                    <div className="animate-fade-up-delay-2">
                        <LiveMap />
                    </div>
                    <div className="animate-fade-up-delay-3">
                        <RouteChart />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 sm:space-y-7 lg:space-y-8">
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