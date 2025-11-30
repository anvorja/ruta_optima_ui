// src/components/layout/Sidebar.tsx
import { useState } from "react"
import { NavLink } from "@/components/NavLink"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Route,
    Package,
    Truck,
    MapPin,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    Bell,
    Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const menuItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Planificar Rutas", url: "/routes", icon: Route, badge: "IA" },
    { title: "Órdenes", url: "/orders", icon: Package, count: 24 },
    { title: "Flota", url: "/fleet", icon: Truck },
    { title: "Mapa en Vivo", url: "/live-map", icon: MapPin, live: true },
    { title: "Reportes", url: "/reports", icon: BarChart3 },
    { title: "Configuración", url: "/settings", icon: Settings },
]

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300",
                collapsed ? "w-[72px]" : "w-64"
            )}
        >
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                                <Zap className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">RutaOptima</span>
                                <span className="text-[10px] text-muted-foreground">Logistics AI</span>
                            </div>
                        </div>
                    )}
                    {collapsed && (
                        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                            <Zap className="h-5 w-5 text-primary-foreground" />
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-3">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.url}
                            to={item.url}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                collapsed && "justify-center px-2"
                            )}
                            activeClassName="bg-sidebar-accent text-sidebar-primary"
                        >
                            <item.icon className={cn("h-5 w-5 shrink-0", item.live && "text-success animate-pulse")} />
                            {!collapsed && (
                                <>
                                    <span className="flex-1">{item.title}</span>
                                    {item.badge && (
                                        <Badge variant="secondary" className="bg-primary/20 text-primary text-[10px] px-1.5">
                                            {item.badge}
                                        </Badge>
                                    )}
                                    {item.count && (
                                        <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] px-1.5">
                                            {item.count}
                                        </Badge>
                                    )}
                                    {item.live && (
                                        <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom section */}
                <div className="border-t border-sidebar-border p-3">
                    {!collapsed && (
                        <div className="mb-3 rounded-lg bg-sidebar-accent p-3">
                            <div className="flex items-center gap-2">
                                <Bell className="h-4 w-4 text-warning" />
                                <span className="text-xs font-medium text-foreground">3 alertas activas</span>
                            </div>
                            <p className="mt-1 text-[10px] text-muted-foreground">
                                Tráfico alto en 2 rutas
                            </p>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn("w-full text-muted-foreground hover:text-foreground", collapsed && "px-2")}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <>
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                <span>Colapsar</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </aside>
    )
}