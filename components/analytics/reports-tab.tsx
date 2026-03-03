"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Download, FileText, Mail, Clock } from "lucide-react"
import { format } from "date-fns"

// Mock scheduled reports data
const scheduledReports = [
  {
    id: 1,
    name: "Daily Security Summary",
    type: "summary",
    frequency: "daily",
    recipients: ["security@company.com"],
    lastGenerated: "2024-02-15T08:00:00Z",
    nextScheduled: "2024-02-16T08:00:00Z",
    status: "active",
  },
  {
    id: 2,
    name: "Weekly Incident Analysis",
    type: "incidents",
    frequency: "weekly",
    recipients: ["management@company.com", "security@company.com"],
    lastGenerated: "2024-02-12T09:00:00Z",
    nextScheduled: "2024-02-19T09:00:00Z",
    status: "active",
  },
  {
    id: 3,
    name: "Monthly Performance Report",
    type: "performance",
    frequency: "monthly",
    recipients: ["admin@company.com"],
    lastGenerated: "2024-02-01T10:00:00Z",
    nextScheduled: "2024-03-01T10:00:00Z",
    status: "active",
  },
]

const reportTemplates = [
  {
    id: 1,
    name: "Executive Summary",
    description: "High-level overview of security metrics and incidents",
    sections: ["Key Metrics", "Incident Summary", "Threat Analysis", "Recommendations"],
  },
  {
    id: 2,
    name: "Detailed Incident Report",
    description: "Comprehensive analysis of all security incidents",
    sections: ["Incident Timeline", "Threat Classification", "Response Actions", "Resolution Status"],
  },
  {
    id: 3,
    name: "Device Performance Report",
    description: "Technical performance metrics for all surveillance devices",
    sections: ["Uptime Statistics", "Detection Accuracy", "Network Performance", "Maintenance Alerts"],
  },
  {
    id: 4,
    name: "Compliance Report",
    description: "Security compliance and audit trail documentation",
    sections: ["Access Logs", "Policy Compliance", "Audit Trail", "Regulatory Requirements"],
  },
]

export function ReportsTab() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [reportName, setReportName] = useState("")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [recipients, setRecipients] = useState("")

  const handleSectionToggle = (section: string) => {
    setSelectedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const generateReport = () => {
    console.log("Generating report:", {
      template: selectedTemplate,
      name: reportName,
      dateRange,
      sections: selectedSections,
      recipients: recipients.split(",").map((r) => r.trim()),
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "paused":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Generate Custom Report */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Generate Custom Report</CardTitle>
          <CardDescription>Create a customized security report with specific parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="report-name">Report Name</Label>
              <Input
                id="report-name"
                placeholder="Enter report name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-template">Report Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {reportTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id.toString()}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {selectedTemplate && (
            <div className="space-y-2">
              <Label>Report Sections</Label>
              <div className="grid grid-cols-2 gap-2">
                {reportTemplates
                  .find((t) => t.id.toString() === selectedTemplate)
                  ?.sections.map((section) => (
                    <div key={section} className="flex items-center space-x-2">
                      <Checkbox
                        id={section}
                        checked={selectedSections.includes(section)}
                        onCheckedChange={() => handleSectionToggle(section)}
                      />
                      <Label htmlFor={section} className="text-sm">
                        {section}
                      </Label>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="recipients">Email Recipients (comma-separated)</Label>
            <Input
              id="recipients"
              placeholder="admin@company.com, security@company.com"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={generateReport} className="font-heading font-semibold">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Report Templates</CardTitle>
          <CardDescription>Pre-configured report templates for common use cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reportTemplates.map((template) => (
              <div key={template.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{template.name}</h4>
                  <Button variant="outline" size="sm">
                    Use Template
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-1">
                  {template.sections.map((section, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {section}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Scheduled Reports</CardTitle>
          <CardDescription>Automated reports sent on a regular schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{report.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{report.frequency}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{report.recipients.length} recipients</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(report.status)}>{report.status}</Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
