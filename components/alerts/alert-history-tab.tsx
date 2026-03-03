"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"

// Mock alert history data
const mockAlertHistory = [
  {
    id: 1,
    alertId: "ALT-098",
    type: "Unknown Person Detected",
    severity: "high",
    status: "resolved",
    location: "Main Entrance",
    device: "AR-001",
    createdAt: new Date("2024-02-15T10:30:00Z"),
    resolvedAt: new Date("2024-02-15T10:45:00Z"),
    assignedTo: "Security Team Alpha",
    responseTime: "15 minutes",
  },
  {
    id: 2,
    alertId: "ALT-097",
    type: "Suspicious Activity",
    severity: "medium",
    status: "dismissed",
    location: "Parking Lot",
    device: "AR-003",
    createdAt: new Date("2024-02-15T09:15:00Z"),
    resolvedAt: new Date("2024-02-15T09:30:00Z"),
    assignedTo: "Security Team Beta",
    responseTime: "15 minutes",
  },
  {
    id: 3,
    alertId: "ALT-096",
    type: "Motion Detection",
    severity: "low",
    status: "resolved",
    location: "Conference Room",
    device: "AR-008",
    createdAt: new Date("2024-02-14T16:45:00Z"),
    resolvedAt: new Date("2024-02-14T17:00:00Z"),
    assignedTo: "Night Security",
    responseTime: "15 minutes",
  },
  {
    id: 4,
    alertId: "ALT-095",
    type: "Face Recognition Failure",
    severity: "medium",
    status: "resolved",
    location: "Secure Entrance",
    device: "AR-007",
    createdAt: new Date("2024-02-14T14:20:00Z"),
    resolvedAt: new Date("2024-02-14T14:35:00Z"),
    assignedTo: "Security Team Alpha",
    responseTime: "15 minutes",
  },
  {
    id: 5,
    alertId: "ALT-094",
    type: "Tailgating",
    severity: "high",
    status: "resolved",
    location: "Main Entrance",
    device: "AR-001",
    createdAt: new Date("2024-02-13T11:10:00Z"),
    resolvedAt: new Date("2024-02-13T11:25:00Z"),
    assignedTo: "Security Team Alpha",
    responseTime: "15 minutes",
  },
]

interface AlertHistoryTabProps {
  searchTerm: string
}

export function AlertHistoryTab({ searchTerm }: AlertHistoryTabProps) {
  const [alerts] = useState(mockAlertHistory)
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.alertId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter

    return matchesSearch && matchesSeverity && matchesStatus
  })

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
      case "resolved":
        return "default"
      case "dismissed":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Severity:</label>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Status:</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Date Range:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-48 justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Alert History ({filteredAlerts.length} alerts)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Resolved</TableHead>
                <TableHead>Response Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.alertId}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(alert.status)}>{alert.status}</Badge>
                  </TableCell>
                  <TableCell>{alert.location}</TableCell>
                  <TableCell>{format(alert.createdAt, "MMM dd, HH:mm")}</TableCell>
                  <TableCell>{alert.resolvedAt ? format(alert.resolvedAt, "MMM dd, HH:mm") : "-"}</TableCell>
                  <TableCell>{alert.responseTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
