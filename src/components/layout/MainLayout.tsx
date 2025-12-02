// // src/components/layout/MainLayout.tsx
// import type {ReactNode} from "react"
// import { Sidebar } from "./Sidebar"
// import { Header } from "./Header"
//
// interface MainLayoutProps {
//     children: ReactNode
// }
//
// export function MainLayout({ children }: MainLayoutProps) {
//     return (
//         <div className="min-h-screen bg-background">
//             <Sidebar />
//             <div className="pl-64 transition-all duration-300">
//                 <Header />
//                 <main className="p-6">{children}</main>
//             </div>
//         </div>
//     )
// }

// // src/components/layout/MainLayout.tsx
// import type {ReactNode} from "react"
// import { useState } from "react"
// import { Sidebar } from "./Sidebar"
// import { Header } from "./Header"
//
// interface MainLayoutProps {
//     children: ReactNode
// }
//
// export function MainLayout({ children }: MainLayoutProps) {
//     const [sidebarOpen, setSidebarOpen] = useState(false)
//
//     return (
//         <div className="min-h-screen bg-background flex">
//             {/* Mobile sidebar overlay */}
//             {sidebarOpen && (
//                 <div
//                     className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
//                     onClick={() => setSidebarOpen(false)}
//                 />
//             )}
//
//             {/* Sidebar */}
//             <Sidebar
//                 isOpen={sidebarOpen}
//                 onClose={() => setSidebarOpen(false)}
//             />
//
//             {/* Main Content */}
//             <div className="flex-1 flex flex-col min-w-0">
//                 <Header onMenuClick={() => setSidebarOpen(true)} />
//                 <main className="p-4 sm:p-6 flex-1 overflow-auto bg-muted/20 smooth-scroll">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     )
// }

// // src/components/layout/MainLayout.tsx
// import type {ReactNode} from "react"
// import { useState } from "react"
// import { Sidebar } from "./Sidebar"
// import { Header } from "./Header"
//
// interface MainLayoutProps {
//     children: ReactNode
// }
//
// export function MainLayout({ children }: MainLayoutProps) {
//     const [sidebarOpen, setSidebarOpen] = useState(false)
//
//     return (
//         <div className="min-h-screen bg-background flex">
//             {/* Mobile sidebar overlay */}
//             {sidebarOpen && (
//                 <div
//                     className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
//                     onClick={() => setSidebarOpen(false)}
//                 />
//             )}
//
//             {/* Sidebar */}
//             <Sidebar
//                 isOpen={sidebarOpen}
//                 onClose={() => setSidebarOpen(false)}
//             />
//
//             {/* Main Content - No necesitamos margen fijo, el sidebar se encarga */}
//             <div className="flex-1 flex flex-col min-w-0">
//                 <Header onMenuClick={() => setSidebarOpen(true)} />
//                 <main className="p-4 sm:p-6 flex-1 overflow-auto bg-muted/20 smooth-scroll">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     )
// }


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