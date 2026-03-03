"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Mock data for device performance
const deviceUptimeData = [
  { date: "2024-02-08", uptime: 99.1 },
  { date: "2024-02-09", uptime: 98.8 },
  { date: "2024-02-10", uptime: 99.5 },
  { date: "2024-02-11", uptime: 99.2 },
  { date: "2024-02-12", uptime: 98.9 },
  { date: "2024-02-13", uptime: 99.7 },
  { date: "2024-02-14", uptime: 99.3 },
  { date: "2024-02-15", uptime: 99.1 },
]

const deviceUsageData = [
  { device: "AR-001", detections: 245, uptime: 99.2, battery: 85 },
  { device: "AR-002", detections: 189, uptime: 98.8, battery: 92 },
  { device: "AR-003", detections: 67, uptime: 95.4, battery: 23 },
  { device: "AR-004", detections: 198, uptime: 99.1, battery: 67 },
  { device: "AR-005", detections: 134, uptime: 97.6, battery: 78 },
  { device: "AR-006", detections: 89, uptime: 94.2, battery: 12 },
]

const performanceMetrics = [
  { metric: "Face Recognition Accuracy", value: 94.7, target: 95.0, status: "warning" },
  { metric: "Motion Detection Sensitivity", value: 97.2, target: 95.0, status: "good" },
  { metric: "Alert Response Time", value: 2.3, target: 3.0, status: "good", unit: "minutes" },
  { metric: "False Positive Rate", value: 3.1, target: 5.0, status: "good", unit: "%" },
  { metric: "System Availability", value: 99.2, target: 99.0, status: "good", unit: "%" },
  { metric: "Data Processing Speed", value: 1.8, target: 2.0, status: "good", unit: "seconds" },
]

const networkLatencyData = [
  { time: "00:00", latency: 12 },
  { time: "04:00", latency: 8 },
  { time: "08:00", latency: 15 },
  { time: "12:00", latency: 18 },
  { time: "16:00", latency: 22 },
  { time: "20:00", latency: 14 },
]

interface DevicePerformanceTabProps {
  timeRange: string
}

export function DevicePerformanceTab({ timeRange }: DevicePerformanceTabProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "default"
      case "warning":
        return "secondary"
      case "critical":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Device Uptime Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Device Uptime Trend</CardTitle>
          <CardDescription>System availability over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              uptime: {
                label: "Uptime %",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={deviceUptimeData}>
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                <YAxis domain={[95, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="uptime"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Device Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Device Usage</CardTitle>
            <CardDescription>Detection counts by device</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                detections: {
                  label: "Detections",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceUsageData}>
                  <XAxis dataKey="device" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="detections" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Network Latency */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Network Latency</CardTitle>
            <CardDescription>Average response times throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                latency: {
                  label: "Latency (ms)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={networkLatencyData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="latency"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-2))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Performance Metrics</CardTitle>
          <CardDescription>Key system performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{metric.metric}</span>
                  <Badge variant={getStatusColor(metric.status)}>{metric.status}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-foreground">
                    {metric.value}
                    {metric.unit && <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>}
                  </span>
                </div>
                <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current: {metric.value}</span>
                  <span>Target: {metric.target}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Device Status Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Device Status Overview</CardTitle>
          <CardDescription>Detailed status for each surveillance device</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deviceUsageData.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-medium text-foreground">{device.device}</h4>
                    <p className="text-sm text-muted-foreground">{device.detections} detections</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground">{device.uptime}%</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground">{device.battery}%</div>
                    <div className="text-xs text-muted-foreground">Battery</div>
                  </div>
                  <Badge variant={device.uptime > 98 ? "default" : device.uptime > 95 ? "secondary" : "destructive"}>
                    {device.uptime > 98 ? "Excellent" : device.uptime > 95 ? "Good" : "Poor"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
