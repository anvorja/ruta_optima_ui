// // src/components/layout/Sidebar.tsx
// import { useState } from "react"
// import { NavLink } from "@/components/NavLink"
// import { cn } from "@/lib/utils"
// import {
//     LayoutDashboard,
//     Route,
//     Package,
//     Truck,
//     MapPin,
//     BarChart3,
//     Settings,
//     ChevronLeft,
//     ChevronRight,
//     Bell,
//     Zap,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
//
// const menuItems = [
//     { title: "Dashboard", url: "/", icon: LayoutDashboard },
//     { title: "Planificar Rutas", url: "/routes", icon: Route, badge: "IA" },
//     { title: "Órdenes", url: "/orders", icon: Package, count: 24 },
//     { title: "Flota", url: "/fleet", icon: Truck },
//     { title: "Mapa en Vivo", url: "/live-map", icon: MapPin, live: true },
//     { title: "Analíticas", url: "/analytics", icon: BarChart3 },
//     { title: "Configuración", url: "/settings", icon: Settings },
// ]
//
// export function Sidebar() {
//     const [collapsed, setCollapsed] = useState(false)
//
//     return (
//         <aside
//             className={cn(
//                 "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300",
//                 collapsed ? "w-[72px]" : "w-64"
//             )}
//         >
//             <div className="flex h-full flex-col">
//                 {/* Logo */}
//                 <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
//                     {!collapsed && (
//                         <div className="flex items-center gap-2">
//                             <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
//                                 <Zap className="h-5 w-5 text-primary-foreground" />
//                             </div>
//                             <div className="flex flex-col">
//                                 <span className="text-sm font-bold text-foreground">RutaOptima</span>
//                                 <span className="text-[10px] text-muted-foreground">Logistics AI</span>
//                             </div>
//                         </div>
//                     )}
//                     {collapsed && (
//                         <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
//                             <Zap className="h-5 w-5 text-primary-foreground" />
//                         </div>
//                     )}
//                 </div>
//
//                 {/* Navigation */}
//                 <nav className="flex-1 space-y-1 p-3">
//                     {menuItems.map((item) => (
//                         <NavLink
//                             key={item.url}
//                             to={item.url}
//                             className={cn(
//                                 "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
//                                 collapsed && "justify-center px-2"
//                             )}
//                             activeClassName="bg-sidebar-accent text-sidebar-primary"
//                         >
//                             <item.icon className={cn("h-5 w-5 shrink-0", item.live && "text-success animate-pulse")} />
//                             {!collapsed && (
//                                 <>
//                                     <span className="flex-1">{item.title}</span>
//                                     {item.badge && (
//                                         <Badge variant="secondary" className="bg-primary/20 text-primary text-[10px] px-1.5">
//                                             {item.badge}
//                                         </Badge>
//                                     )}
//                                     {item.count && (
//                                         <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] px-1.5">
//                                             {item.count}
//                                         </Badge>
//                                     )}
//                                     {item.live && (
//                                         <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                                     )}
//                                 </>
//                             )}
//                         </NavLink>
//                     ))}
//                 </nav>
//
//                 {/* Bottom section */}
//                 <div className="border-t border-sidebar-border p-3">
//                     {!collapsed && (
//                         <div className="mb-3 rounded-lg bg-sidebar-accent p-3">
//                             <div className="flex items-center gap-2">
//                                 <Bell className="h-4 w-4 text-warning" />
//                                 <span className="text-xs font-medium text-foreground">3 alertas activas</span>
//                             </div>
//                             <p className="mt-1 text-[10px] text-muted-foreground">
//                                 Tráfico alto en 2 rutas
//                             </p>
//                         </div>
//                     )}
//                     <Button
//                         variant="ghost"
//                         size="sm"
//                         className={cn("w-full text-muted-foreground hover:text-foreground", collapsed && "px-2")}
//                         onClick={() => setCollapsed(!collapsed)}
//                     >
//                         {collapsed ? (
//                             <ChevronRight className="h-4 w-4" />
//                         ) : (
//                             <>
//                                 <ChevronLeft className="h-4 w-4 mr-2" />
//                                 <span>Colapsar</span>
//                             </>
//                         )}
//                     </Button>
//                 </div>
//             </div>
//         </aside>
//     )
// }



