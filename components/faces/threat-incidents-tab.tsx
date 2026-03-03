"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Archive, AlertTriangle, Calendar, MapPin, User } from "lucide-react"

// Mock threat incidents data
const mockThreatIncidents = [
  {
    id: 1,
    incidentId: "INC-001",
    type: "Unauthorized Access",
    severity: "high",
    status: "active",
    description: "Unknown individual attempted to access restricted area multiple times",
    location: "Server Room",
    device: "AR-006",
    detectedAt: "2024-02-15T14:30:00Z",
    resolvedAt: null,
    assignedTo: "Security Team Alpha",
    evidence: ["Face detection", "Motion tracking", "Access logs"],
    actionsTaken: ["Security notified", "Area secured"],
  },
  {
    id: 2,
    incidentId: "INC-002",
    type: "Suspicious Behavior",
    severity: "medium",
    status: "investigating",
    description: "Individual loitering near emergency exits for extended period",
    location: "Emergency Exit B",
    device: "AR-005",
    detectedAt: "2024-02-14T16:45:00Z",
    resolvedAt: null,
    assignedTo: "Security Team Beta",
    evidence: ["Face detection", "Behavioral analysis"],
    actionsTaken: ["Investigation initiated", "Additional monitoring"],
  },
  {
    id: 3,
    incidentId: "INC-003",
    type: "Tailgating",
    severity: "medium",
    status: "resolved",
    description: "Unauthorized individual followed employee through secure entrance",
    location: "Main Entrance",
    device: "AR-001",
    detectedAt: "2024-02-13T09:15:00Z",
    resolvedAt: "2024-02-13T10:30:00Z",
    assignedTo: "Security Team Alpha",
    evidence: ["Face detection", "Access card logs", "Video footage"],
    actionsTaken: ["Individual identified", "Access revoked", "Policy reminder sent"],
  },
  {
    id: 4,
    incidentId: "INC-004",
    type: "Unrecognized Vehicle",
    severity: "low",
    status: "resolved",
    description: "Unknown vehicle parked in restricted parking area",
    location: "Parking Lot C",
    device: "AR-003",
    detectedAt: "2024-02-12T11:20:00Z",
    resolvedAt: "2024-02-12T12:00:00Z",
    assignedTo: "Security Team Beta",
    evidence: ["License plate recognition", "Parking violation"],
    actionsTaken: ["Vehicle towed", "Owner contacted"],
  },
]

interface ThreatIncidentsTabProps {
  searchTerm: string
}

export function ThreatIncidentsTab({ searchTerm }: ThreatIncidentsTabProps) {
  const [incidents, setIncidents] = useState(mockThreatIncidents)

  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.incidentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAction = (incidentId: number, action: string) => {
    switch (action) {
      case "view":
        console.log(`View incident ${incidentId}`)
        break
      case "archive":
        setIncidents((prev) => prev.filter((i) => i.id !== incidentId))
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
      case "resolved":
        return "text-primary"
      default:
        return "text-muted-foreground"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="space-y-4">
      {filteredIncidents.map((incident) => (
        <Card key={incident.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{incident.incidentId}</h3>
                  <p className="text-sm text-muted-foreground">{incident.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                <span className={`text-sm font-medium ${getStatusColor(incident.status)}`}>
                  {incident.status.toUpperCase()}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleAction(incident.id, "view")}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction(incident.id, "archive")}>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-foreground">{incident.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{incident.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{incident.device}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{incident.assignedTo}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(incident.detectedAt)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Evidence</h4>
                  <div className="flex flex-wrap gap-1">
                    {incident.evidence.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Actions Taken</h4>
                  <div className="flex flex-wrap gap-1">
                    {incident.actionsTaken.map((action, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {incident.resolvedAt && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">Resolved: {formatDate(incident.resolvedAt)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
