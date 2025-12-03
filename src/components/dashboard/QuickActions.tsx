// // src/components/dashboard/QuickActions.tsx
// import { Plus, Zap, Map, FileText, ArrowRight } from "lucide-react"
// import { cn } from "@/lib/utils"
// import * as React from "react";
//
// interface QuickAction {
//     id: string
//     title: string
//     description: string
//     icon: React.ElementType
//     color: string
//     bgColor: string
//     action: () => void
// }
//
// const quickActions: QuickAction[] = [
//     {
//         id: "new-order",
//         title: "Nueva Orden",
//         description: "Crear orden de entrega",
//         icon: Plus,
//         color: "text-primary",
//         bgColor: "bg-primary/10 group-hover:bg-primary/20",
//         action: () => console.log("Nueva Orden")
//     },
//     {
//         id: "optimize-routes",
//         title: "Optimizar Rutas",
//         description: "Rutas pendientes",
//         icon: Zap,
//         color: "text-warning",
//         bgColor: "bg-warning/10 group-hover:bg-warning/20",
//         action: () => console.log("Optimizar")
//     },
//     {
//         id: "live-map",
//         title: "Mapa en Vivo",
//         description: "Ver ubicaciones",
//         icon: Map,
//         color: "text-success",
//         bgColor: "bg-success/10 group-hover:bg-success/20",
//         action: () => console.log("Mapa")
//     },
//     {
//         id: "daily-report",
//         title: "Reporte Diario",
//         description: "Generar reporte",
//         icon: FileText,
//         color: "text-route-tertiary",
//         bgColor: "bg-purple-500/10 group-hover:bg-purple-500/20",
//         action: () => console.log("Reporte")
//     }
// ]
//
// export function QuickActions() {
//     return (
//         <div className="glass-card rounded-2xl overflow-hidden">
//             <div className="border-b border-border/40 p-4 sm:p-6 bg-muted/20">
//                 <h3 className="text-base sm:text-lg font-semibold text-foreground">Acciones Rápidas</h3>
//                 <p className="text-xs sm:text-sm text-muted-foreground/80">Accesos directos a funciones principales</p>
//             </div>
//
//             <div className="p-4 sm:p-6">
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//                     {quickActions.map((action, index) => {
//                         const Icon = action.icon
//                         return (
//                             <button
//                                 key={action.id}
//                                 onClick={action.action}
//                                 className={cn(
//                                     "group relative overflow-hidden rounded-xl glass p-4 sm:p-5",
//                                     "transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5",
//                                     "text-left touch-target"
//                                 )}
//                                 style={{
//                                     animation: `fade-up 0.3s ease-out ${index * 0.1}s forwards`,
//                                     opacity: 0
//                                 }}
//                             >
//                                 {/* Background gradient on hover */}
//                                 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//
//                                 <div className="relative space-y-3 sm:space-y-4">
//                                     {/* Icon */}
//                                     <div className={cn(
//                                         "flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl transition-all duration-300",
//                                         "group-hover:scale-110 group-hover:rotate-3",
//                                         action.bgColor
//                                     )}>
//                                         <Icon className={cn("h-5 w-5 sm:h-7 sm:w-7", action.color)} />
//                                     </div>
//
//                                     {/* Content */}
//                                     <div className="space-y-1">
//                                         <h4 className="text-sm sm:text-base font-semibold text-foreground line-clamp-1">
//                                             {action.title}
//                                         </h4>
//                                         <p className="text-xs text-muted-foreground/80 line-clamp-1">
//                                             {action.description}
//                                         </p>
//                                     </div>
//
//                                     {/* Arrow icon on hover */}
//                                     <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
//                                         <ArrowRight className={cn("h-4 w-4 sm:h-5 sm:w-5", action.color)} />
//                                     </div>
//                                 </div>
//                             </button>
//                         )
//                     })}
//                 </div>
//             </div>
//         </div>
//     )
// }

// src/components/dashboard/QuickActions.tsx
import { Plus, Zap, Map, FileText, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import * as React from "react";

interface QuickAction {
    id: string
    title: string
    description: string
    icon: React.ElementType
    color: string
    bgColor: string
    action: () => void
}

const quickActions: QuickAction[] = [
    {
        id: "new-order",
        title: "Nueva Orden",
        description: "Crear orden de entrega",
        icon: Plus,
        color: "text-primary",
        bgColor: "bg-primary/10 group-hover:bg-primary/20",
        action: () => console.log("Nueva Orden")
    },
    {
        id: "optimize-routes",
        title: "Optimizar Rutas",
        description: "Rutas pendientes",
        icon: Zap,
        color: "text-warning",
        bgColor: "bg-warning/10 group-hover:bg-warning/20",
        action: () => console.log("Optimizar")
    },
    {
        id: "live-map",
        title: "Mapa en Vivo",
        description: "Ver ubicaciones",
        icon: Map,
        color: "text-success",
        bgColor: "bg-success/10 group-hover:bg-success/20",
        action: () => console.log("Mapa")
    },
    {
        id: "daily-report",
        title: "Reporte Diario",
        description: "Generar reporte",
        icon: FileText,
        color: "text-route-tertiary",
        bgColor: "bg-purple-500/10 group-hover:bg-purple-500/20",
        action: () => console.log("Reporte")
    }
]

export function QuickActions() {
    return (
        <div className="glass-card rounded-2xl overflow-hidden border border-border/50">
            <div className="relative border-b border-border/40 p-5 sm:p-6 bg-gradient-to-br from-muted/20 via-background/5 to-transparent backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent opacity-50" />
                <div className="relative">
                    <h3 className="text-base sm:text-lg font-bold text-foreground">Acciones Rápidas</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground/70 mt-0.5">Accesos directos a funciones principales</p>
                </div>
            </div>

            <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon
                        return (
                            <button
                                key={action.id}
                                onClick={action.action}
                                className={cn(
                                    "group relative overflow-hidden rounded-xl glass p-4 sm:p-5",
                                    "transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1",
                                    "text-left touch-target",
                                    "border border-border/30 hover:border-border/60",
                                    "hover:shadow-lg hover:shadow-primary/5",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                                )}
                                style={{
                                    animation: `fade-up 0.3s ease-out ${index * 0.1}s forwards`,
                                    opacity: 0
                                }}
                                aria-label={`${action.title}: ${action.description}`}
                            >
                                {/* Efectos de fondo mejorados */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className={cn(
                                    "absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-20",
                                    action.bgColor.replace('bg-', 'bg-gradient-to-br from-')
                                )} />

                                <div className="relative space-y-3 sm:space-y-4">
                                    {/* Icon con mejor contenedor */}
                                    <div className={cn(
                                        "relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl transition-all duration-500",
                                        "group-hover:scale-110 group-hover:rotate-6",
                                        "border border-border/20",
                                        action.bgColor
                                    )}>
                                        {/* Glow effect */}
                                        <div className={cn(
                                            "absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500",
                                            action.bgColor
                                        )} />
                                        <Icon className={cn("relative h-5 w-5 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:scale-110", action.color)} />
                                    </div>

                                    {/* Content mejorado */}
                                    <div className="space-y-1 pr-6">
                                        <h4 className="text-sm sm:text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
                                            {action.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground/70 line-clamp-1">
                                            {action.description}
                                        </p>
                                    </div>

                                    {/* Arrow con mejor posicionamiento y animación */}
                                    <div className="absolute bottom-4 right-4 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                                        <div className={cn(
                                            "flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300",
                                            action.bgColor
                                        )}>
                                            <ArrowRight className={cn("h-4 w-4", action.color)} />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}