// // src/components/layout/Sidebar.tsx
// import { NavLink } from "@/components/NavLink"
// import { cn } from "@/lib/utils"
// import {
//     LayoutDashboard,
//     Route,
//     Package,
//     Truck,
//     MapPin,
//     BarChart3,
//     Settings,
//     X,
//     Bell,
//     Zap,
//     LogOut,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { useAuthStore } from "@/store/useAuthStore"
// import { Link } from "react-router-dom"
//
// const menuItems = [
//     { title: "Dashboard", url: "/", icon: LayoutDashboard },
//     { title: "Planificar Rutas", url: "/routes", icon: Route, badge: "IA" },
//     { title: "Órdenes", url: "/orders", icon: Package, count: 24 },
//     { title: "Flota", url: "/fleet", icon: Truck },
//     { title: "Mapa en Vivo", url: "/live-map", icon: MapPin, live: true },
//     { title: "Analíticas", url: "/analytics", icon: BarChart3 },
//     { title: "Configuración", url: "/settings", icon: Settings },
// ]
//
// interface SidebarProps {
//     isOpen?: boolean
//     onClose?: () => void
// }
//
// export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
//     const { user, logout } = useAuthStore()
//
//     return (
//         <aside
//             className={cn(
//                 "fixed md:static inset-y-0 left-0 z-50 w-64 border-r border-sidebar-border bg-sidebar flex flex-col transition-transform duration-300",
//                 isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//             )}
//         >
//             {/* Logo */}
//             <div className="flex h-14 sm:h-16 items-center justify-between border-b border-sidebar-border px-4">
//                 <div className="flex items-center gap-2">
//                     <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
//                         <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
//                     </div>
//                     <div className="flex flex-col">
//                         <span className="text-sm font-bold text-foreground">RutaOptima</span>
//                         <span className="text-[10px] text-muted-foreground">Logistics AI</span>
//                     </div>
//                 </div>
//                 {/* Close button for mobile */}
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     className="md:hidden"
//                     onClick={onClose}
//                 >
//                     <X className="h-5 w-5" />
//                 </Button>
//             </div>
//
//             {/* Navigation */}
//             <nav className="flex-1 space-y-1 p-3 overflow-y-auto smooth-scroll">
//                 {menuItems.map((item, index) => (
//                     <NavLink
//                         key={item.url}
//                         to={item.url}
//                         onClick={onClose}
//                         className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground touch-target"
//                         activeClassName="bg-sidebar-accent text-sidebar-primary"
//                         style={{
//                             animation: `fade-up 0.3s ease-out ${index * 0.05}s forwards`,
//                             opacity: 0
//                         }}
//                     >
//                         <item.icon className={cn("h-5 w-5 shrink-0", item.live && "text-success animate-pulse")} />
//                         <span className="flex-1">{item.title}</span>
//                         {item.badge && (
//                             <Badge variant="secondary" className="bg-primary/20 text-primary text-[10px] px-1.5">
//                                 {item.badge}
//                             </Badge>
//                         )}
//                         {item.count && (
//                             <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] px-1.5">
//                                 {item.count}
//                             </Badge>
//                         )}
//                         {item.live && (
//                             <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                         )}
//                     </NavLink>
//                 ))}
//             </nav>
//
//             {/* Bottom section - User Profile */}
//             <div className="border-t border-sidebar-border p-3 space-y-2">
//                 {/* Alertas */}
//                 <div className="rounded-lg bg-sidebar-accent p-3 mb-2">
//                     <div className="flex items-center gap-2">
//                         <Bell className="h-4 w-4 text-warning" />
//                         <span className="text-xs font-medium text-foreground">3 alertas activas</span>
//                     </div>
//                     <p className="mt-1 text-[10px] text-muted-foreground">
//                         Tráfico alto en 2 rutas
//                     </p>
//                 </div>
//
//                 {/* User */}
//                 <Link
//                     to="/profile"
//                     className="flex items-center gap-3 px-3 py-2.5 hover:bg-sidebar-accent rounded-lg transition-colors touch-target"
//                     onClick={onClose}
//                 >
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
//                         {user?.name.charAt(0) || 'U'}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium truncate">{user?.name}</p>
//                         <p className="text-xs text-muted-foreground capitalize truncate">{user?.role}</p>
//                     </div>
//                 </Link>
//
//                 {/* Logout */}
//                 <button
//                     onClick={logout}
//                     className="w-full flex items-center gap-2 px-3 py-2 hover:bg-sidebar-accent rounded-lg transition-colors text-sm text-muted-foreground touch-target"
//                 >
//                     <LogOut className="w-4 h-4 shrink-0" />
//                     <span>Cerrar sesión</span>
//                 </button>
//             </div>
//         </aside>
//     )
// }


