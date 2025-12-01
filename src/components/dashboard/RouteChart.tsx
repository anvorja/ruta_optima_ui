// src/components/dashboard/RouteChart.tsx
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

const data = [
    { hour: "06:00", entregas: 12, optimizadas: 10 },
    { hour: "08:00", entregas: 45, optimizadas: 42 },
    { hour: "10:00", entregas: 78, optimizadas: 75 },
    { hour: "12:00", entregas: 95, optimizadas: 90 },
    { hour: "14:00", entregas: 110, optimizadas: 105 },
    { hour: "16:00", entregas: 135, optimizadas: 130 },
    { hour: "18:00", entregas: 156, optimizadas: 150 },
    { hour: "20:00", entregas: 142, optimizadas: 138 },
]

export function RouteChart() {
    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Entregas del Día</h3>
                    <p className="text-sm text-muted-foreground">Comparación real vs optimizado</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span className="text-muted-foreground">Entregas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-success" />
                        <span className="text-muted-foreground">Optimizadas</span>
                    </div>
                </div>
            </div>

            <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorEntregas" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorOptimizadas" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
                        <XAxis
                            dataKey="hour"
                            stroke="hsl(215, 20%, 55%)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="hsl(215, 20%, 55%)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(222, 47%, 8%)",
                                border: "1px solid hsl(217, 33%, 17%)",
                                borderRadius: "8px",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="entregas"
                            stroke="hsl(199, 89%, 48%)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorEntregas)"
                        />
                        <Area
                            type="monotone"
                            dataKey="optimizadas"
                            stroke="hsl(142, 76%, 36%)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorOptimizadas)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}