// src/components/settings/UserManagement.tsx
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Users,
    UserPlus,
    Search,
    MoreVertical,
    Mail,
    Shield,
    Edit,
    Trash2,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
    id: string
    name: string
    email: string
    role: "admin" | "operator" | "driver"
    status: "active" | "inactive"
    lastLogin: string
}

const roleConfig = {
    admin: { label: "Administrador", className: "bg-primary/20 text-primary" },
    operator: { label: "Operador", className: "bg-success/20 text-success" },
    driver: { label: "Conductor", className: "bg-warning/20 text-warning" },
}

const statusConfig = {
    active: { label: "Activo", className: "bg-success/20 text-success" },
    inactive: { label: "Inactivo", className: "bg-muted text-muted-foreground" },
}

export function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("")

    const [users] = useState<User[]>([
        {
            id: "1",
            name: "Admin Principal",
            email: "admin@rutaoptima.com",
            role: "admin",
            status: "active",
            lastLogin: "Hace 5 min",
        },
        {
            id: "2",
            name: "María García",
            email: "maria@rutaoptima.com",
            role: "operator",
            status: "active",
            lastLogin: "Hace 2 horas",
        },
        {
            id: "3",
            name: "Carlos Méndez",
            email: "carlos@rutaoptima.com",
            role: "driver",
            status: "active",
            lastLogin: "Hace 1 hora",
        },
        {
            id: "4",
            name: "Ana Torres",
            email: "ana@rutaoptima.com",
            role: "operator",
            status: "active",
            lastLogin: "Ayer",
        },
        {
            id: "5",
            name: "Juan Pérez",
            email: "juan@rutaoptima.com",
            role: "driver",
            status: "inactive",
            lastLogin: "Hace 5 días",
        },
    ])

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Gestión de Usuarios
                    </CardTitle>
                    <Button className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        Invitar Usuario
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar usuarios..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Users List */}
                <div className="space-y-3">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                {/* Avatar */}
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
                  <span className="text-lg font-bold text-primary-foreground">
                    {user.name.charAt(0)}
                  </span>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-foreground">{user.name}</p>
                                        <Badge
                                            variant="outline"
                                            className={roleConfig[user.role].className}
                                        >
                                            {roleConfig[user.role].label}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className={statusConfig[user.status].className}
                                        >
                                            {statusConfig[user.status].label}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                        {user.email}
                    </span>
                                        <span className="hidden sm:inline">
                      · Último acceso: {user.lastLogin}
                    </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Shield className="h-4 w-4 mr-2" />
                                            Cambiar rol
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Mail className="h-4 w-4 mr-2" />
                                            Enviar email
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Eliminar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">No se encontraron usuarios</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}