// // src/components/layout/Sidebar.tsx
// import { NavLink } from "@/components/NavLink"
// import { cn } from "@/lib/utils"
// import {
//     LayoutDashboard,
//     Route,
//     Package,
//     Truck,
//     MapPin,
//     BarChart3,
//     Settings,
//     X,
//     Zap,
//     ChevronLeft,
//     ChevronRight,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { useState } from "react"
//
// const menuItems = [
//     { title: "Dashboard", url: "/", icon: LayoutDashboard },
//     { title: "Planificar Rutas", url: "/routes", icon: Route, badge: "IA" },
//     { title: "Órdenes", url: "/orders", icon: Package, count: 24 },
//     { title: "Flota", url: "/fleet", icon: Truck },
//     { title: "Mapa en Vivo", url: "/live-map", icon: MapPin, live: true },
//     { title: "Analíticas", url: "/analytics", icon: BarChart3 },
//     { title: "Configuración", url: "/settings", icon: Settings },
// ]
//
// interface SidebarProps {
//     isOpen?: boolean
//     onClose?: () => void
// }
//
// export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
//     const [collapsed, setCollapsed] = useState(false)
//
//     const toggleCollapse = () => {
//         setCollapsed(!collapsed)
//     }
//
//     return (
//         <aside
//             className={cn(
//                 "fixed md:static inset-y-0 left-0 z-50 border-r border-sidebar-border bg-sidebar flex flex-col transition-all duration-300",
//                 // Mobile: full width sidebar con transform
//                 isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
//                 // Desktop: ancho colapsable
//                 collapsed ? "md:w-[72px]" : "md:w-64",
//                 // Mobile siempre 64 (256px)
//                 "w-64"
//             )}
//         >
//             {/* Logo */}
//             <div className="flex h-14 sm:h-16 items-center justify-between border-b border-sidebar-border px-4">
//                 {!collapsed && (
//                     <div className="flex items-center gap-2">
//                         <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
//                             <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
//                         </div>
//                         <div className="flex flex-col">
//                             <span className="text-sm font-bold text-foreground">RutaOptima</span>
//                             <span className="text-[10px] text-muted-foreground">Logistics AI</span>
//                         </div>
//                     </div>
//                 )}
//
//                 {collapsed && (
//                     <div className="mx-auto flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
//                         <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
//                     </div>
//                 )}
//
//                 {/* Close button for mobile */}
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     className="md:hidden"
//                     onClick={onClose}
//                 >
//                     <X className="h-5 w-5" />
//                 </Button>
//             </div>
//
//             {/* Navigation */}
//             <nav className="flex-1 space-y-1 p-3 overflow-y-auto smooth-scroll">
//                 {menuItems.map((item, index) => (
//                     <NavLink
//                         key={item.url}
//                         to={item.url}
//                         onClick={onClose}
//                         className={cn(
//                             "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground touch-target",
//                             collapsed && "justify-center md:px-2"
//                         )}
//                         activeClassName="bg-sidebar-accent text-sidebar-primary"
//                         style={{
//                             animation: `fade-up 0.3s ease-out ${index * 0.05}s forwards`,
//                             opacity: 0
//                         }}
//                     >
//                         <item.icon className={cn("h-5 w-5 shrink-0", item.live && "text-success animate-pulse")} />
//
//                         {!collapsed && (
//                             <>
//                                 <span className="flex-1">{item.title}</span>
//                                 {item.badge && (
//                                     <Badge variant="secondary" className="bg-primary/20 text-primary text-[10px] px-1.5">
//                                         {item.badge}
//                                     </Badge>
//                                 )}
//                                 {item.count && (
//                                     <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] px-1.5">
//                                         {item.count}
//                                     </Badge>
//                                 )}
//                                 {item.live && (
//                                     <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                                 )}
//                             </>
//                         )}
//                     </NavLink>
//                 ))}
//             </nav>
//
//             {/* Collapse Toggle - Solo visible en desktop */}
//             <div className="border-t border-sidebar-border p-3 hidden md:block">
//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     className={cn(
//                         "w-full text-muted-foreground hover:text-foreground transition-colors",
//                         collapsed && "px-2"
//                     )}
//                     onClick={toggleCollapse}
//                 >
//                     {collapsed ? (
//                         <ChevronRight className="h-4 w-4" />
//                     ) : (
//                         <>
//                             <ChevronLeft className="h-4 w-4 mr-2" />
//                             <span>Colapsar</span>
//                         </>
//                     )}
//                 </Button>
//             </div>
//         </aside>
//     )
// }


