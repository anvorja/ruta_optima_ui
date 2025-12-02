// src/components/layout/MainLayout.tsx
import type {ReactNode} from "react"
import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

interface MainLayoutProps {
    children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="h-screen flex overflow-hidden bg-background">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Fijo, sin scroll propio del layout */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content Area - Con scroll independiente */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header - Sticky dentro del contenedor */}
                <Header onMenuClick={() => setSidebarOpen(true)} />

                {/* Main Content - Scrollable */}
                <main className="flex-1 overflow-y-auto smooth-scroll bg-muted/20">
                    <div className="p-4 sm:p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}