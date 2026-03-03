"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KnownFacesTab } from "./known-faces-tab"
import { UnknownFacesTab } from "./unknown-faces-tab"
import { ThreatIncidentsTab } from "./threat-incidents-tab"
import { AddPersonDialog } from "./add-person-dialog"
import { Users, UserX, AlertTriangle, Plus, Search, Filter } from "lucide-react"

export function FaceDatabase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("known")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Face & Threat Database</h1>
          <p className="text-muted-foreground">Manage known individuals and track security threats</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="font-heading font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Add Person
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Known Individuals</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">247</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unknown Faces</CardTitle>
            <UserX className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">18</div>
            <p className="text-xs text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threat Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">7</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recognition Rate</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">94.2%</div>
            <p className="text-xs text-muted-foreground">Average accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="known" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Known Faces</span>
          </TabsTrigger>
          <TabsTrigger value="unknown" className="flex items-center space-x-2">
            <UserX className="h-4 w-4" />
            <span>Unknown Faces</span>
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Threat Incidents</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="known">
          <KnownFacesTab searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="unknown">
          <UnknownFacesTab searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="threats">
          <ThreatIncidentsTab searchTerm={searchTerm} />
        </TabsContent>
      </Tabs>

      {/* Add Person Dialog */}
      <AddPersonDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}