// // src/components/layout/Sidebar.tsx
// import { NavLink } from "@/components/NavLink"
// import { cn } from "@/lib/utils"
// import {
//     LayoutDashboard,
//     Route,
//     Package,
//     Truck,
//     MapPin,
//     BarChart3,
//     Settings,
//     X,
//     Zap,
//     ChevronLeft,
//     ChevronRight,
//     User,
//     LogOut,
//     Bell,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useState } from "react"
// import { useAuthStore } from "@/store/useAuthStore"
// import { useNavigate } from "react-router-dom"
//
// const menuItems = [
//     { title: "Dashboard", url: "/", icon: LayoutDashboard },
//     { title: "Planificar Rutas", url: "/routes", icon: Route, badge: "IA" },
//     { title: "Órdenes", url: "/orders", icon: Package, count: 24 },
//     { title: "Flota", url: "/fleet", icon: Truck },
//     { title: "Mapa en Vivo", url: "/live-map", icon: MapPin, live: true },
//     { title: "Analíticas", url: "/analytics", icon: BarChart3 },
//     { title: "Configuración", url: "/settings", icon: Settings },
// ]
//
// interface SidebarProps {
//     isOpen?: boolean
//     onClose?: () => void
// }
//
// export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
//     const [collapsed, setCollapsed] = useState(false)
//     const { user, logout } = useAuthStore()
//     const navigate = useNavigate()
//
//     const toggleCollapse = () => {
//         setCollapsed(!collapsed)
//     }
//
//     const handleNavigation = (path: string) => {
//         navigate(path)
//         onClose?.()
//     }
//
//     return (
//         <aside
//             className={cn(
//                 "fixed md:static inset-y-0 left-0 z-50 border-r border-sidebar-border bg-sidebar flex flex-col transition-all duration-300",
//                 // Mobile: full width sidebar con transform
//                 isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
//                 // Desktop: ancho colapsable
//                 collapsed ? "md:w-[72px]" : "md:w-64",
//                 // Mobile siempre 64 (256px)
//                 "w-64"
//             )}
//         >
//             {/* Toggle Button - Flecha en el borde derecho (solo desktop) */}
//             <button
//                 onClick={toggleCollapse}
//                 className={cn(
//                     "hidden md:flex absolute -right-3 top-20 z-50",
//                     "h-6 w-6 items-center justify-center rounded-full",
//                     "border border-border bg-background shadow-md",
//                     "hover:bg-accent transition-colors",
//                     "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                 )}
//                 aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
//             >
//                 {collapsed ? (
//                     <ChevronRight className="h-4 w-4 text-foreground" />
//                 ) : (
//                     <ChevronLeft className="h-4 w-4 text-foreground" />
//                 )}
//             </button>
//
//             {/* Logo */}
//             <div className="flex h-14 sm:h-16 items-center justify-between border-b border-sidebar-border px-4">
//                 {!collapsed && (
//                     <div className="flex items-center gap-2">
//                         <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
//                             <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
//                         </div>
//                         <div className="flex flex-col">
//                             <span className="text-sm font-bold text-foreground">RutaOptima</span>
//                             <span className="text-[10px] text-muted-foreground">Logistics AI</span>
//                         </div>
//                     </div>
//                 )}
//
//                 {collapsed && (
//                     <div className="mx-auto flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
//                         <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
//                     </div>
//                 )}
//
//                 {/* Close button for mobile */}
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     className="md:hidden"
//                     onClick={onClose}
//                 >
//                     <X className="h-5 w-5" />
//                 </Button>
//             </div>
//
//             {/* Navigation */}
//             <nav className="flex-1 space-y-1 p-3 overflow-y-auto smooth-scroll">
//                 {menuItems.map((item, index) => (
//                     <NavLink
//                         key={item.url}
//                         to={item.url}
//                         onClick={onClose}
//                         className={cn(
//                             "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground touch-target",
//                             collapsed && "justify-center md:px-2"
//                         )}
//                         activeClassName="bg-sidebar-accent text-sidebar-primary"
//                         style={{
//                             animation: `fade-up 0.3s ease-out ${index * 0.05}s forwards`,
//                             opacity: 0
//                         }}
//                     >
//                         <item.icon className={cn("h-5 w-5 shrink-0", item.live && "text-success animate-pulse")} />
//
//                         {!collapsed && (
//                             <>
//                                 <span className="flex-1">{item.title}</span>
//                                 {item.badge && (
//                                     <Badge variant="secondary" className="bg-primary/20 text-primary text-[10px] px-1.5">
//                                         {item.badge}
//                                     </Badge>
//                                 )}
//                                 {item.count && (
//                                     <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] px-1.5">
//                                         {item.count}
//                                     </Badge>
//                                 )}
//                                 {item.live && (
//                                     <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                                 )}
//                             </>
//                         )}
//                     </NavLink>
//                 ))}
//             </nav>
//
//             {/* User Profile in Footer */}
//             <div className="border-t border-sidebar-border p-3">
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <button
//                             className={cn(
//                                 "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
//                                 "hover:bg-sidebar-accent transition-colors touch-target",
//                                 "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
//                                 collapsed && "justify-center px-2"
//                             )}
//                         >
//                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
//                                 {user?.name.charAt(0) || 'U'}
//                             </div>
//                             {!collapsed && (
//                                 <div className="flex-1 min-w-0 text-left">
//                                     <p className="text-sm font-medium truncate text-sidebar-foreground">
//                                         {user?.name || 'Usuario'}
//                                     </p>
//                                     <p className="text-xs text-muted-foreground truncate">
//                                         {user?.email || 'usuario@rutaoptima.com'}
//                                     </p>
//                                 </div>
//                             )}
//                         </button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent
//                         side="right"
//                         align="end"
//                         className="w-56 ml-2"
//                     >
//                         <DropdownMenuLabel>
//                             <div className="flex flex-col space-y-1">
//                                 <p className="text-sm font-medium leading-none">{user?.name || 'Usuario'}</p>
//                                 <p className="text-xs leading-none text-muted-foreground">
//                                     {user?.email || 'usuario@rutaoptima.com'}
//                                 </p>
//                                 <p className="text-xs leading-none text-muted-foreground capitalize">
//                                     {user?.role || 'admin'}
//                                 </p>
//                             </div>
//                         </DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem
//                             onClick={() => handleNavigation('/profile')}
//                             className="cursor-pointer"
//                         >
//                             <User className="mr-2 h-4 w-4" />
//                             <span>Mi Perfil</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                             onClick={() => handleNavigation('/settings')}
//                             className="cursor-pointer"
//                         >
//                             <Settings className="mr-2 h-4 w-4" />
//                             <span>Configuración</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                             onClick={() => handleNavigation('/settings')}
//                             className="cursor-pointer"
//                         >
//                             <Bell className="mr-2 h-4 w-4" />
//                             <span>Notificaciones</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem
//                             onClick={logout}
//                             className="cursor-pointer text-destructive focus:text-destructive"
//                         >
//                             <LogOut className="mr-2 h-4 w-4" />
//                             <span>Cerrar sesión</span>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div>
//         </aside>
//     )
// }




// src/components/layout/Sidebar.tsx
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
    X,
    Zap,
    ChevronLeft,
    ChevronRight,
    User,
    LogOut,
    Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { useNavigate } from "react-router-dom"

const menuItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Planificar Rutas", url: "/routes", icon: Route, badge: "IA" },
    { title: "Órdenes", url: "/orders", icon: Package, count: 24 },
    { title: "Flota", url: "/fleet", icon: Truck },
    { title: "Mapa en Vivo", url: "/live-map", icon: MapPin, live: true },
    { title: "Analíticas", url: "/analytics", icon: BarChart3 },
    { title: "Configuración", url: "/settings", icon: Settings },
]

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false)
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    const handleNavigation = (path: string) => {
        navigate(path)
        onClose?.()
    }

    return (
        <>
            {/* Mobile sidebar */}
            {isOpen && (
                <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar flex flex-col md:hidden">
                    {/* Logo */}
                    <div className="flex h-14 sm:h-16 items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
                                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">RutaOptima</span>
                                <span className="text-[10px] text-muted-foreground">Logistics AI</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-3 overflow-y-auto smooth-scroll">
                        {menuItems.map((item, index) => (
                            <NavLink
                                key={item.url}
                                to={item.url}
                                onClick={onClose}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                activeClassName="bg-sidebar-accent text-sidebar-primary"
                                style={{
                                    animation: `fade-up 0.3s ease-out ${index * 0.05}s forwards`,
                                    opacity: 0
                                }}
                            >
                                <item.icon className={cn("h-5 w-5 shrink-0", item.live && "text-success animate-pulse")} />
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
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Profile */}
                    <div className="p-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                        {user?.name.charAt(0) || 'U'}
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-sm font-medium truncate text-sidebar-foreground">{user?.name || 'Usuario'}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user?.email || 'usuario@rutaoptima.com'}</p>
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="end" className="w-56 ml-2">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name || 'Usuario'}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user?.email || 'usuario@rutaoptima.com'}</p>
                                        <p className="text-xs leading-none text-muted-foreground capitalize">{user?.role || 'admin'}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleNavigation('/profile')} className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Mi Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleNavigation('/settings')} className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Configuración</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleNavigation('/settings')} className="cursor-pointer">
                                    <Bell className="mr-2 h-4 w-4" />
                                    <span>Notificaciones</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </aside>
            )}

            {/* Desktop sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col bg-sidebar transition-all duration-300 relative",
                    collapsed ? "w-[72px]" : "w-64"
                )}
            >
                {/* Toggle Button - Flecha en el borde derecho */}
                <button
                    onClick={toggleCollapse}
                    className={cn(
                        "absolute -right-3 top-20 z-50",
                        "h-6 w-6 flex items-center justify-center rounded-full",
                        "border border-border bg-background shadow-md",
                        "hover:bg-accent transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    )}
                    aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4 text-foreground" />
                    ) : (
                        <ChevronLeft className="h-4 w-4 text-foreground" />
                    )}
                </button>

                {/* Logo */}
                <div className="flex h-14 sm:h-16 items-center justify-center px-4">
                    {!collapsed ? (
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
                                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">RutaOptima</span>
                                <span className="text-[10px] text-muted-foreground">Logistics AI</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
                            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-3 overflow-y-auto smooth-scroll">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={item.url}
                            to={item.url}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                collapsed && "justify-center px-2"
                            )}
                            activeClassName="bg-sidebar-accent text-sidebar-primary"
                            style={{
                                animation: `fade-up 0.3s ease-out ${index * 0.05}s forwards`,
                                opacity: 0
                            }}
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

                {/* User Profile in Footer */}
                <div className="p-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
                                    "hover:bg-sidebar-accent transition-colors",
                                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                    collapsed && "justify-center px-2"
                                )}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                    {user?.name.charAt(0) || 'U'}
                                </div>
                                {!collapsed && (
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-sm font-medium truncate text-sidebar-foreground">
                                            {user?.name || 'Usuario'}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {user?.email || 'usuario@rutaoptima.com'}
                                        </p>
                                    </div>
                                )}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="right"
                            align="end"
                            className="w-56 ml-2"
                        >
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.name || 'Usuario'}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email || 'usuario@rutaoptima.com'}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground capitalize">
                                        {user?.role || 'admin'}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => handleNavigation('/profile')}
                                className="cursor-pointer"
                            >
                                <User className="mr-2 h-4 w-4" />
                                <span>Mi Perfil</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleNavigation('/settings')}
                                className="cursor-pointer"
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Configuración</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleNavigation('/settings')}
                                className="cursor-pointer"
                            >
                                <Bell className="mr-2 h-4 w-4" />
                                <span>Notificaciones</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={logout}
                                className="cursor-pointer text-destructive focus:text-destructive"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Cerrar sesión</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </aside>
        </>
    )
}