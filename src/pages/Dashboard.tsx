import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Package, Truck, Zap, Clock, DollarSign, MapPin, Activity } from 'lucide-react'

const stats = [
    {
        title: 'Rutas Activas',
        value: '12',
        icon: MapPin,
        trend: '+2 hoy',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        title: 'Órdenes Pendientes',
        value: '48',
        icon: Package,
        trend: '-12 desde ayer',
        color: 'from-purple-500 to-pink-500'
    },
    {
        title: 'Flota Disponible',
        value: '98%',
        icon: Truck,
        trend: '24/25 vehículos',
        color: 'from-green-500 to-emerald-500'
    },
    {
        title: 'Eficiencia',
        value: '+15%',
        icon: TrendingUp,
        trend: 'vs mes anterior',
        color: 'from-orange-500 to-amber-500'
    },
]

const recentActivity = [
    { id: 1, action: 'Ruta optimizada', route: 'Zona Norte', time: 'Hace 5 min', status: 'success' },
    { id: 2, action: 'Nueva orden', route: 'Centro', time: 'Hace 12 min', status: 'pending' },
    { id: 3, action: 'Entrega completada', route: 'Zona Sur', time: 'Hace 23 min', status: 'success' },
    { id: 4, action: 'Vehículo en ruta', route: 'Zona Este', time: 'Hace 34 min', status: 'active' },
]

export function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
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
                                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Activity and Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Recent Activity */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Actividad Reciente
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' :
                                            activity.status === 'active' ? 'bg-blue-500' :
                                                'bg-yellow-500'
                                        }`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{activity.action}</p>
                                        <p className="text-xs text-muted-foreground">{activity.route}</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {activity.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Métricas Rápidas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Tiempo Promedio</p>
                                    <p className="text-xs text-muted-foreground">Por entrega</p>
                                </div>
                            </div>
                            <span className="text-lg font-bold">24 min</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Ahorro Mensual</p>
                                    <p className="text-xs text-muted-foreground">Combustible</p>
                                </div>
                            </div>
                            <span className="text-lg font-bold">$2,340</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Distancia Total</p>
                                    <p className="text-xs text-muted-foreground">Hoy</p>
                                </div>
                            </div>
                            <span className="text-lg font-bold">342 km</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
