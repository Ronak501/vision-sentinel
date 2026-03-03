"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VideoFeed } from "./video-feed"
import { AlertPanel } from "./alert-panel"
import { FaceRecognitionPanel } from "./face-recognition-panel"
import { Eye, Volume2, VolumeX, Grid3X3, Grid2X2, Square, AlertTriangle, Users, Shield } from "lucide-react"

// Mock video feed data
const mockVideoFeeds = [
  {
    id: "AR-001",
    name: "Main Entrance",
    location: "Building A - Entrance",
    status: "online",
    isRecording: true,
    hasAudio: true,
    threatLevel: "low",
    lastActivity: "2 minutes ago",
  },
  {
    id: "AR-002",
    name: "Reception Area",
    location: "Building A - Lobby",
    status: "online",
    isRecording: true,
    hasAudio: false,
    threatLevel: "none",
    lastActivity: "5 minutes ago",
  },
  {
    id: "AR-004",
    name: "Security Office",
    location: "Building B - Security",
    status: "online",
    isRecording: true,
    hasAudio: true,
    threatLevel: "medium",
    lastActivity: "30 seconds ago",
  },
  {
    id: "AR-005",
    name: "Emergency Exit",
    location: "Building A - Emergency",
    status: "online",
    isRecording: false,
    hasAudio: false,
    threatLevel: "none",
    lastActivity: "10 minutes ago",
  },
]

export function LiveMonitoring() {
  const [selectedLayout, setSelectedLayout] = useState("grid-4")
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const activeFeeds = mockVideoFeeds.filter((feed) => feed.status === "online")
  const threatFeeds = mockVideoFeeds.filter((feed) => feed.threatLevel !== "none")

  const getLayoutClass = () => {
    switch (selectedLayout) {
      case "grid-1":
        return "grid-cols-1"
      case "grid-4":
        return "grid-cols-2"
      case "grid-9":
        return "grid-cols-3"
      default:
        return "grid-cols-2"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Live Monitoring</h1>
          <p className="text-muted-foreground">Real-time surveillance feeds • {currentTime.toLocaleTimeString()}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedLayout} onValueChange={setSelectedLayout}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid-1">
                <div className="flex items-center space-x-2">
                  <Square className="h-4 w-4" />
                  <span>Single</span>
                </div>
              </SelectItem>
              <SelectItem value="grid-4">
                <div className="flex items-center space-x-2">
                  <Grid2X2 className="h-4 w-4" />
                  <span>2x2 Grid</span>
                </div>
              </SelectItem>
              <SelectItem value="grid-9">
                <div className="flex items-center space-x-2">
                  <Grid3X3 className="h-4 w-4" />
                  <span>3x3 Grid</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => setAudioEnabled(!audioEnabled)}>
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Feeds</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeFeeds.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threat Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{threatFeeds.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faces Detected</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">23</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recording</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockVideoFeeds.filter((f) => f.isRecording).length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Video Feeds */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Live Video Feeds</CardTitle>
              <CardDescription>Real-time surveillance from AR devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`grid gap-4 ${getLayoutClass()}`}>
                {activeFeeds
                  .slice(0, selectedLayout === "grid-1" ? 1 : selectedLayout === "grid-4" ? 4 : 9)
                  .map((feed) => (
                    <VideoFeed
                      key={feed.id}
                      feed={feed}
                      isSelected={selectedFeed === feed.id}
                      onSelect={() => setSelectedFeed(feed.id)}
                      audioEnabled={audioEnabled}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Alert Panel */}
          <AlertPanel />

          {/* Face Recognition Panel */}
          <FaceRecognitionPanel />
        </div>
      </div>
    </div>
  )
}
