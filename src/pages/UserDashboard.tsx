'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Bell } from 'lucide-react'

interface RecentlyViewed {
  id: string
  name: string
  facility: string
  price: number
  viewedAt: string
}

interface BookingStatus {
  status: string
  count: number
  color: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning'
  timestamp: string
  read: boolean
}

const mockRecentlyViewed: RecentlyViewed[] = [
  {
    id: '1',
    name: 'Hip Replacement',
    facility: 'Apollo Hospitals',
    price: 12000,
    viewedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Dental Implants',
    facility: 'Memorial Hospital',
    price: 3500,
    viewedAt: '2024-01-14T15:45:00Z',
  },
]

const mockBookingStatus: BookingStatus[] = [
  { status: 'Pending', count: 2, color: 'bg-yellow-500' },
  { status: 'Confirmed', count: 1, color: 'bg-green-500' },
  { status: 'Completed', count: 3, color: 'bg-blue-500' },
]

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Booking Confirmed',
    message: 'Your hip replacement procedure has been confirmed for March 15, 2024.',
    type: 'success',
    timestamp: '2024-01-15T09:00:00Z',
    read: false,
  },
  {
    id: '2',
    title: 'Document Required',
    message: 'Please upload your recent medical records for the upcoming procedure.',
    type: 'warning',
    timestamp: '2024-01-14T14:30:00Z',
    read: false,
  },
]

const UserDashboard = () => {
  const [notifications, setNotifications] = useState(mockNotifications)

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const getNotificationStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your medical travel journey
          </p>
        </div>
        <div className="relative">
          <Button variant="outline" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Booking Status Overview */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {mockBookingStatus.map((status) => (
          <Card key={status.status}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{status.status}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{status.count}</span>
                <div className="h-2 w-24">
                  <div className={`h-full w-full rounded-full ${status.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recently Viewed */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recently Viewed Procedures</CardTitle>
          <CardDescription>
            Procedures you've viewed in the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Procedure</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Viewed</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRecentlyViewed.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.facility}</TableCell>
                  <TableCell>${item.price.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(item.viewedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/compare?procedure=${item.name}`}>
                        View Again
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Updates and alerts about your medical travel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-lg border p-4 ${
                  notification.read ? 'bg-background' : getNotificationStyles(notification.type)
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold">{notification.title}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className={notification.read ? 'invisible' : ''}
                  >
                    Mark as read
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserDashboard 