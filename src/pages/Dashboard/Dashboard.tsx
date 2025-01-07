'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { Bell, Calendar, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface Procedure {
  id: string
  name: string
  facility: string
  status: 'pending' | 'confirmed' | 'completed'
  date: Date
  cost: number
  travelCost: number
}

interface AdvisorInteraction {
  id: string
  date: Date
  topic: string
  summary: string
  messages: number
}

interface Notification {
  id: string
  title: string
  description: string
  date: Date
  type: 'info' | 'warning' | 'success'
  read: boolean
}

// Mock data
const mockProcedures: Procedure[] = [
  {
    id: "knee-replacement-1",
    name: "Knee Replacement",
    facility: "Global Care Hospital",
    status: 'pending',
    date: new Date(2024, 2, 15),
    cost: 12000,
    travelCost: 2000
  },
  {
    id: "hip-replacement-1",
    name: "Hip Replacement",
    facility: "American Medical Center",
    status: 'confirmed',
    date: new Date(2024, 3, 1),
    cost: 15000,
    travelCost: 2500
  }
]

const mockInteractions: AdvisorInteraction[] = [
  {
    id: "1",
    date: new Date(2024, 1, 1),
    topic: "Initial Consultation",
    summary: "Discussed treatment options and costs",
    messages: 12
  },
  {
    id: "2",
    date: new Date(2024, 1, 5),
    topic: "Travel Planning",
    summary: "Reviewed accommodation and flight options",
    messages: 8
  }
]

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Booking Confirmation",
    description: "Your knee replacement procedure has been scheduled",
    date: new Date(2024, 1, 1),
    type: 'success',
    read: false
  },
  {
    id: "2",
    title: "New Message",
    description: "You have a new message from your medical advisor",
    date: new Date(2024, 1, 2),
    type: 'info',
    read: false
  }
]

export const Dashboard = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section with Notifications */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome Back, John</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your medical travel plans
            </p>
          </div>
          <div className="relative">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
              )}
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          {notifications.map(notification => (
            <Alert
              key={notification.id}
              className={cn(!notification.read && "border-l-4 border-primary")}
            >
              <AlertTitle className="flex justify-between">
                {notification.title}
                <span className="text-sm text-muted-foreground">
                  {format(notification.date, "MMM d, yyyy")}
                </span>
              </AlertTitle>
              <AlertDescription>
                <div className="flex justify-between items-center">
                  <span>{notification.description}</span>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Procedures List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Procedures</CardTitle>
              <CardDescription>
                Track your scheduled and completed procedures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockProcedures.map(procedure => (
                  <div
                    key={procedure.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{procedure.name}</h3>
                        <Badge variant="outline">{procedure.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {procedure.facility}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {format(procedure.date, "MMM d, yyyy")}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(procedure.cost + procedure.travelCost).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <Link to={`/procedures/${procedure.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advisor Interactions */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Advisor Interactions</CardTitle>
              <CardDescription>
                Your conversation history with medical advisors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  {mockInteractions.map(interaction => (
                    <div
                      key={interaction.id}
                      className="p-4 border rounded-lg space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{interaction.topic}</h4>
                        <Badge variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {interaction.messages}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {interaction.summary}
                      </p>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>{format(interaction.date, "MMM d, yyyy")}</span>
                        <Button variant="ghost" size="sm">
                          View Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 