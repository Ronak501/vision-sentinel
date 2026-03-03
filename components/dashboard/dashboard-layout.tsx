"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Monitor, Users, Database, AlertTriangle, BarChart3, Settings, Menu, LogOut, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Monitor, current: false },
  { name: "Live Monitoring", href: "/dashboard/monitoring", icon: Eye, current: false },
  { name: "Device Management", href: "/dashboard/devices", icon: Shield, current: false },
  { name: "User Management", href: "/dashboard/users", icon: Users, current: false },
  { name: "Face Database", href: "/dashboard/faces", icon: Database, current: false },
  { name: "Alerts", href: "/dashboard/alerts", icon: AlertTriangle, current: false },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, current: false },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, current: false },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/dashboard"
  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: currentPath === item.href,
  }))

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border">
          <SidebarContent navigation={updatedNavigation} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar border-r border-sidebar-border px-6 py-4">
          <SidebarContent navigation={updatedNavigation} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="font-heading text-xl font-semibold text-foreground">Vision Sentinel Dashboard</h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ navigation }: { navigation: typeof navigation }) {
  return (
    <>
      <div className="flex h-16 shrink-0 items-center">
        <Shield className="h-8 w-8 text-sidebar-primary mr-3" />
        <span className="font-heading text-xl font-bold text-sidebar-foreground">Vision Sentinel</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      item.current
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6",
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  )
}
