"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Mock data for threat analysis
const threatTrendData = [
  { date: "2024-02-08", high: 2, medium: 5, low: 3 },
  { date: "2024-02-09", high: 3, medium: 4, low: 2 },
  { date: "2024-02-10", high: 1, medium: 3, low: 4 },
  { date: "2024-02-11", high: 4, medium: 6, low: 2 },
  { date: "2024-02-12", high: 2, medium: 7, low: 5 },
  { date: "2024-02-13", high: 1, medium: 4, low: 3 },
  { date: "2024-02-14", high: 3, medium: 5, low: 4 },
  { date: "2024-02-15", high: 2, medium: 6, low: 3 },
]

const locationThreatData = [
  { location: "Main Entrance", threats: 23, riskLevel: "high" },
  { location: "Parking Lot", threats: 18, riskLevel: "medium" },
  { location: "Emergency Exits", threats: 15, riskLevel: "high" },
  { location: "Reception Area", threats: 12, riskLevel: "low" },
  { location: "Server Room", threats: 8, riskLevel: "medium" },
  { location: "Conference Rooms", threats: 5, riskLevel: "low" },
]

const threatTypeEvolution = [
  { month: "Oct", unknownPerson: 45, suspicious: 32, motion: 28, tailgating: 12 },
  { month: "Nov", unknownPerson: 52, suspicious: 28, motion: 35, tailgating: 15 },
  { month: "Dec", unknownPerson: 48, suspicious: 35, motion: 32, tailgating: 18 },
  { month: "Jan", unknownPerson: 55, suspicious: 42, motion: 38, tailgating: 22 },
  { month: "Feb", unknownPerson: 61, suspicious: 38, motion: 41, tailgating: 19 },
]

const riskAssessment = [
  { category: "Physical Security", score: 85, trend: "improving" },
  { category: "Access Control", score: 92, trend: "stable" },
  { category: "Perimeter Security", score: 78, trend: "declining" },
  { category: "Internal Monitoring", score: 88, trend: "improving" },
  { category: "Emergency Response", score: 94, trend: "stable" },
]

const predictiveAlerts = [
  {
    id: 1,
    prediction: "Increased activity expected at Main Entrance",
    confidence: 87,
    timeframe: "Next 2 hours",
    recommendation: "Deploy additional monitoring",
  },
  {
    id: 2,
    prediction: "Potential tailgating risk during shift change",
    confidence: 73,
    timeframe: "5:00 PM - 6:00 PM",
    recommendation: "Increase access control vigilance",
  },
  {
    id: 3,
    prediction: "Unusual pattern detected in parking lot",
    confidence: 65,
    timeframe: "Weekend evenings",
    recommendation: "Review weekend security protocols",
  },
]

interface ThreatAnalysisTabProps {
  timeRange: string
}

export function ThreatAnalysisTab({ timeRange }: ThreatAnalysisTabProps) {
  const getRiskColor = (level: string) => {
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

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-primary"
      case "declining":
        return "text-destructive"
      case "stable":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Threat Severity Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Threat Severity Trends</CardTitle>
          <CardDescription>Daily threat distribution by severity level</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              high: {
                label: "High Severity",
                color: "hsl(var(--destructive))",
              },
              medium: {
                label: "Medium Severity",
                color: "hsl(var(--accent))",
              },
              low: {
                label: "Low Severity",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatTrendData}>
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="high"
                  stackId="1"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="medium"
                  stackId="1"
                  stroke="hsl(var(--accent))"
                  fill="hsl(var(--accent))"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="low"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Location-based Threat Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Threat Hotspots</CardTitle>
            <CardDescription>Threats by location and risk level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationThreatData.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">{location.location}</h4>
                    <p className="text-sm text-muted-foreground">{location.threats} threats detected</p>
                  </div>
                  <Badge variant={getRiskColor(location.riskLevel)}>{location.riskLevel} risk</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Security Risk Assessment</CardTitle>
            <CardDescription>Overall security posture by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAssessment.map((risk, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{risk.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-foreground">{risk.score}/100</span>
                      <span className={`text-xs ${getTrendColor(risk.trend)}`}>
                        {risk.trend === "improving" ? "↗" : risk.trend === "declining" ? "↘" : "→"}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${risk.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Threat Type Evolution */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Threat Type Evolution</CardTitle>
          <CardDescription>Monthly trends for different threat categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              unknownPerson: {
                label: "Unknown Person",
                color: "hsl(var(--chart-1))",
              },
              suspicious: {
                label: "Suspicious Activity",
                color: "hsl(var(--chart-2))",
              },
              motion: {
                label: "Motion Detection",
                color: "hsl(var(--chart-3))",
              },
              tailgating: {
                label: "Tailgating",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={threatTypeEvolution}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="unknownPerson"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))" }}
                />
                <Line
                  type="monotone"
                  dataKey="suspicious"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))" }}
                />
                <Line
                  type="monotone"
                  dataKey="motion"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-3))" }}
                />
                <Line
                  type="monotone"
                  dataKey="tailgating"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-4))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Predictive Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Predictive Security Alerts</CardTitle>
          <CardDescription>AI-powered threat predictions and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictiveAlerts.map((alert) => (
              <div key={alert.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{alert.prediction}</h4>
                  <Badge variant="outline">{alert.confidence}% confidence</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Timeframe:</span> {alert.timeframe}
                  </div>
                  <div>
                    <span className="font-medium">Recommendation:</span> {alert.recommendation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
