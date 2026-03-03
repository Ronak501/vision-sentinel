"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Phone, Slack, Plus, Trash2 } from "lucide-react"

export function NotificationSettingsTab() {
  const [emailSettings, setEmailSettings] = useState({
    enabled: true,
    highPriority: true,
    mediumPriority: true,
    lowPriority: false,
    recipients: ["security@company.com", "admin@company.com"],
  })

  const [smsSettings, setSmsSettings] = useState({
    enabled: true,
    highPriority: true,
    mediumPriority: false,
    lowPriority: false,
    recipients: ["+1-555-0123", "+1-555-0124"],
  })

  const [slackSettings, setSlackSettings] = useState({
    enabled: true,
    channel: "#security-alerts",
    webhook: "https://hooks.slack.com/services/...",
    highPriority: true,
    mediumPriority: true,
    lowPriority: false,
  })

  const [newRecipient, setNewRecipient] = useState("")

  const addEmailRecipient = () => {
    if (newRecipient && !emailSettings.recipients.includes(newRecipient)) {
      setEmailSettings((prev) => ({
        ...prev,
        recipients: [...prev.recipients, newRecipient],
      }))
      setNewRecipient("")
    }
  }

  const removeEmailRecipient = (email: string) => {
    setEmailSettings((prev) => ({
      ...prev,
      recipients: prev.recipients.filter((r) => r !== email),
    }))
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="email" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>SMS</span>
          </TabsTrigger>
          <TabsTrigger value="slack" className="flex items-center space-x-2">
            <Slack className="h-4 w-4" />
            <span>Slack</span>
          </TabsTrigger>
          <TabsTrigger value="webhook" className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>Webhook</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Notifications</span>
              </CardTitle>
              <CardDescription>Configure email alerts for security incidents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send email alerts for security incidents</p>
                </div>
                <Switch
                  checked={emailSettings.enabled}
                  onCheckedChange={(checked) => setEmailSettings((prev) => ({ ...prev, enabled: checked }))}
                />
              </div>

              {emailSettings.enabled && (
                <>
                  <div className="space-y-4">
                    <Label>Alert Priorities</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">High Priority</Badge>
                          <span className="text-sm">Critical security threats</span>
                        </div>
                        <Switch
                          checked={emailSettings.highPriority}
                          onCheckedChange={(checked) =>
                            setEmailSettings((prev) => ({ ...prev, highPriority: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">Medium Priority</Badge>
                          <span className="text-sm">Suspicious activities</span>
                        </div>
                        <Switch
                          checked={emailSettings.mediumPriority}
                          onCheckedChange={(checked) =>
                            setEmailSettings((prev) => ({ ...prev, mediumPriority: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">Low Priority</Badge>
                          <span className="text-sm">General notifications</span>
                        </div>
                        <Switch
                          checked={emailSettings.lowPriority}
                          onCheckedChange={(checked) => setEmailSettings((prev) => ({ ...prev, lowPriority: checked }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Email Recipients</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter email address"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addEmailRecipient()}
                      />
                      <Button onClick={addEmailRecipient}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {emailSettings.recipients.map((email, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{email}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEmailRecipient(email)}
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Button className="w-full">Save Email Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>SMS Notifications</span>
              </CardTitle>
              <CardDescription>Configure SMS alerts for critical incidents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send SMS alerts for critical incidents</p>
                </div>
                <Switch
                  checked={smsSettings.enabled}
                  onCheckedChange={(checked) => setSmsSettings((prev) => ({ ...prev, enabled: checked }))}
                />
              </div>

              {smsSettings.enabled && (
                <>
                  <div className="space-y-4">
                    <Label>Alert Priorities</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">High Priority</Badge>
                          <span className="text-sm">Critical security threats</span>
                        </div>
                        <Switch
                          checked={smsSettings.highPriority}
                          onCheckedChange={(checked) => setSmsSettings((prev) => ({ ...prev, highPriority: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">Medium Priority</Badge>
                          <span className="text-sm">Suspicious activities</span>
                        </div>
                        <Switch
                          checked={smsSettings.mediumPriority}
                          onCheckedChange={(checked) =>
                            setSmsSettings((prev) => ({ ...prev, mediumPriority: checked }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Phone Numbers</Label>
                    <div className="space-y-2">
                      {smsSettings.recipients.map((phone, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{phone}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Button className="w-full">Save SMS Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="slack">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Slack className="h-5 w-5" />
                <span>Slack Integration</span>
              </CardTitle>
              <CardDescription>Send alerts to Slack channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Slack Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send alerts to Slack channels</p>
                </div>
                <Switch
                  checked={slackSettings.enabled}
                  onCheckedChange={(checked) => setSlackSettings((prev) => ({ ...prev, enabled: checked }))}
                />
              </div>

              {slackSettings.enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="slack-channel">Slack Channel</Label>
                    <Input
                      id="slack-channel"
                      placeholder="#security-alerts"
                      value={slackSettings.channel}
                      onChange={(e) => setSlackSettings((prev) => ({ ...prev, channel: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slack-webhook">Webhook URL</Label>
                    <Input
                      id="slack-webhook"
                      placeholder="https://hooks.slack.com/services/..."
                      value={slackSettings.webhook}
                      onChange={(e) => setSlackSettings((prev) => ({ ...prev, webhook: e.target.value }))}
                    />
                  </div>
                </>
              )}

              <Button className="w-full">Save Slack Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhook">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Webhook Integration</span>
              </CardTitle>
              <CardDescription>Send alerts to custom webhook endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your-endpoint.com/webhook" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-secret">Secret Key (Optional)</Label>
                <Input id="webhook-secret" type="password" placeholder="Enter secret key for authentication" />
              </div>

              <Button className="w-full">Save Webhook Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
