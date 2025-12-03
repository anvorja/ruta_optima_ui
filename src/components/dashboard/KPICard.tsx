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

// Mapeo estÃƒÂ¡tico de iconos de tendencia fuera del componente
const TREND_ICONS: Record<KPICardProps['changeType'] & string, LucideIcon> = {
    positive: ArrowUpRight,
    negative: ArrowDownRight,
    neutral: Minus,
}

// Mapeo estÃƒÂ¡tico de colores de sparkline fuera del componente
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
                "border border-border/50",
                "hover:shadow-lg hover:shadow-primary/5",
                className
            )}
        >
            {/* Efectos de fondo mejorados */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-br from-primary/[0.06] to-transparent blur-3xl transition-all duration-700 group-hover:scale-125" />

            {/* Borde interior sutil */}
            <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-background/40 via-transparent to-transparent pointer-events-none" />

            <div className="relative space-y-3.5 sm:space-y-4">
                {/* Header con mejor jerarquía visual */}
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1 min-w-0">
                        <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest truncate leading-none">
                            {title}
                        </p>
                        <p className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-foreground transition-all duration-300 group-hover:scale-[1.02] origin-left leading-none">
                            {value}
                        </p>
                    </div>
                    <div className={cn(
                        "relative rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shrink-0",
                        "backdrop-blur-md bg-gradient-to-br from-background/60 to-background/40",
                        "group-hover:scale-110 group-hover:rotate-6 transition-all duration-500",
                        "border border-border/50",
                        "shadow-sm group-hover:shadow-md",
                        iconColor
                    )}>
                        {/* Glow effect en el icono */}
                        <div className={cn(
                            "absolute inset-0 rounded-xl sm:rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500",
                            iconColor
                        )} />
                        <Icon className="relative h-5 w-5 sm:h-6 sm:w-6 drop-shadow-sm" />
                    </div>
                </div>

                {/* Sparkline mejorado con gradiente */}
                <div className="relative h-14 sm:h-16 -mx-1 opacity-75 group-hover:opacity-100 transition-all duration-300">
                    {/* Gradiente de fondo sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

                {/* Change indicator más prominente */}
                {change && (
                    <div className="flex items-center">
                        <div className={cn(
                            "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold rounded-full px-3 py-1.5",
                            "transition-all duration-300 backdrop-blur-sm",
                            "border",
                            changeType === "positive" && "text-success bg-success/10 border-success/20 group-hover:bg-success/15",
                            changeType === "negative" && "text-destructive bg-destructive/10 border-destructive/20 group-hover:bg-destructive/15",
                            changeType === "neutral" && "text-muted-foreground bg-muted/30 border-border/50 group-hover:bg-muted/40"
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