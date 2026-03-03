"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, Calendar, MapPin } from "lucide-react"

// Mock known faces data
const mockKnownFaces = [
  {
    id: 1,
    name: "John Doe",
    role: "Employee",
    department: "Security",
    employeeId: "EMP-001",
    lastSeen: "2 hours ago",
    location: "Main Entrance",
    confidence: 98,
    detectionCount: 45,
    addedDate: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    role: "Manager",
    department: "Operations",
    employeeId: "EMP-002",
    lastSeen: "1 day ago",
    location: "Reception Area",
    confidence: 95,
    detectionCount: 32,
    addedDate: "2024-01-10",
    status: "active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Visitor",
    department: "External",
    employeeId: "VIS-003",
    lastSeen: "3 days ago",
    location: "Conference Room",
    confidence: 92,
    detectionCount: 8,
    addedDate: "2024-02-01",
    status: "inactive",
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "Employee",
    department: "IT",
    employeeId: "EMP-004",
    lastSeen: "5 minutes ago",
    location: "Server Room",
    confidence: 97,
    detectionCount: 67,
    addedDate: "2024-01-05",
    status: "active",
  },
  {
    id: 5,
    name: "David Brown",
    role: "Contractor",
    department: "Maintenance",
    employeeId: "CON-005",
    lastSeen: "1 week ago",
    location: "Parking Lot",
    confidence: 89,
    detectionCount: 15,
    addedDate: "2024-01-20",
    status: "inactive",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    role: "Employee",
    department: "HR",
    employeeId: "EMP-006",
    lastSeen: "30 minutes ago",
    location: "Office Building",
    confidence: 96,
    detectionCount: 28,
    addedDate: "2024-01-12",
    status: "active",
  },
]

interface KnownFacesTabProps {
  searchTerm: string
}

export function KnownFacesTab({ searchTerm }: KnownFacesTabProps) {
  const [faces, setFaces] = useState(mockKnownFaces)

  const filteredFaces = faces.filter(
    (face) =>
      face.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      face.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      face.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAction = (faceId: number, action: string) => {
    switch (action) {
      case "edit":
        console.log(`Edit face ${faceId}`)
        break
      case "delete":
        setFaces((prev) => prev.filter((f) => f.id !== faceId))
        break
      case "view":
        console.log(`View face ${faceId}`)
        break
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Employee":
        return "default"
      case "Manager":
        return "secondary"
      case "Visitor":
        return "outline"
      case "Contractor":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "text-primary" : "text-muted-foreground"
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredFaces.map((face) => (
        <Card key={face.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/abstract-portrait.png?height=48&width=48&query=portrait of ${face.name}`} />
                  <AvatarFallback>
                    {face.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-foreground">{face.name}</h3>
                  <p className="text-sm text-muted-foreground">{face.employeeId}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleAction(face.id, "view")}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction(face.id, "edit")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction(face.id, "delete")} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant={getRoleColor(face.role)}>{face.role}</Badge>
                <span className={`text-sm font-medium ${getStatusColor(face.status)}`}>{face.status}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                <div className="flex items-center space-x-1 mb-1">
                  <span>Department:</span>
                  <span className="text-foreground">{face.department}</span>
                </div>
                <div className="flex items-center space-x-1 mb-1">
                  <MapPin className="h-3 w-3" />
                  <span>Last seen: {face.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{face.lastSeen}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Detections: {face.detectionCount}</span>
                  <span>Confidence: {face.confidence}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
