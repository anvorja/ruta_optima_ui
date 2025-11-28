import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Package, DollarSign, Clock, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

const deliveryData = [
    { day: 'Lun', entregas: 45, completadas: 42 },
    { day: 'Mar', entregas: 52, completadas: 48 },
    { day: 'Mié', entregas: 48, completadas: 46 },
    { day: 'Jue', entregas: 61, completadas: 58 },
    { day: 'Vie', entregas: 55, completadas: 53 },
    { day: 'Sáb', entregas: 38, completadas: 36 },
    { day: 'Dom', entregas: 28, completadas: 27 },
]

const efficiencyData = [
    { mes: 'Ene', eficiencia: 82 },
    { mes: 'Feb', eficiencia: 85 },
    { mes: 'Mar', eficiencia: 83 },
    { mes: 'Abr', eficiencia: 87 },
    { mes: 'May', eficiencia: 89 },
    { mes: 'Jun', eficiencia: 91 },
]

const costData = [
    { categoria: 'Combustible', valor: 4200 },
    { categoria: 'Mantenimiento', valor: 1800 },
    { categoria: 'Personal', valor: 8500 },
    { categoria: 'Otros', valor: 1200 },
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

const stats = [
    {
        title: 'Entregas Totales',
        value: '1,247',
        change: '+12.5%',
        icon: Package,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        title: 'Eficiencia Promedio',
        value: '89%',
        change: '+4.2%',
        icon: TrendingUp,
        color: 'from-green-500 to-emerald-500'
    },
    {
        title: 'Tiempo Promedio',
        value: '24 min',
        change: '-8.3%',
        icon: Clock,
        color: 'from-purple-500 to-pink-500'
    },
    {
        title: 'Ahorro Mensual',
        value: '$12,450',
        change: '+15.8%',
        icon: DollarSign,
        color: 'from-orange-500 to-amber-500'
    },
]

export function Reports() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Reportes y Análisis</h2>
                    <p className="text-muted-foreground">Visualiza el rendimiento de tus operaciones</p>
                </div>
                <Button className="gap-2">
                    <Download className="w-4 h-4" />
                    Exportar Reporte
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.title} className="border-0 shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change} vs mes anterior
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Charts */}
            <Tabs defaultValue="deliveries" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="deliveries">Entregas</TabsTrigger>
                    <TabsTrigger value="efficiency">Eficiencia</TabsTrigger>
                    <TabsTrigger value="costs">Costos</TabsTrigger>
                </TabsList>

                <TabsContent value="deliveries" className="space-y-4">
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>Entregas por Día</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={deliveryData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="entregas" fill="#3b82f6" name="Total Entregas" />
                                    <Bar dataKey="completadas" fill="#10b981" name="Completadas" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="efficiency" className="space-y-4">
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>Tendencia de Eficiencia</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart data={efficiencyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mes" />
                                    <YAxis domain={[70, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="eficiencia"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        name="Eficiencia (%)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="costs" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>Distribución de Costos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={costData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="valor"
                                        >
                                            {costData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>Desglose de Costos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {costData.map((item, index) => (
                                        <div key={item.categoria} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-4 h-4 rounded-full"
                                                    style={{ backgroundColor: COLORS[index] }}
                                                />
                                                <span className="font-medium">{item.categoria}</span>
                                            </div>
                                            <span className="text-lg font-bold">${item.valor.toLocaleString()}</span>
                                        </div>
                                    ))}
                                    <div className="pt-4 border-t">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">Total</span>
                                            <span className="text-xl font-bold">
                                                ${costData.reduce((sum, item) => sum + item.valor, 0).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
