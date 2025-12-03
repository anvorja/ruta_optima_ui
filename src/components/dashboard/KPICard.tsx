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

// Mapeo estÃ¡tico de iconos de tendencia fuera del componente
const TREND_ICONS: Record<KPICardProps['changeType'] & string, LucideIcon> = {
    positive: ArrowUpRight,
    negative: ArrowDownRight,
    neutral: Minus,
}

// Mapeo estÃ¡tico de colores de sparkline fuera del componente
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
                "group relative overflow-hidden rounded-2xl glass-card p-5 sm:p-6",
                "transition-all duration-300 ease-out cursor-pointer",
                className
            )}
        >
            {/* Gradientes sutiles de fondo */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/[0.04] blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/[0.06]" />

            <div className="relative space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1 min-w-0">
                        <p className="text-[11px] sm:text-xs font-medium text-muted-foreground/80 uppercase tracking-wider truncate">
                            {title}
                        </p>
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground transition-transform duration-300 group-hover:scale-105">
                            {value}
                        </p>
                    </div>
                    <div className={cn(
                        "rounded-xl p-2.5 sm:p-3 shrink-0",
                        "backdrop-blur-sm bg-muted/50",
                        "group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
                        "shadow-sm",
                        iconColor
                    )}>
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                </div>

                {/* Sparkline con mejor altura */}
                <div className="h-12 sm:h-14 -mx-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={sparklineColor}
                                strokeWidth={2.5}
                                dot={false}
                                animationDuration={1200}
                                animationEasing="ease-in-out"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Change indicator mejorado */}
                {change && (
                    <div className="flex items-center pt-0.5">
                        <div className={cn(
                            "flex items-center gap-1.5 text-xs sm:text-sm font-semibold rounded-full px-2.5 py-1",
                            "transition-all duration-300",
                            changeType === "positive" && "text-success bg-success/10",
                            changeType === "negative" && "text-destructive bg-destructive/10",
                            changeType === "neutral" && "text-muted-foreground bg-muted/40"
                        )}>
                            <TrendIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                            <span className="truncate">{change}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}