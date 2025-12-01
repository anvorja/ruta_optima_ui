// src/pages/Profile.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Lock, Settings2, Activity } from "lucide-react"
import { PersonalInfo, SecuritySettings, Preferences, ActivityLog } from "@/components/profile"
import { useAuthStore } from "@/store/useAuthStore"

export function Profile() {
    const user = useAuthStore((state) => state.user)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>
                <p className="text-sm text-muted-foreground">
                    Administra tu información personal y preferencias
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Profile Card */}
                <Card className="border-0 shadow-lg lg:col-span-1">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            {/* Avatar */}
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">
                  {user?.name?.charAt(0) || "U"}
                </span>
                            </div>

                            {/* User Info */}
                            <div className="w-full">
                                <h3 className="text-xl font-bold text-foreground">{user?.name || "Usuario"}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {user?.email || "usuario@rutaoptima.com"}
                                </p>
                                <Badge
                                    variant="outline"
                                    className="mt-3 bg-primary/20 text-primary border-primary/30"
                                >
                                    {user?.role === "admin" ? "Administrador" : user?.role || "Usuario"}
                                </Badge>
                            </div>

                            {/* Stats */}
                            <div className="w-full pt-4 border-t space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Miembro desde:</span>
                                    <span className="font-medium text-foreground">Enero 2024</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Rutas optimizadas:</span>
                                    <span className="font-medium text-foreground">142</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Órdenes gestionadas:</span>
                                    <span className="font-medium text-foreground">1,247</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Settings Tabs */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="personal" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                            <TabsTrigger value="personal" className="gap-2">
                                <User className="h-4 w-4" />
                                <span className="hidden sm:inline">Personal</span>
                            </TabsTrigger>
                            <TabsTrigger value="security" className="gap-2">
                                <Lock className="h-4 w-4" />
                                <span className="hidden sm:inline">Seguridad</span>
                            </TabsTrigger>
                            <TabsTrigger value="preferences" className="gap-2">
                                <Settings2 className="h-4 w-4" />
                                <span className="hidden sm:inline">Preferencias</span>
                            </TabsTrigger>
                            <TabsTrigger value="activity" className="gap-2">
                                <Activity className="h-4 w-4" />
                                <span className="hidden sm:inline">Actividad</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="personal">
                            <PersonalInfo />
                        </TabsContent>

                        <TabsContent value="security">
                            <SecuritySettings />
                        </TabsContent>

                        <TabsContent value="preferences">
                            <Preferences />
                        </TabsContent>

                        <TabsContent value="activity">
                            <ActivityLog />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}