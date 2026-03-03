"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, UserCheck, UserX } from "lucide-react"

// Mock face recognition data
const mockFaceDetections = [
  {
    id: 1,
    name: "John Doe",
    status: "known",
    confidence: 98,
    device: "AR-001",
    location: "Main Entrance",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    lastSeen: "2 minutes ago",
  },
  {
    id: 2,
    name: "Unknown Person #1",
    status: "unknown",
    confidence: 85,
    device: "AR-004",
    location: "Security Office",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    lastSeen: "15 minutes ago",
  },
  {
    id: 3,
    name: "Sarah Wilson",
    status: "known",
    confidence: 95,
    device: "AR-002",
    location: "Reception Area",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    lastSeen: "30 minutes ago",
  },
  {
    id: 4,
    name: "Unknown Person #2",
    status: "unknown",
    confidence: 78,
    device: "AR-005",
    location: "Emergency Exit",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    lastSeen: "45 minutes ago",
  },
  {
    id: 5,
    name: "Mike Johnson",
    status: "known",
    confidence: 92,
    device: "AR-001",
    location: "Main Entrance",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    lastSeen: "1 hour ago",
  },
]

export function FaceRecognitionPanel() {
  const knownFaces = mockFaceDetections.filter((face) => face.status === "known")
  const unknownFaces = mockFaceDetections.filter((face) => face.status === "unknown")

  const getStatusIcon = (status: string) => {
    return status === "known" ? (
      <UserCheck className="h-4 w-4 text-primary" />
    ) : (
      <UserX className="h-4 w-4 text-destructive" />
    )
  }

  const getStatusBadge = (status: string) => {
    return status === "known" ? (
      <Badge variant="default" className="text-xs">
        Known
      </Badge>
    ) : (
      <Badge variant="destructive" className="text-xs">
        Unknown
      </Badge>
    )
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-primary"
    if (confidence >= 70) return "text-accent"
    return "text-destructive"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <span>Face Recognition</span>
        </CardTitle>
        <CardDescription>Recent face detections and identifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-primary/10 rounded-lg">
              <div className="text-lg font-bold text-primary">{knownFaces.length}</div>
              <div className="text-xs text-muted-foreground">Known</div>
            </div>
            <div className="text-center p-2 bg-destructive/10 rounded-lg">
              <div className="text-lg font-bold text-destructive">{unknownFaces.length}</div>
              <div className="text-xs text-muted-foreground">Unknown</div>
            </div>
          </div>

          {/* Recent Detections */}
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {mockFaceDetections.map((detection) => (
                <div key={detection.id} className="p-3 rounded-lg border border-border bg-card">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(detection.status)}
                      <span className="font-medium text-foreground text-sm">{detection.name}</span>
                    </div>
                    {getStatusBadge(detection.status)}
                  </div>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Confidence:</span>
                      <span className={getConfidenceColor(detection.confidence)}>{detection.confidence}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Device:</span>
                      <span>{detection.device}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Location:</span>
                      <span>{detection.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Seen:</span>
                      <span>{detection.lastSeen}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
