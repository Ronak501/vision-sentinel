import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Users, AlertTriangle, Wifi, WifiOff, Battery } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-xs text-muted-foreground">+2 from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Streams</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">18</div>
            <p className="text-xs text-muted-foreground">6 devices offline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">2 high priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recognized Faces</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">147</div>
            <p className="text-xs text-muted-foreground">+12 today</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Recent Alerts</CardTitle>
          <CardDescription>Latest security alerts from your AR devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: "Unknown Person",
                location: "Main Entrance - Device AR-001",
                time: "2 minutes ago",
                severity: "high",
              },
              {
                id: 2,
                type: "Suspicious Activity",
                location: "Parking Lot - Device AR-007",
                time: "15 minutes ago",
                severity: "medium",
              },
              {
                id: 3,
                type: "Device Offline",
                location: "Security Office - Device AR-012",
                time: "1 hour ago",
                severity: "low",
              },
            ].map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle
                    className={`h-5 w-5 ${
                      alert.severity === "high"
                        ? "text-destructive"
                        : alert.severity === "medium"
                          ? "text-accent"
                          : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <p className="font-medium text-foreground">{alert.type}</p>
                    <p className="text-sm text-muted-foreground">{alert.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "secondary"
                    }
                  >
                    {alert.severity}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Device Status */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Device Status</CardTitle>
          <CardDescription>Current status of your AR surveillance devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "AR-001", name: "Main Entrance", status: "online", battery: 85 },
              { id: "AR-002", name: "Reception Area", status: "online", battery: 92 },
              { id: "AR-003", name: "Parking Lot", status: "offline", battery: 23 },
              { id: "AR-004", name: "Security Office", status: "online", battery: 67 },
              { id: "AR-005", name: "Emergency Exit", status: "online", battery: 78 },
              { id: "AR-006", name: "Server Room", status: "offline", battery: 12 },
            ].map((device) => (
              <div key={device.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {device.status === "online" ? (
                      <Wifi className="h-4 w-4 text-primary" />
                    ) : (
                      <WifiOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium text-foreground">{device.id}</span>
                  </div>
                  <Badge variant={device.status === "online" ? "default" : "secondary"}>{device.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{device.name}</p>
                <div className="flex items-center space-x-2">
                  <Battery
                    className={`h-4 w-4 ${
                      device.battery > 50 ? "text-primary" : device.battery > 20 ? "text-accent" : "text-destructive"
                    }`}
                  />
                  <span className="text-sm text-foreground">{device.battery}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
