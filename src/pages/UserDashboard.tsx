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
import { Bell, CheckCircle, Clock, Calendar } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

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

interface BookingProgress {
  id: string
  procedure: string
  facility: string
  currentStep: number
  totalSteps: number
  nextAction: string
  dueDate: string
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

const mockBookingProgress: BookingProgress[] = [
  {
    id: 'BK001',
    procedure: 'Hip Replacement',
    facility: 'Apollo Hospitals',
    currentStep: 3,
    totalSteps: 5,
    nextAction: 'Upload medical records',
    dueDate: '2024-02-01',
  },
  {
    id: 'BK002',
    procedure: 'Dental Implants',
    facility: 'Memorial Hospital',
    currentStep: 2,
    totalSteps: 4,
    nextAction: 'Schedule consultation',
    dueDate: '2024-02-15',
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

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const clearAllNotifications = () => {
    setNotifications([])
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length > 0 ? (
                <>
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={!notification.read ? 'font-medium' : ''}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex flex-col space-y-1">
                        <span>{notification.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={markAllAsRead}>
                    Mark all as read
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={clearAllNotifications}>
                    Clear all notifications
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No new notifications
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Booking Status Overview */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {mockBookingStatus.map((status) => (
          <Card key={status.status}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                {status.status === 'Pending' && <Clock className="mr-2 h-5 w-5 text-yellow-500" />}
                {status.status === 'Confirmed' && <Calendar className="mr-2 h-5 w-5 text-green-500" />}
                {status.status === 'Completed' && <CheckCircle className="mr-2 h-5 w-5 text-blue-500" />}
                {status.status}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{status.count}</span>
                <Progress value={(status.count / 6) * 100} className="h-2 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notifications */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Stay updated on your medical travel journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <Alert
              key={notification.id}
              className={`${getNotificationStyles(notification.type)} transition-colors duration-200 hover:bg-opacity-75 ${
                !notification.read ? 'border-l-4' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <AlertTitle className="text-sm font-semibold">
                    {notification.title}
                  </AlertTitle>
                  <AlertDescription className="mt-1 text-sm">
                    {notification.message}
                  </AlertDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => markAsRead(notification.id)}
                >
                  {notification.read ? 'Read' : 'Mark as read'}
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {new Date(notification.timestamp).toLocaleString()}
              </div>
            </Alert>
          ))}
          {notifications.length === 0 && (
            <div className="text-center text-sm text-muted-foreground">
              No notifications to display
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Progress with Steps */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Booking Progress</CardTitle>
          <CardDescription>Track your ongoing medical travel arrangements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {mockBookingProgress.map((booking) => (
              <div key={booking.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{booking.procedure}</h4>
                    <p className="text-sm text-muted-foreground">{booking.facility}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{booking.nextAction}</p>
                    <p className="text-sm text-muted-foreground">
                      Due by {new Date(booking.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      {Math.round((booking.currentStep / booking.totalSteps) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(booking.currentStep / booking.totalSteps) * 100}
                    className="h-2 transition-all duration-300"
                  />
                  <div className="flex justify-between">
                    {Array.from({ length: booking.totalSteps }).map((_, index) => (
                      <div
                        key={index}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition-colors duration-200 ${
                          index < booking.currentStep
                            ? 'border-primary bg-primary text-primary-foreground'
                            : index === booking.currentStep
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-muted bg-muted/20 text-muted-foreground'
                        }`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
    </div>
  )
}

export default UserDashboard 