// src/components/profile/PersonalInfo.tsx
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuthStore } from "@/store/useAuthStore"
import * as React from "react";

export function PersonalInfo() {
    const { toast } = useToast()
    const user = useAuthStore((state) => state.user)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: user?.name || "Admin Principal",
        email: user?.email || "admin@rutaoptima.com",
        phone: "+57 300 123 4567",
        position: "Gerente de Operaciones",
        department: "Logística",
    })

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Perfil actualizado",
            description: "Tu información personal ha sido guardada exitosamente.",
        })
        setIsLoading(false)
    }

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Información Personal
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre Completo *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="position">Cargo</Label>
                            <Input
                                id="position"
                                value={formData.position}
                                onChange={(e) => handleChange("position", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="department">Departamento</Label>
                        <Input
                            id="department"
                            value={formData.department}
                            onChange={(e) => handleChange("department", e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Rol (Solo lectura)</Label>
                        <Input id="role" value="Administrador" disabled className="bg-muted" />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading} className="gap-2">
                            <Save className="h-4 w-4" />
                            {isLoading ? "Guardando..." : "Guardar Cambios"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}