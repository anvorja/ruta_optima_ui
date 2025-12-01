// src/components/dashboard/KPICard.tsx
import type {LucideIcon} from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
    title: string
    value: string
    change?: string
    changeType?: "positive" | "negative" | "neutral"
    icon: LucideIcon
    iconColor?: string
    className?: string
}

export function KPICard({
                            title,
                            value,
                            change,
                            changeType = "neutral",
                            icon: Icon,
                            iconColor = "text-primary",
                            className,
                        }: KPICardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg",
                className
            )}
        >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />

            <div className="relative flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
                    {change && (
                        <p
                            className={cn(
                                "text-xs font-medium",
                                changeType === "positive" && "text-success",
                                changeType === "negative" && "text-destructive",
                                changeType === "neutral" && "text-muted-foreground"
                            )}
                        >
                            {change}
                        </p>
                    )}
                </div>
                <div className={cn("rounded-lg bg-muted p-2.5", iconColor)}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    )
}