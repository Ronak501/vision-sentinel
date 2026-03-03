"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DeviceSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  device: any
  onDeviceUpdated: (device: any) => void
}

export function DeviceSettingsDialog({ open, onOpenChange, device, onDeviceUpdated }: DeviceSettingsDialogProps) {
  const [settings, setSettings] = useState({
    name: device.name,
    location: device.location,
    recordingEnabled: true,
    motionDetection: true,
    faceRecognition: true,
    alertThreshold: [75],
    videoQuality: "high",
    nightVision: true,
    audioRecording: false,
    streamingEnabled: true,
  })

  const handleSave = () => {
    const updatedDevice = {
      ...device,
      name: settings.name,
      location: settings.location,
    }
    onDeviceUpdated(updatedDevice)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">Device Settings - {device.id}</DialogTitle>
          <DialogDescription>Configure settings and parameters for this AR surveillance device</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="recording">Recording</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Device Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deviceName">Device Name</Label>
                    <Input
                      id="deviceName"
                      value={settings.name}
                      onChange={(e) => setSettings((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deviceLocation">Location</Label>
                    <Input
                      id="deviceLocation"
                      value={settings.location}
                      onChange={(e) => setSettings((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input value={device.model} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Firmware</Label>
                    <Input value={device.firmware} disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>IP Address</Label>
                  <Input value={device.ipAddress} disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recording" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recording Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Video Recording</Label>
                    <p className="text-sm text-muted-foreground">Enable continuous video recording</p>
                  </div>
                  <Switch
                    checked={settings.recordingEnabled}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, recordingEnabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Live Streaming</Label>
                    <p className="text-sm text-muted-foreground">Enable real-time video streaming</p>
                  </div>
                  <Switch
                    checked={settings.streamingEnabled}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, streamingEnabled: checked }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Video Quality</Label>
                  <Select
                    value={settings.videoQuality}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, videoQuality: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (720p)</SelectItem>
                      <SelectItem value="medium">Medium (1080p)</SelectItem>
                      <SelectItem value="high">High (4K)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Night Vision</Label>
                    <p className="text-sm text-muted-foreground">Enable infrared night vision</p>
                  </div>
                  <Switch
                    checked={settings.nightVision}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, nightVision: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audio Recording</Label>
                    <p className="text-sm text-muted-foreground">Record audio along with video</p>
                  </div>
                  <Switch
                    checked={settings.audioRecording}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, audioRecording: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Alert Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Motion Detection</Label>
                    <p className="text-sm text-muted-foreground">Detect movement in camera view</p>
                  </div>
                  <Switch
                    checked={settings.motionDetection}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, motionDetection: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Face Recognition</Label>
                    <p className="text-sm text-muted-foreground">Identify known and unknown faces</p>
                  </div>
                  <Switch
                    checked={settings.faceRecognition}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, faceRecognition: checked }))}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Alert Sensitivity: {settings.alertThreshold[0]}%</Label>
                  <Slider
                    value={settings.alertThreshold}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, alertThreshold: value }))}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Higher values reduce false alerts but may miss subtle threats
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="font-heading font-semibold">
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
