'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import { Bell, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { bookingsApi, proceduresApi } from "@/lib/api"

interface Booking {
  uuid: string
  user_id: string
  facility_id: string
  procedure_id: string
  itinerary: string
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'
}

interface Procedure {
  uuid: string
  name: string
  description: string
}

interface Notification {
  id: string
  title: string
  description: string
  date: Date
  type: 'info' | 'warning' | 'success'
  read: boolean
}

// Mock notifications - in a real app, this would come from an API
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Booking Confirmation",
    description: "Your procedure has been scheduled",
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
  const [bookings, setBookings] = useState<Booking[]>([])
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [bookingsRes, proceduresRes] = await Promise.all([
          bookingsApi.getAll(),
          proceduresApi.getAll()
        ])

        if (bookingsRes.error) throw new Error(bookingsRes.error)
        if (proceduresRes.error) throw new Error(proceduresRes.error)

        setBookings(bookingsRes.data ?? [])
        setProcedures(proceduresRes.data ?? [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const getProcedureName = (procedureId: string) => {
    const procedure = procedures.find(p => p.uuid === procedureId)
    return procedure?.name || 'Unknown Procedure'
  }

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-500 border-yellow-500'
      case 'Confirmed':
        return 'text-green-500 border-green-500'
      case 'Completed':
        return 'text-blue-500 border-blue-500'
      default:
        return 'text-gray-500 border-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-10" />
        </div>

        <div className="space-y-4">
          {Array(2).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Array(3).fill(null).map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
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
                {bookings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No procedures booked yet. 
                    <Link to="/procedures" className="text-primary hover:underline ml-1">
                      Browse available procedures
                    </Link>
                  </div>
                ) : (
                  bookings.map(booking => (
                    <div
                      key={booking.uuid}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {getProcedureName(booking.procedure_id)}
                          </h3>
                          <Badge 
                            variant="outline"
                            className={cn(getStatusColor(booking.status))}
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {booking.itinerary}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/procedures/${booking.procedure_id}`}>
                            View Details
                          </Link>
                        </Button>
                        {booking.status === 'Pending' && (
                          <Button variant="default" size="sm">
                            Confirm Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent interactions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  {bookings.map(booking => (
                    <div
                      key={booking.uuid}
                      className="p-4 border rounded-lg space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">
                          {getProcedureName(booking.procedure_id)}
                        </h4>
                        <Badge variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          New Update
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {booking.itinerary}
                      </p>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/procedures/${booking.procedure_id}`}>
                            View Details
                          </Link>
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