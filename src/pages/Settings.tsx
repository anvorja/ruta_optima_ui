// src/pages/Settings.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Zap, Bell, Users } from "lucide-react"
import {
    CompanySettings,
    OptimizationSettings,
    NotificationSettings,
    UserManagement,
} from "@/components/settings"

export function Settings() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
                <p className="text-sm text-muted-foreground">
                    Administra las preferencias de tu cuenta y empresa
                </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="company" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                    <TabsTrigger value="company" className="gap-2">
                        <Building2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Empresa</span>
                    </TabsTrigger>
                    <TabsTrigger value="optimization" className="gap-2">
                        <Zap className="h-4 w-4" />
                        <span className="hidden sm:inline">Optimización</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Notificaciones</span>
                    </TabsTrigger>
                    <TabsTrigger value="users" className="gap-2">
                        <Users className="h-4 w-4" />
                        <span className="hidden sm:inline">Usuarios</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="company">
                    <CompanySettings />
                </TabsContent>

                <TabsContent value="optimization">
                    <OptimizationSettings />
                </TabsContent>

                <TabsContent value="notifications">
                    <NotificationSettings />
                </TabsContent>

                <TabsContent value="users">
                    <UserManagement />
                </TabsContent>
            </Tabs>
        </div>
    )
}