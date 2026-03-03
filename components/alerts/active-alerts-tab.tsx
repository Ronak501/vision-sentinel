"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertTriangle, MoreHorizontal, CheckCircle, X, Eye, Clock, MapPin, User, Bell } from "lucide-react"

// Mock active alerts data
const mockActiveAlerts = [
  {
    id: 1,
    alertId: "ALT-001",
    type: "Unknown Person Detected",
    severity: "high",
    status: "active",
    description: "Unrecognized individual detected at main entrance attempting unauthorized access",
    location: "Main Entrance",
    device: "AR-001",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    assignedTo: "Security Team Alpha",
    notificationsSent: 3,
    escalated: true,
  },
  {
    id: 2,
    alertId: "ALT-002",
    type: "Suspicious Activity",
    severity: "medium",
    status: "investigating",
    description: "Individual loitering near emergency exits for extended period",
    location: "Emergency Exit B",
    device: "AR-005",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    assignedTo: "Security Team Beta",
    notificationsSent: 2,
    escalated: false,
  },
  {
    id: 3,
    alertId: "ALT-003",
    type: "Motion Detection",
    severity: "low",
    status: "active",
    description: "Motion detected in restricted area after hours",
    location: "Server Room",
    device: "AR-006",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    assignedTo: "Night Security",
    notificationsSent: 1,
    escalated: false,
  },
  {
    id: 4,
    alertId: "ALT-004",
    type: "Face Recognition Failure",
    severity: "medium",
    status: "active",
    description: "Multiple failed face recognition attempts at secure entrance",
    location: "Secure Entrance",
    device: "AR-007",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    assignedTo: "Security Team Alpha",
    notificationsSent: 2,
    escalated: false,
  },
]

interface ActiveAlertsTabProps {
  searchTerm: string
}

export function ActiveAlertsTab({ searchTerm }: ActiveAlertsTabProps) {
  const [alerts, setAlerts] = useState(mockActiveAlerts)

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.alertId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAlertAction = (alertId: number, action: string) => {
    switch (action) {
      case "acknowledge":
        setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "acknowledged" } : alert)))
        break
      case "resolve":
        setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
        break
      case "escalate":
        setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, escalated: true } : alert)))
        break
      case "dismiss":
        setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
        break
    }
  }

  const getSeverityColor = (severity: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-destructive"
      case "investigating":
        return "text-accent"
      case "acknowledged":
        return "text-primary"
      default:
        return "text-muted-foreground"
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
    <div className="space-y-4">
      {filteredAlerts.map((alert) => (
        <Card key={alert.id} className={alert.escalated ? "border-destructive" : ""}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-foreground">{alert.alertId}</h3>
                    {alert.escalated && (
                      <Badge variant="destructive" className="text-xs">
                        ESCALATED
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                <span className={`text-sm font-medium ${getStatusColor(alert.status)}`}>
                  {alert.status.toUpperCase()}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleAlertAction(alert.id, "acknowledge")}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Acknowledge
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAlertAction(alert.id, "escalate")}>
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Escalate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAlertAction(alert.id, "resolve")}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Resolve
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAlertAction(alert.id, "dismiss")}>
                      <X className="h-4 w-4 mr-2" />
                      Dismiss
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-foreground">{alert.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{alert.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{alert.device}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{alert.assignedTo}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(alert.timestamp)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Bell className="h-3 w-3" />
                  <span>{alert.notificationsSent} notifications sent</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleAlertAction(alert.id, "acknowledge")}>
                    Acknowledge
                  </Button>
                  <Button size="sm" onClick={() => handleAlertAction(alert.id, "resolve")}>
                    Resolve
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
