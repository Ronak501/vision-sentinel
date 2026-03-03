"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Eye, Clock, MapPin, X } from "lucide-react"

// Mock alert data
const mockAlerts = [
  {
    id: 1,
    type: "Unknown Person Detected",
    device: "AR-001",
    location: "Main Entrance",
    severity: "high",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    description: "Unrecognized individual detected at main entrance",
    isActive: true,
  },
  {
    id: 2,
    type: "Suspicious Activity",
    device: "AR-004",
    location: "Security Office",
    severity: "medium",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    description: "Unusual movement pattern detected",
    isActive: true,
  },
  {
    id: 3,
    type: "Face Recognition Match",
    device: "AR-002",
    location: "Reception Area",
    severity: "low",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    description: "Known individual: John Doe identified",
    isActive: false,
  },
  {
    id: 4,
    type: "Motion Detection",
    device: "AR-005",
    location: "Emergency Exit",
    severity: "medium",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    description: "Motion detected in restricted area",
    isActive: false,
  },
]

export function AlertPanel() {
  const [alerts, setAlerts] = useState(mockAlerts)

  const dismissAlert = (alertId: number) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, isActive: false } : alert)))
  }

  const activeAlerts = alerts.filter((alert) => alert.isActive)
  const recentAlerts = alerts.slice(0, 5)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-accent"
      case "low":
        return "text-primary"
      default:
        return "text-muted-foreground"
    }
  }

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <span>Live Alerts</span>
          {activeAlerts.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {activeAlerts.length}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Real-time security alerts and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  alert.isActive ? "border-border bg-card" : "border-muted bg-muted/50 opacity-75"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className={`h-4 w-4 ${getSeverityColor(alert.severity)}`} />
                      <span className="font-medium text-foreground text-sm">{alert.type}</span>
                      <Badge variant={getSeverityBadgeVariant(alert.severity)} className="text-xs">
                        {alert.severity}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>

                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{alert.device}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeAgo(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>

                  {alert.isActive && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 ml-2"
                      onClick={() => dismissAlert(alert.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
