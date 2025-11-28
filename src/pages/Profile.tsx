import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Lock, Activity, Settings } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { useAuthStore } from '@/store/useAuthStore'

export function Profile() {
    const { toast } = useToast()
    const user = useAuthStore((state) => state.user)
    const [name, setName] = useState(user?.name || 'Admin Principal')
    const [email, setEmail] = useState(user?.email || 'admin@rutaoptima.com')
    const [phone, setPhone] = useState('+57 300 123 4567')

    const handleSaveProfile = () => {
        toast({
            title: "Perfil actualizado",
            description: "Tu información ha sido guardada exitosamente.",
        })
    }

    const handleChangePassword = () => {
        toast({
            title: "Contraseña actualizada",
            description: "Tu contraseña ha sido cambiada exitosamente.",
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold">Mi Perfil</h2>
                <p className="text-muted-foreground">Administra tu información personal y preferencias</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Profile Card */}
                <Card className="border-0 shadow-lg md:col-span-1">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <User className="w-12 h-12 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{name}</h3>
                                <p className="text-sm text-muted-foreground">{email}</p>
                            </div>
                            <div className="w-full pt-4 border-t space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Rol:</span>
                                    <span className="font-medium">Administrador</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Miembro desde:</span>
                                    <span className="font-medium">Enero 2024</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Settings Tabs */}
                <div className="md:col-span-2">
                    <Tabs defaultValue="personal" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="personal" className="gap-2">
                                <User className="w-4 h-4" />
                                Personal
                            </TabsTrigger>
                            <TabsTrigger value="security" className="gap-2">
                                <Lock className="w-4 h-4" />
                                Seguridad
                            </TabsTrigger>
                            <TabsTrigger value="preferences" className="gap-2">
                                <Settings className="w-4 h-4" />
                                Preferencias
                            </TabsTrigger>
                            <TabsTrigger value="activity" className="gap-2">
                                <Activity className="w-4 h-4" />
                                Actividad
                            </TabsTrigger>
                        </TabsList>

                        {/* Personal Info */}
                        <TabsContent value="personal">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Información Personal</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nombre Completo</Label>
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Input
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="role">Rol</Label>
                                        <Input
                                            id="role"
                                            value="Administrador"
                                            disabled
                                        />
                                    </div>

                                    <Button onClick={handleSaveProfile}>
                                        Guardar Cambios
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Security */}
                        <TabsContent value="security">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Cambiar Contraseña</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Contraseña Actual</Label>
                                        <Input
                                            id="currentPassword"
                                            type="password"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">Nueva Contraseña</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                        />
                                    </div>

                                    <Button onClick={handleChangePassword}>
                                        Actualizar Contraseña
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Preferences */}
                        <TabsContent value="preferences">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Preferencias de Interfaz</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Tema Oscuro</p>
                                                <p className="text-sm text-muted-foreground">Usar tema oscuro en la interfaz</p>
                                            </div>
                                            <input type="checkbox" className="w-4 h-4" />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Notificaciones de Escritorio</p>
                                                <p className="text-sm text-muted-foreground">Recibir notificaciones en el navegador</p>
                                            </div>
                                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Sonidos</p>
                                                <p className="text-sm text-muted-foreground">Reproducir sonidos para notificaciones</p>
                                            </div>
                                            <input type="checkbox" className="w-4 h-4" />
                                        </div>
                                    </div>

                                    <Button>
                                        Guardar Preferencias
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Activity */}
                        <TabsContent value="activity">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Actividad Reciente</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 pb-4 border-b">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                                            <div className="flex-1">
                                                <p className="font-medium">Creaste una nueva orden</p>
                                                <p className="text-sm text-muted-foreground">Hace 2 horas</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 pb-4 border-b">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                                            <div className="flex-1">
                                                <p className="font-medium">Optimizaste 3 rutas</p>
                                                <p className="text-sm text-muted-foreground">Hace 5 horas</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 pb-4 border-b">
                                            <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                                            <div className="flex-1">
                                                <p className="font-medium">Agregaste un nuevo vehículo</p>
                                                <p className="text-sm text-muted-foreground">Ayer</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                                            <div className="flex-1">
                                                <p className="font-medium">Actualizaste la configuración</p>
                                                <p className="text-sm text-muted-foreground">Hace 2 días</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <Toaster />
        </div>
    )
}
