// src/components/profile/SecuritySettings.tsx
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Save, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import * as React from "react";

export function SecuritySettings() {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    })

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const toggleShowPassword = (field: "current" | "new" | "confirm") => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.newPassword !== formData.confirmPassword) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden",
                variant: "destructive",
            })
            return
        }

        if (formData.newPassword.length < 8) {
            toast({
                title: "Error",
                description: "La contraseña debe tener al menos 8 caracteres",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Contraseña actualizada",
            description: "Tu contraseña ha sido cambiada exitosamente.",
        })

        // Limpiar formulario
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        })

        setIsLoading(false)
    }

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Cambiar Contraseña
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Contraseña Actual *</Label>
                        <div className="relative">
                            <Input
                                id="currentPassword"
                                type={showPasswords.current ? "text" : "password"}
                                value={formData.currentPassword}
                                onChange={(e) => handleChange("currentPassword", e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword("current")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPasswords.current ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">Nueva Contraseña *</Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                type={showPasswords.new ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={(e) => handleChange("newPassword", e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword("new")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPasswords.new ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Mínimo 8 caracteres, incluye mayúsculas y números
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña *</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showPasswords.confirm ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword("confirm")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPasswords.confirm ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4 border border-border">
                        <p className="text-sm font-medium text-foreground mb-2">
                            Requisitos de contraseña:
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Al menos 8 caracteres de longitud</li>
                            <li>• Al menos una letra mayúscula</li>
                            <li>• Al menos un número</li>
                            <li>• Se recomienda incluir caracteres especiales (!@#$%)</li>
                        </ul>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading} className="gap-2">
                            <Save className="h-4 w-4" />
                            {isLoading ? "Actualizando..." : "Actualizar Contraseña"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}