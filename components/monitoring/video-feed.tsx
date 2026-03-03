"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Maximize2, AlertTriangle, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoFeedProps {
  feed: {
    id: string
    name: string
    location: string
    status: string
    isRecording: boolean
    hasAudio: boolean
    threatLevel: string
    lastActivity: string
  }
  isSelected: boolean
  onSelect: () => void
  audioEnabled: boolean
}

export function VideoFeed({ feed, isSelected, onSelect, audioEnabled }: VideoFeedProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [showOverlay, setShowOverlay] = useState(true)

  const getThreatColor = (level: string) => {
    switch (level) {
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

  const getThreatBadgeVariant = (level: string) => {
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

  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-200",
        isSelected ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-border",
      )}
      onClick={onSelect}
    >
      <CardContent className="p-0">
        {/* Video Container */}
        <div className="relative aspect-video bg-muted">
          {/* Simulated video feed with placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20">
            <img
              src={`/security-camera-feed.png?height=240&width=320&query=security camera feed ${feed.name}`}
              alt={`${feed.name} video feed`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Face Recognition Overlays */}
          {showOverlay && (
            <>
              {/* Known person overlay */}
              <div className="absolute top-4 left-4 border-2 border-primary rounded-lg p-1">
                <div className="w-16 h-20 bg-primary/20 rounded flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -bottom-6 left-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  John Doe
                </div>
              </div>

              {/* Unknown person overlay (if threat level > none) */}
              {feed.threatLevel !== "none" && (
                <div className="absolute top-4 right-4 border-2 border-destructive rounded-lg p-1">
                  <div className="w-16 h-20 bg-destructive/20 rounded flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <div className="absolute -bottom-6 right-0 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                    Unknown
                  </div>
                </div>
              )}
            </>
          )}

          {/* Status Overlay */}
          <div className="absolute top-2 left-2 flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
              <div
                className={cn("w-2 h-2 rounded-full", feed.status === "online" ? "bg-primary" : "bg-muted-foreground")}
              />
              <span className="text-xs font-medium text-foreground">LIVE</span>
            </div>
            {feed.isRecording && (
              <div className="bg-destructive/80 backdrop-blur-sm rounded px-2 py-1">
                <span className="text-xs font-medium text-destructive-foreground">REC</span>
              </div>
            )}
          </div>

          {/* Threat Level Badge */}
          {feed.threatLevel !== "none" && (
            <div className="absolute top-2 right-2">
              <Badge variant={getThreatBadgeVariant(feed.threatLevel)} className="text-xs">
                {feed.threatLevel.toUpperCase()}
              </Badge>
            </div>
          )}

          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground text-sm">{feed.name}</h3>
                <p className="text-xs text-muted-foreground">{feed.id}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsPlaying(!isPlaying)
                  }}
                >
                  {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>
                {feed.hasAudio && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    {audioEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
