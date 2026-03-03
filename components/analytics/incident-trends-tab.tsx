"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

// Mock data for charts
const incidentTrendData = [
  { date: "2024-02-08", incidents: 12, resolved: 10, pending: 2 },
  { date: "2024-02-09", incidents: 15, resolved: 13, pending: 2 },
  { date: "2024-02-10", incidents: 8, resolved: 8, pending: 0 },
  { date: "2024-02-11", incidents: 18, resolved: 15, pending: 3 },
  { date: "2024-02-12", incidents: 22, resolved: 19, pending: 3 },
  { date: "2024-02-13", incidents: 14, resolved: 12, pending: 2 },
  { date: "2024-02-14", incidents: 16, resolved: 14, pending: 2 },
  { date: "2024-02-15", incidents: 20, resolved: 17, pending: 3 },
]

const incidentTypeData = [
  { type: "Unknown Person", count: 45, percentage: 35 },
  { type: "Suspicious Activity", count: 32, percentage: 25 },
  { type: "Motion Detection", count: 28, percentage: 22 },
  { type: "Face Recognition Failure", count: 15, percentage: 12 },
  { type: "Tailgating", count: 8, percentage: 6 },
]

const severityData = [
  { severity: "High", count: 23, color: "hsl(var(--destructive))" },
  { severity: "Medium", count: 67, color: "hsl(var(--accent))" },
  { severity: "Low", count: 38, color: "hsl(var(--primary))" },
]

const hourlyData = [
  { hour: "00", incidents: 2 },
  { hour: "01", incidents: 1 },
  { hour: "02", incidents: 0 },
  { hour: "03", incidents: 1 },
  { hour: "04", incidents: 0 },
  { hour: "05", incidents: 1 },
  { hour: "06", incidents: 3 },
  { hour: "07", incidents: 8 },
  { hour: "08", incidents: 12 },
  { hour: "09", incidents: 15 },
  { hour: "10", incidents: 18 },
  { hour: "11", incidents: 14 },
  { hour: "12", incidents: 16 },
  { hour: "13", incidents: 13 },
  { hour: "14", incidents: 17 },
  { hour: "15", incidents: 19 },
  { hour: "16", incidents: 21 },
  { hour: "17", incidents: 18 },
  { hour: "18", incidents: 12 },
  { hour: "19", incidents: 8 },
  { hour: "20", incidents: 5 },
  { hour: "21", incidents: 4 },
  { hour: "22", incidents: 3 },
  { hour: "23", incidents: 2 },
]

interface IncidentTrendsTabProps {
  timeRange: string
}

export function IncidentTrendsTab({ timeRange }: IncidentTrendsTabProps) {
  return (
    <div className="space-y-6">
      {/* Incident Trends Over Time */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Incident Trends</CardTitle>
          <CardDescription>Daily incident counts and resolution status</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              incidents: {
                label: "Total Incidents",
                color: "hsl(var(--chart-1))",
              },
              resolved: {
                label: "Resolved",
                color: "hsl(var(--chart-2))",
              },
              pending: {
                label: "Pending",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incidentTrendData}>
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="incidents"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stackId="2"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stackId="2"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Incident Types */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Incident Types</CardTitle>
            <CardDescription>Distribution of incident categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentTypeData} layout="horizontal">
                  <XAxis type="number" />
                  <YAxis dataKey="type" type="category" width={120} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Severity Distribution</CardTitle>
            <CardDescription>Incidents by severity level</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ severity, percentage }) => `${severity}: ${percentage}%`}
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Pattern */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Hourly Incident Pattern</CardTitle>
          <CardDescription>Incident frequency by hour of day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              incidents: {
                label: "Incidents",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="incidents"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
