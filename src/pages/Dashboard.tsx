'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { User, MedicalProcedure, Notification } from '@/types'

// Mock data for demonstration
const mockUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  recentlyViewed: ['proc1', 'proc2', 'proc3'],
  bookings: [
    {
      id: 'booking1',
      procedureId: 'proc1',
      facilityId: 'facility1',
      status: 'confirmed',
      date: '2024-02-15',
      totalCost: 15000,
    },
  ],
  notifications: [
    {
      id: 'notif1',
      type: 'info',
      message: 'Your upcoming appointment is in 2 weeks',
      date: '2024-01-30',
      read: false,
    },
    {
      id: 'notif2',
      type: 'success',
      message: 'Booking confirmation received',
      date: '2024-01-28',
      read: true,
    },
  ],
}

const mockProcedures: Record<string, MedicalProcedure> = {
  proc1: {
    id: 'proc1',
    name: 'Hip Replacement',
    category: 'Orthopedics',
    usPrice: 40000,
    internationalPrice: 12000,
    travelCost: 3000,
    facilityId: 'facility1',
  },
  proc2: {
    id: 'proc2',
    name: 'Heart Bypass Surgery',
    category: 'Cardiology',
    usPrice: 123000,
    internationalPrice: 27000,
    travelCost: 4000,
    facilityId: 'facility2',
  },
  proc3: {
    id: 'proc3',
    name: 'Dental Implants',
    category: 'Dental',
    usPrice: 4500,
    internationalPrice: 1200,
    travelCost: 2000,
    facilityId: 'facility3',
  },
}

const Dashboard = () => {
  const [notifications, setNotifications] = useState<Notification[]>(
    mockUser.notifications
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  return (
    <div className="container py-8">
      {/* User Overview */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {mockUser.name}</h1>
        <p className="text-muted-foreground">{mockUser.email}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Recently Viewed Procedures */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">
                Recently Viewed Procedures
              </h2>
              <div className="space-y-4">
                {mockUser.recentlyViewed.map((procId) => {
                  const procedure = mockProcedures[procId]
                  return (
                    <Card key={procId}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">
                              {procedure.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {procedure.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              International Price
                            </p>
                            <p className="text-lg text-primary">
                              {formatCurrency(procedure.internationalPrice)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">
                Upcoming Appointments
              </h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Procedure</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUser.bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{formatDate(booking.date)}</TableCell>
                        <TableCell>
                          {mockProcedures[booking.procedureId].name}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications and Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Notifications</h2>
                <Button variant="outline" size="sm">
                  Mark all as read
                </Button>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Alert
                    key={notification.id}
                    className={notification.read ? 'opacity-60' : ''}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <AlertTitle className="flex items-center justify-between">
                      <span>
                        {notification.type.charAt(0).toUpperCase() +
                          notification.type.slice(1)}
                      </span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {formatDate(notification.date)}
                      </span>
                    </AlertTitle>
                    <AlertDescription>
                      {notification.message}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">Quick Actions</h2>
              <div className="grid gap-4">
                <Button className="w-full">Compare New Procedures</Button>
                <Button variant="outline" className="w-full">
                  View Travel Expenses
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Summary */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">Account Summary</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-semibold">
                    {mockUser.bookings.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Saved Procedures
                  </p>
                  <p className="text-2xl font-semibold">
                    {mockUser.recentlyViewed.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 