"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Wifi, WifiOff, Battery, Settings, Trash2, Power, RefreshCw } from "lucide-react"
import { AddDeviceDialog } from "./add-device-dialog"
import { DeviceSettingsDialog } from "./device-settings-dialog"

// Mock device data
const mockDevices = [
  {
    id: "AR-001",
    name: "Main Entrance",
    location: "Building A - Entrance",
    status: "online",
    battery: 85,
    lastSeen: "2 minutes ago",
    firmware: "v2.1.3",
    ipAddress: "192.168.1.101",
    model: "VisionSentinel Pro",
  },
  {
    id: "AR-002",
    name: "Reception Area",
    location: "Building A - Lobby",
    status: "online",
    battery: 92,
    lastSeen: "1 minute ago",
    firmware: "v2.1.3",
    ipAddress: "192.168.1.102",
    model: "VisionSentinel Pro",
  },
  {
    id: "AR-003",
    name: "Parking Lot",
    location: "Outdoor - North Lot",
    status: "offline",
    battery: 23,
    lastSeen: "2 hours ago",
    firmware: "v2.1.2",
    ipAddress: "192.168.1.103",
    model: "VisionSentinel Outdoor",
  },
  {
    id: "AR-004",
    name: "Security Office",
    location: "Building B - Security",
    status: "online",
    battery: 67,
    lastSeen: "30 seconds ago",
    firmware: "v2.1.3",
    ipAddress: "192.168.1.104",
    model: "VisionSentinel Pro",
  },
  {
    id: "AR-005",
    name: "Emergency Exit",
    location: "Building A - Emergency",
    status: "online",
    battery: 78,
    lastSeen: "5 minutes ago",
    firmware: "v2.1.3",
    ipAddress: "192.168.1.105",
    model: "VisionSentinel Lite",
  },
  {
    id: "AR-006",
    name: "Server Room",
    location: "Building B - IT",
    status: "offline",
    battery: 12,
    lastSeen: "4 hours ago",
    firmware: "v2.1.1",
    ipAddress: "192.168.1.106",
    model: "VisionSentinel Pro",
  },
]

export function DeviceManagement() {
  const [devices, setDevices] = useState(mockDevices)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDevice, setSelectedDevice] = useState<(typeof mockDevices)[0] | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const onlineDevices = devices.filter((d) => d.status === "online").length
  const offlineDevices = devices.filter((d) => d.status === "offline").length
  const lowBatteryDevices = devices.filter((d) => d.battery < 30).length

  const handleDeviceAction = (device: (typeof mockDevices)[0], action: string) => {
    switch (action) {
      case "settings":
        setSelectedDevice(device)
        setShowSettingsDialog(true)
        break
      case "restart":
        // Simulate restart
        console.log(`Restarting device ${device.id}`)
        break
      case "delete":
        setDevices((prev) => prev.filter((d) => d.id !== device.id))
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Device Management</h1>
          <p className="text-muted-foreground">Manage and monitor your AR surveillance devices</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="font-heading font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{devices.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online</CardTitle>
            <Wifi className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{onlineDevices}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline</CardTitle>
            <WifiOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{offlineDevices}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Battery</CardTitle>
            <Battery className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{lowBatteryDevices}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search devices by name, ID, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Firmware</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{device.id}</div>
                      <div className="text-sm text-muted-foreground">{device.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{device.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {device.status === "online" ? (
                        <Wifi className="h-4 w-4 text-primary" />
                      ) : (
                        <WifiOff className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Badge variant={device.status === "online" ? "default" : "secondary"}>{device.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Battery
                        className={`h-4 w-4 ${
                          device.battery > 50
                            ? "text-primary"
                            : device.battery > 20
                              ? "text-accent"
                              : "text-destructive"
                        }`}
                      />
                      <span className="text-foreground">{device.battery}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{device.lastSeen}</TableCell>
                  <TableCell className="text-muted-foreground">{device.firmware}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDeviceAction(device, "settings")}>
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeviceAction(device, "restart")}>
                          <Power className="h-4 w-4 mr-2" />
                          Restart
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeviceAction(device, "delete")}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddDeviceDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onDeviceAdded={(device) => {
          setDevices((prev) => [...prev, device])
          setShowAddDialog(false)
        }}
      />

      {selectedDevice && (
        <DeviceSettingsDialog
          open={showSettingsDialog}
          onOpenChange={setShowSettingsDialog}
          device={selectedDevice}
          onDeviceUpdated={(updatedDevice) => {
            setDevices((prev) => prev.map((d) => (d.id === updatedDevice.id ? updatedDevice : d)))
            setShowSettingsDialog(false)
          }}
        />
      )}
    </div>
  )
}
