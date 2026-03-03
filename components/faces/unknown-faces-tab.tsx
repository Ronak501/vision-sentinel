"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, X, AlertTriangle, Eye, Calendar, MapPin } from "lucide-react"

// Mock unknown faces data
const mockUnknownFaces = [
  {
    id: 1,
    detectionId: "UNK-001",
    firstSeen: "2024-02-15T10:30:00Z",
    lastSeen: "2024-02-15T14:20:00Z",
    location: "Main Entrance",
    device: "AR-001",
    detectionCount: 3,
    confidence: 85,
    threatLevel: "medium",
    status: "pending",
    notes: "Individual appeared multiple times at restricted area",
  },
  {
    id: 2,
    detectionId: "UNK-002",
    firstSeen: "2024-02-14T16:45:00Z",
    lastSeen: "2024-02-14T16:45:00Z",
    location: "Parking Lot",
    device: "AR-003",
    detectionCount: 1,
    confidence: 78,
    threatLevel: "low",
    status: "pending",
    notes: "Single detection, possible visitor",
  },
  {
    id: 3,
    detectionId: "UNK-003",
    firstSeen: "2024-02-13T09:15:00Z",
    lastSeen: "2024-02-15T11:30:00Z",
    location: "Emergency Exit",
    device: "AR-005",
    detectionCount: 5,
    confidence: 92,
    threatLevel: "high",
    status: "flagged",
    notes: "Suspicious behavior near emergency exits",
  },
  {
    id: 4,
    detectionId: "UNK-004",
    firstSeen: "2024-02-15T08:00:00Z",
    lastSeen: "2024-02-15T08:00:00Z",
    location: "Reception Area",
    device: "AR-002",
    detectionCount: 1,
    confidence: 88,
    threatLevel: "low",
    status: "pending",
    notes: "Possible new employee or visitor",
  },
]

interface UnknownFacesTabProps {
  searchTerm: string
}

export function UnknownFacesTab({ searchTerm }: UnknownFacesTabProps) {
  const [unknownFaces, setUnknownFaces] = useState(mockUnknownFaces)

  const filteredFaces = unknownFaces.filter(
    (face) =>
      face.detectionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      face.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      face.notes.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddToDB = (faceId: number) => {
    // This would open a dialog to add the person to known faces
    console.log(`Add unknown face ${faceId} to database`)
  }

  const handleDismiss = (faceId: number) => {
    setUnknownFaces((prev) => prev.filter((f) => f.id !== faceId))
  }

  const getThreatColor = (level: string) => {
    switch (level) {
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
      case "flagged":
        return "text-destructive"
      case "pending":
        return "text-accent"
      default:
        return "text-muted-foreground"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredFaces.map((face) => (
        <Card key={face.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/placeholder.svg?height=48&width=48&query=unknown person silhouette`} />
                  <AvatarFallback>
                    <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-foreground">{face.detectionId}</h3>
                  <p className="text-sm text-muted-foreground">Unknown Individual</p>
                </div>
              </div>
              <Badge variant={getThreatColor(face.threatLevel)}>{face.threatLevel}</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getStatusColor(face.status)}`}>
                  {face.status.toUpperCase()}
                </span>
                <span className="text-sm text-muted-foreground">
                  {face.detectionCount} detection{face.detectionCount !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>
                    {face.location} ({face.device})
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>First: {formatDate(face.firstSeen)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>Last: {formatDate(face.lastSeen)}</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground bg-muted p-2 rounded">{face.notes}</div>

              <div className="pt-2 border-t border-border">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Confidence: {face.confidence}%</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1" onClick={() => handleAddToDB(face.id)}>
                    <UserPlus className="h-3 w-3 mr-1" />
                    Add to DB
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDismiss(face.id)}>
                    <X className="h-3 w-3" />
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
