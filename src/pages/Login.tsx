// src/pages/Login.tsx
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

export function Login() {
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        login({ name: 'Demo User', role: 'admin' })
        navigate('/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="space-y-4 pb-8">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <MapPin className="w-9 h-9 text-white" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            RutaOptima
                        </CardTitle>
                        <CardDescription className="text-base">
                            Planificador de Rutas Multicriterio
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@rutaoptima.com"
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="h-11"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
                        >
                            Iniciar Sesión
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                            Demo: Haz clic para acceder
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
