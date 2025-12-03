// // src/pages/Dashboard.tsx
// import { KPICard } from "@/components/dashboard/KPICard"
// import { RouteChart } from "@/components/dashboard/RouteChart"
// import { VehicleStatus } from "@/components/dashboard/VehicleStatus"
// import { LiveMap } from "@/components/dashboard/LiveMap"
// import { RecentOrders } from "@/components/dashboard/RecentOrders"
// import { OptimizationPanel } from "@/components/dashboard/OptimizationPanel"
// import { QuickActions } from "@/components/dashboard/QuickActions"
// import { AlertsWidget } from "@/components/dashboard/AlertsWidget"
// import { Package, Truck, Route, DollarSign, Clock } from "lucide-react"
//
// const kpis = [
//     {
//         title: "Entregas Hoy",
//         value: "156",
//         change: "+12% vs ayer",
//         changeType: "positive" as const,
//         icon: Package,
//         iconColor: "text-primary",
//         sparklineData: [120, 130, 125, 140, 145, 150, 156]
//     },
//     {
//         title: "Vehículos Activos",
//         value: "12/15",
//         change: "3 en mantenimiento",
//         changeType: "neutral" as const,
//         icon: Truck,
//         iconColor: "text-success",
//         sparklineData: [15, 14, 15, 13, 12, 12, 12]
//     },
//     {
//         title: "Km Optimizados",
//         value: "1,234",
//         change: "-18% distancia",
//         changeType: "positive" as const,
//         icon: Route,
//         iconColor: "text-route-tertiary",
//         sparklineData: [1500, 1450, 1400, 1350, 1300, 1250, 1234]
//     },
//     {
//         title: "Ahorro del Día",
//         value: "$2,450",
//         change: "+22% eficiencia",
//         changeType: "positive" as const,
//         icon: DollarSign,
//         iconColor: "text-warning",
//         sparklineData: [1800, 2000, 2100, 2200, 2300, 2400, 2450]
//     },
// ]
//
// export function Dashboard() {
//     return (
//         <div className="space-y-4 sm:space-y-6">
//             {/* Page Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                 <div>
//                     <h1 className="text-xl sm:text-2xl font-bold text-foreground">Dashboard</h1>
//                     <p className="text-xs sm:text-sm text-muted-foreground">
//                         Monitoreo en tiempo real · Última actualización: hace 30 seg
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs sm:text-sm">
//                     <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
//                     <span className="text-muted-foreground">
//             {new Date().toLocaleDateString("es-ES", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//             })}
//           </span>
//                 </div>
//             </div>
//
//             {/* KPI Cards */}
//             <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
//                 {kpis.map((kpi, index) => (
//                     <div key={kpi.title} className={`animate-fade-up-delay-${index}`}>
//                         <KPICard {...kpi} />
//                     </div>
//                 ))}
//             </div>
//
//             {/* Quick Actions */}
//             <div className="animate-fade-up-delay-1">
//                 <QuickActions />
//             </div>
//
//             {/* Optimization Panel */}
//             <div className="animate-fade-up-delay-1">
//                 <OptimizationPanel />
//             </div>
//
//             {/* Main Content Grid */}
//             <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
//                 {/* Left Column */}
//                 <div className="space-y-4 sm:space-y-6">
//                     <div className="animate-fade-up-delay-2">
//                         <LiveMap />
//                     </div>
//                     <div className="animate-fade-up-delay-3">
//                         <RouteChart />
//                     </div>
//                 </div>
//
//                 {/* Right Column */}
//                 <div className="space-y-4 sm:space-y-6">
//                     <div className="animate-fade-up-delay-2">
//                         <AlertsWidget />
//                     </div>
//                     <div className="animate-fade-up-delay-2">
//                         <VehicleStatus />
//                     </div>
//                     <div className="animate-fade-up-delay-3">
//                         <RecentOrders />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

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
        <div className="space-y-5 sm:space-y-7">
            {/* Page Header - Diseño glassmórfico mejorado */}
            <div className="glass-card rounded-2xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                            Dashboard
                        </h1>
                        <div className="flex items-center gap-2 mt-1.5">
                            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Monitoreo en tiempo real · Última actualización: hace 30 seg
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
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
            </div>

            {/* KPI Cards con mejor grid */}
            <div className="grid gap-4 sm:gap-5 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
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

            {/* Main Content Grid - Layout mejorado */}
            <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-5 sm:space-y-6">
                    <div className="animate-fade-up-delay-2">
                        <LiveMap />
                    </div>
                    <div className="animate-fade-up-delay-3">
                        <RouteChart />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5 sm:space-y-6">
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