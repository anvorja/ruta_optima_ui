import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Building2, Bell, Users, Settings2 } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

export function Settings() {
    const { toast } = useToast()
    const [companyName, setCompanyName] = useState('RutaOptima Logistics')
    const [companyEmail, setCompanyEmail] = useState('contacto@rutaoptima.com')
    const [companyPhone, setCompanyPhone] = useState('+57 300 123 4567')
    const [optimizationPriority, setOptimizationPriority] = useState('time')
    const [considerTraffic, setConsiderTraffic] = useState('yes')
    const [maxStopsPerRoute, setMaxStopsPerRoute] = useState('10')

    const handleSaveCompany = () => {
        toast({
            title: "Configuración guardada",
            description: "La información de la empresa ha sido actualizada.",
        })
    }

    const handleSaveOptimization = () => {
        toast({
            title: "Preferencias guardadas",
            description: "Las preferencias de optimización han sido actualizadas.",
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold">Configuración</h2>
                <p className="text-muted-foreground">Administra las preferencias de tu cuenta y empresa</p>
            </div>

            <Tabs defaultValue="company" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="company" className="gap-2">
                        <Building2 className="w-4 h-4" />
                        Empresa
                    </TabsTrigger>
                    <TabsTrigger value="optimization" className="gap-2">
                        <Settings2 className="w-4 h-4" />
                        Optimización
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="w-4 h-4" />
                        Notificaciones
                    </TabsTrigger>
                    <TabsTrigger value="users" className="gap-2">
                        <Users className="w-4 h-4" />
                        Usuarios
                    </TabsTrigger>
                </TabsList>

                {/* Company Settings */}
                <TabsContent value="company">
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>Información de la Empresa</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                                <Input
                                    id="companyName"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="companyEmail">Email de Contacto</Label>
                                <Input
                                    id="companyEmail"
                                    type="email"
                                    value={companyEmail}
                                    onChange={(e) => setCompanyEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="companyPhone">Teléfono</Label>
                                <Input
                                    id="companyPhone"
                                    value={companyPhone}
                                    onChange={(e) => setCompanyPhone(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="companyAddress">Dirección</Label>
                                <Input
                                    id="companyAddress"
                                    placeholder="Calle 100 #15-20, Bogotá"
                                />
                            </div>

                            <Button onClick={handleSaveCompany}>
                                Guardar Cambios
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Optimization Settings */}
                <TabsContent value="optimization">
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>Preferencias de Optimización</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="priority">Prioridad de Optimización</Label>
                                <Select value={optimizationPriority} onValueChange={setOptimizationPriority}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="time">Tiempo</SelectItem>
                                        <SelectItem value="distance">Distancia</SelectItem>
                                        <SelectItem value="cost">Costo</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground">
                                    Define qué factor es más importante al optimizar rutas
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="traffic">Considerar Tráfico</Label>
                                <Select value={considerTraffic} onValueChange={setConsiderTraffic}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yes">Sí</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="maxStops">Máximo de Paradas por Ruta</Label>
                                <Input
                                    id="maxStops"
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={maxStopsPerRoute}
                                    onChange={(e) => setMaxStopsPerRoute(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Respetar Ventanas de Tiempo</Label>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="timeWindows" defaultChecked className="w-4 h-4" />
                                    <Label htmlFor="timeWindows" className="font-normal">
                                        Siempre respetar las ventanas de tiempo de entrega
                                    </Label>
                                </div>
                            </div>

                            <Button onClick={handleSaveOptimization}>
                                Guardar Preferencias
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications">
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>Configuración de Notificaciones</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Nuevas Órdenes</p>
                                        <p className="text-sm text-muted-foreground">Recibe notificaciones cuando se crean nuevas órdenes</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Entregas Completadas</p>
                                        <p className="text-sm text-muted-foreground">Notificación cuando se completa una entrega</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Alertas de Mantenimiento</p>
                                        <p className="text-sm text-muted-foreground">Recordatorios de mantenimiento de vehículos</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Reportes Semanales</p>
                                        <p className="text-sm text-muted-foreground">Resumen semanal de operaciones</p>
                                    </div>
                                    <input type="checkbox" className="w-4 h-4" />
                                </div>
                            </div>

                            <Button>
                                Guardar Configuración
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Users Settings */}
                <TabsContent value="users">
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Gestión de Usuarios</CardTitle>
                                <Button>Invitar Usuario</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">Admin Principal</p>
                                        <p className="text-sm text-muted-foreground">admin@rutaoptima.com</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                        Administrador
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">María García</p>
                                        <p className="text-sm text-muted-foreground">maria@rutaoptima.com</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                        Operador
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">Juan Pérez</p>
                                        <p className="text-sm text-muted-foreground">juan@rutaoptima.com</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                        Conductor
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Toaster />
        </div>
    )
}
