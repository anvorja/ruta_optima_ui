// // src/components/dashboard/KPICard.tsx
// import type {LucideIcon} from "lucide-react"
// import { cn } from "@/lib/utils"
//
// interface KPICardProps {
//     title: string
//     value: string
//     change?: string
//     changeType?: "positive" | "negative" | "neutral"
//     icon: LucideIcon
//     iconColor?: string
//     className?: string
// }
//
// export function KPICard({
//                             title,
//                             value,
//                             change,
//                             changeType = "neutral",
//                             icon: Icon,
//                             iconColor = "text-primary",
//                             className,
//                         }: KPICardProps) {
//     return (
//         <div
//             className={cn(
//                 "group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg",
//                 className
//             )}
//         >
//             <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
//
//             <div className="relative flex items-start justify-between">
//                 <div className="space-y-2">
//                     <p className="text-sm text-muted-foreground">{title}</p>
//                     <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
//                     {change && (
//                         <p
//                             className={cn(
//                                 "text-xs font-medium",
//                                 changeType === "positive" && "text-success",
//                                 changeType === "negative" && "text-destructive",
//                                 changeType === "neutral" && "text-muted-foreground"
//                             )}
//                         >
//                             {change}
//                         </p>
//                     )}
//                 </div>
//                 <div className={cn("rounded-lg bg-muted p-2.5", iconColor)}>
//                     <Icon className="h-5 w-5" />
//                 </div>
//             </div>
//         </div>
//     )
// }

// // src/components/dashboard/KPICard.tsx
// import type {LucideIcon} from "lucide-react"
// import { cn } from "@/lib/utils"
// import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
// import { LineChart, Line, ResponsiveContainer } from 'recharts'
//
// interface KPICardProps {
//     title: string
//     value: string
//     change?: string
//     changeType?: "positive" | "negative" | "neutral"
//     icon: LucideIcon
//     iconColor?: string
//     className?: string
//     sparklineData?: number[]
// }
//
// export function KPICard({
//                             title,
//                             value,
//                             change,
//                             changeType = "neutral",
//                             icon: Icon,
//                             iconColor = "text-primary",
//                             className,
//                             sparklineData = [20, 35, 28, 42, 38, 50, 45]
//                         }: KPICardProps) {
//
//     const getTrendIcon = () => {
//         if (changeType === 'positive') return ArrowUpRight
//         if (changeType === 'negative') return ArrowDownRight
//         return Minus
//     }
//
//     const getSparklineColor = () => {
//         if (changeType === 'positive') return 'hsl(var(--success))'
//         if (changeType === 'negative') return 'hsl(var(--destructive))'
//         return 'hsl(var(--primary))'
//     }
//
//     const TrendIcon = getTrendIcon()
//     const chartData = sparklineData.map((value, index) => ({ value, index }))
//
//     return (
//         <div
//             className={cn(
//                 "group relative overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1",
//                 className
//             )}
//         >
//             {/* Gradient background on hover */}
//             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
//
//             <div className="relative space-y-3">
//                 {/* Header */}
//                 <div className="flex items-start justify-between">
//                     <div className="space-y-1 flex-1 min-w-0">
//                         <p className="text-xs sm:text-sm text-muted-foreground truncate">{title}</p>
//                         <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{value}</p>
//                     </div>
//                     <div className={cn(
//                         "rounded-lg bg-muted p-2 sm:p-2.5 shrink-0 ml-2",
//                         "group-hover:scale-110 transition-transform duration-300",
//                         iconColor
//                     )}>
//                         <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
//                     </div>
//                 </div>
//
//                 {/* Sparkline */}
//                 <div className="h-10 sm:h-12 -mx-1">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <LineChart data={chartData}>
//                             <Line
//                                 type="monotone"
//                                 dataKey="value"
//                                 stroke={getSparklineColor()}
//                                 strokeWidth={2}
//                                 dot={false}
//                                 animationDuration={1000}
//                             />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>
//
//                 {/* Change indicator */}
//                 {change && (
//                     <div className="flex items-center justify-between pt-1">
//                         <div className={cn(
//                             "flex items-center text-xs sm:text-sm font-medium",
//                             changeType === "positive" && "text-success",
//                             changeType === "negative" && "text-destructive",
//                             changeType === "neutral" && "text-muted-foreground"
//                         )}>
//                             <TrendIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 shrink-0" />
//                             <span className="truncate">{change}</span>
//                         </div>
//                         <span className="text-xs text-muted-foreground/70 ml-2 shrink-0">vs ayer</span>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// src/components/dashboard/KPICard.tsx
import type {LucideIcon} from "lucide-react"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface KPICardProps {
    title: string
    value: string
    change?: string
    changeType?: "positive" | "negative" | "neutral"
    icon: LucideIcon
    iconColor?: string
    className?: string
    sparklineData?: number[]
}

// Mapeo estático de iconos de tendencia fuera del componente
const TREND_ICONS: Record<KPICardProps['changeType'] & string, LucideIcon> = {
    positive: ArrowUpRight,
    negative: ArrowDownRight,
    neutral: Minus,
}

// Mapeo estático de colores de sparkline fuera del componente
const SPARKLINE_COLORS: Record<KPICardProps['changeType'] & string, string> = {
    positive: 'hsl(var(--success))',
    negative: 'hsl(var(--destructive))',
    neutral: 'hsl(var(--primary))',
}

export function KPICard({
                            title,
                            value,
                            change,
                            changeType = "neutral",
                            icon: Icon,
                            iconColor = "text-primary",
                            className,
                            sparklineData = [20, 35, 28, 42, 38, 50, 45]
                        }: KPICardProps) {

    const TrendIcon = TREND_ICONS[changeType]
    const sparklineColor = SPARKLINE_COLORS[changeType]
    const chartData = sparklineData.map((value, index) => ({ value, index }))

    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1",
                className
            )}
        >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />

            <div className="relative space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{title}</p>
                        <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{value}</p>
                    </div>
                    <div className={cn(
                        "rounded-lg bg-muted p-2 sm:p-2.5 shrink-0 ml-2",
                        "group-hover:scale-110 transition-transform duration-300",
                        iconColor
                    )}>
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                </div>

                {/* Sparkline */}
                <div className="h-10 sm:h-12 -mx-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={sparklineColor}
                                strokeWidth={2}
                                dot={false}
                                animationDuration={1000}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Change indicator */}
                {change && (
                    <div className="flex items-center pt-1">
                        <div className={cn(
                            "flex items-center text-xs sm:text-sm font-medium",
                            changeType === "positive" && "text-success",
                            changeType === "negative" && "text-destructive",
                            changeType === "neutral" && "text-muted-foreground"
                        )}>
                            <TrendIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 shrink-0" />
                            <span className="truncate">{change}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}