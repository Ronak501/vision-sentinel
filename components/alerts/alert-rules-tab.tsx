"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Edit, Trash2, Shield } from "lucide-react"

// Mock alert rules data
const mockAlertRules = [
  {
    id: 1,
    name: "Unknown Person - High Priority",
    description: "Trigger high priority alert for unknown persons in restricted areas",
    trigger: "Unknown Person Detected",
    conditions: ["Location: Restricted Areas", "Confidence > 80%"],
    severity: "high",
    enabled: true,
    escalationTime: 5,
    notificationChannels: ["email", "sms", "slack"],
  },
  {
    id: 2,
    name: "After Hours Motion",
    description: "Alert for motion detection outside business hours",
    trigger: "Motion Detection",
    conditions: ["Time: Outside 9AM-6PM", "Location: Office Areas"],
    severity: "medium",
    enabled: true,
    escalationTime: 15,
    notificationChannels: ["email", "slack"],
  },
  {
    id: 3,
    name: "Multiple Failed Recognition",
    description: "Alert when face recognition fails multiple times",
    trigger: "Face Recognition Failure",
    conditions: ["Count > 3", "Time Window: 10 minutes"],
    severity: "medium",
    enabled: true,
    escalationTime: 10,
    notificationChannels: ["email"],
  },
  {
    id: 4,
    name: "Emergency Exit Activity",
    description: "High priority alert for activity near emergency exits",
    trigger: "Motion Detection",
    conditions: ["Location: Emergency Exits", "Duration > 30 seconds"],
    severity: "high",
    enabled: false,
    escalationTime: 3,
    notificationChannels: ["email", "sms"],
  },
]

export function AlertRulesTab() {
  const [rules, setRules] = useState(mockAlertRules)
  const [showAddRule, setShowAddRule] = useState(false)

  const toggleRule = (ruleId: number) => {
    setRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const deleteRule = (ruleId: number) => {
    setRules((prev) => prev.filter((rule) => rule.id !== ruleId))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Alert Rules</h3>
          <p className="text-sm text-muted-foreground">Configure automated alert triggers and escalation rules</p>
        </div>
        <Button onClick={() => setShowAddRule(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className={!rule.enabled ? "opacity-60" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{rule.name}</h4>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getSeverityColor(rule.severity)}>{rule.severity}</Badge>
                  <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Rule
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteRule(rule.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Rule
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-1">Trigger</h5>
                  <Badge variant="outline">{rule.trigger}</Badge>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-foreground mb-1">Conditions</h5>
                  <div className="flex flex-wrap gap-1">
                    {rule.conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Escalation Time:</span>
                    <span className="ml-2 text-foreground">{rule.escalationTime} minutes</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Channels:</span>
                    <span className="ml-2 text-foreground">{rule.notificationChannels.join(", ")}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Rule Form */}
      {showAddRule && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Alert Rule</CardTitle>
            <CardDescription>Create a new automated alert rule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rule-name">Rule Name</Label>
                <Input id="rule-name" placeholder="Enter rule name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rule-trigger">Trigger Event</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unknown-person">Unknown Person Detected</SelectItem>
                    <SelectItem value="motion">Motion Detection</SelectItem>
                    <SelectItem value="face-recognition-failure">Face Recognition Failure</SelectItem>
                    <SelectItem value="tailgating">Tailgating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rule-description">Description</Label>
              <Input id="rule-description" placeholder="Describe what this rule does" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rule-severity">Severity</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="escalation-time">Escalation Time (minutes)</Label>
                <Input id="escalation-time" type="number" placeholder="5" />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={() => setShowAddRule(false)}>Create Rule</Button>
              <Button variant="outline" onClick={() => setShowAddRule(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
