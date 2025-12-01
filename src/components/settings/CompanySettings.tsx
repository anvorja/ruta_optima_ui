// src/components/settings/CompanySettings.tsx
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import * as React from "react";

export function CompanySettings() {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "RutaOptima Logistics",
        email: "contacto@rutaoptima.com",
        phone: "+57 300 123 4567",
        address: "Calle 100 #15-20, Bogotá, Colombia",
        taxId: "NIT 900.123.456-7",
        website: "https://rutaoptima.com",
    })

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simular guardado
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Cambios guardados",
            description: "La información de la empresa ha sido actualizada exitosamente.",
        })
        setIsLoading(false)
    }

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Información de la Empresa
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre de la Empresa *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="taxId">NIT / RUT *</Label>
                            <Input
                                id="taxId"
                                value={formData.taxId}
                                onChange={(e) => handleChange("taxId", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email de Contacto *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono *</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="website">Sitio Web</Label>
                        <Input
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={(e) => handleChange("website", e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Dirección Principal *</Label>
                        <Textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            rows={3}
                            required
                        />
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