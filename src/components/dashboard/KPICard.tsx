// src/components/dashboard/KPICard.tsx
import type {LucideIcon} from "lucide-react"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from 'lucide-react'
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
                "group relative overflow-hidden rounded-3xl glass-card p-6 sm:p-7",
                "transition-all duration-500 ease-out cursor-pointer touch-target",
                "border border-white/30 dark:border-white/10",
                "hover:shadow-2xl hover:shadow-primary/10",
                "hover-lift",
                className
            )}
        >
            {/* Gradient Mesh Background Premium */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 rounded-full blur-3xl" />
            </div>

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>

            {/* Inner glow border */}
            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none" />

            <div className="relative space-y-5">
                {/* Header con mejor jerarquía visual */}
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2.5 flex-1 min-w-0">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider truncate leading-none flex items-center gap-2">
                            <TrendingUp className="h-3 w-3 opacity-70" />
                            {title}
                        </p>
                        <p className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tighter text-foreground transition-all duration-500 group-hover:scale-[1.03] origin-left leading-none text-shadow-soft">
                            {value}
                        </p>
                    </div>

                    {/* Icon container premium */}
                    <div className={cn(
                        "relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shrink-0",
                        "glass-input",
                        "group-hover:scale-110 group-hover:rotate-3 transition-all duration-700",
                        "shadow-lg group-hover:shadow-xl",
                        iconColor
                    )}>
                        {/* Icon glow effect premium */}
                        <div className={cn(
                            "absolute inset-0 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700",
                            iconColor
                        )} />
                        <Icon className="relative h-6 w-6 sm:h-7 sm:w-7 drop-shadow-lg" />
                    </div>
                </div>

                {/* Sparkline mejorado con gradiente premium */}
                <div className="relative h-16 sm:h-20 -mx-2 opacity-80 group-hover:opacity-100 transition-all duration-500">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/8 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={sparklineColor}
                                strokeWidth={3}
                                dot={false}
                                animationDuration={1500}
                                animationEasing="ease-in-out"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Change indicator premium con glassmorphism */}
                {change && (
                    <div className="flex items-center">
                        <div className={cn(
                            "flex items-center gap-2 text-sm font-bold rounded-2xl px-4 py-2",
                            "transition-all duration-500",
                            "glass-input shadow-sm",
                            changeType === "positive" && "text-success hover:bg-success/15",
                            changeType === "negative" && "text-destructive hover:bg-destructive/15",
                            changeType === "neutral" && "text-muted-foreground hover:bg-muted/50"
                        )}>
                            <TrendIcon className="h-4 w-4 shrink-0" />
                            <span className="truncate font-semibold">{change}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}