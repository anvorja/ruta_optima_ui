import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"
import {
    TrendingUp,
    TrendingDown,
    Calendar,
    Download,
    DollarSign,
    Fuel,
    Clock,
    Route,
} from "lucide-react"

const weeklyData = [
    { day: "Lun", entregas: 145, optimizadas: 138, ahorro: 12 },
    { day: "Mar", entregas: 168, optimizadas: 162, ahorro: 15 },
    { day: "Mié", entregas: 156, optimizadas: 150, ahorro: 18 },
    { day: "Jue", entregas: 182, optimizadas: 175, ahorro: 14 },
    { day: "Vie", entregas: 195, optimizadas: 188, ahorro: 20 },
    { day: "Sáb", entregas: 120, optimizadas: 115, ahorro: 10 },
    { day: "Dom", entregas: 85, optimizadas: 82, ahorro: 8 },
]

const costData = [
    { month: "Ene", actual: 45000, optimizado: 38000 },
    { month: "Feb", actual: 48000, optimizado: 39500 },
    { month: "Mar", actual: 52000, optimizado: 42000 },
    { month: "Abr", actual: 49000, optimizado: 40000 },
    { month: "May", actual: 55000, optimizado: 43500 },
    { month: "Jun", actual: 58000, optimizado: 45000 },
]

const vehicleEfficiency = [
    { name: "Camiones", value: 35, color: "hsl(199, 89%, 48%)" },
    { name: "Camionetas", value: 40, color: "hsl(142, 76%, 36%)" },
    { name: "Vans", value: 15, color: "hsl(280, 65%, 60%)" },
    { name: "Motos", value: 10, color: "hsl(38, 92%, 50%)" },
]

const zonePerformance = [
    { zone: "Centro", entregas: 450, tiempo: 22, eficiencia: 95 },
    { zone: "Norte", entregas: 380, tiempo: 28, eficiencia: 88 },
    { zone: "Sur", entregas: 320, tiempo: 25, eficiencia: 92 },
    { zone: "Este", entregas: 290, tiempo: 30, eficiencia: 85 },
    { zone: "Oeste", entregas: 260, tiempo: 26, eficiencia: 90 },
]

const kpiCards = [
    {
        title: "Ahorro Mensual",
        value: "$12,450",
        change: "+22%",
        trend: "up",
        icon: DollarSign,
        color: "text-success",
    },
    {
        title: "Combustible Ahorrado",
        value: "1,234 L",
        change: "+18%",
        trend: "up",
        icon: Fuel,
        color: "text-primary",
    },
    {
        title: "Tiempo Promedio",
        value: "23 min",
        change: "-15%",
        trend: "up",
        icon: Clock,
        color: "text-warning",
    },
    {
        title: "Km Optimizados",
        value: "8,456",
        change: "+25%",
        trend: "up",
        icon: Route,
        color: "text-route-tertiary",
    },
]

export function Analytics() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Analíticas</h1>
                    <p className="text-sm text-muted-foreground">
                        Rendimiento y métricas de optimización
                    </p>
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="month">
                        <SelectTrigger className="w-[150px]">
                            <Calendar className="h-4 w-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Esta semana</SelectItem>
                            <SelectItem value="month">Este mes</SelectItem>
                            <SelectItem value="quarter">Trimestre</SelectItem>
                            <SelectItem value="year">Este año</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Exportar
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {kpiCards.map((kpi) => (
                    <Card key={kpi.title} className="p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                                <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    {kpi.trend === "up" ? (
                                        <TrendingUp className="h-4 w-4 text-success" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4 text-destructive" />
                                    )}
                                    <span className="text-sm text-success">{kpi.change}</span>
                                    <span className="text-xs text-muted-foreground">vs mes anterior</span>
                                </div>
                            </div>
                            <div className={`rounded-lg bg-muted p-2.5 ${kpi.color}`}>
                                <kpi.icon className="h-5 w-5" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Weekly Deliveries */}
                <Card className="p-5">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Entregas Semanales</h3>
                        <p className="text-sm text-muted-foreground">Comparación real vs optimizado</p>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="colorEntregas2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOptimizadas2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
                                <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
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
                                    fill="url(#colorEntregas2)"
                                    name="Entregas"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="optimizadas"
                                    stroke="hsl(142, 76%, 36%)"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorOptimizadas2)"
                                    name="Optimizadas"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Cost Comparison */}
                <Card className="p-5">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Costos Operativos</h3>
                        <p className="text-sm text-muted-foreground">Actual vs Optimizado (MXN)</p>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={costData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
                                <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(222, 47%, 8%)",
                                        border: "1px solid hsl(217, 33%, 17%)",
                                        borderRadius: "8px",
                                    }}
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                                />
                                <Legend />
                                <Bar dataKey="actual" fill="hsl(217, 33%, 30%)" name="Costo Actual" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="optimizado" fill="hsl(142, 76%, 36%)" name="Costo Optimizado" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Vehicle Distribution */}
                <Card className="p-5">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Uso de Flota</h3>
                        <p className="text-sm text-muted-foreground">Distribución por tipo</p>
                    </div>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={vehicleEfficiency}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {vehicleEfficiency.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(222, 47%, 8%)",
                                        border: "1px solid hsl(217, 33%, 17%)",
                                        borderRadius: "8px",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-2">
                        {vehicleEfficiency.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 text-xs">
                                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-muted-foreground">{item.name}</span>
                                <span className="font-medium text-foreground">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Zone Performance */}
                <Card className="p-5 lg:col-span-2">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Rendimiento por Zona</h3>
                        <p className="text-sm text-muted-foreground">Entregas y tiempos promedio</p>
                    </div>
                    <div className="space-y-4">
                        {zonePerformance.map((zone) => (
                            <div key={zone.zone} className="flex items-center gap-4">
                                <div className="w-20 text-sm font-medium text-foreground">{zone.zone}</div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">{zone.entregas} entregas</span>
                                        <span className="text-muted-foreground">{zone.tiempo} min prom.</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-primary transition-all"
                                            style={{ width: `${zone.eficiencia}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="w-12 text-right text-sm font-medium text-success">
                                    {zone.eficiencia}%
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}