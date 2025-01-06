'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

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

// ... existing interfaces ...

const mockRecentlyViewed: RecentlyViewed[] = [
  {
    id: '1',
    name: 'Hip Replacement Surgery',
    facility: 'Apollo Hospitals',
    price: 12000,
    viewedAt: '2024-02-15T10:30:00Z'
  },
  {
    id: '2', 
    name: 'Dental Implants',
    facility: 'Bumrungrad International',
    price: 3500,
    viewedAt: '2024-02-14T15:45:00Z'
  }
]

const mockBookingStatuses: BookingStatus[] = [
  { status: 'Pending', count: 2, color: 'yellow' },
  { status: 'Confirmed', count: 1, color: 'green' },
  { status: 'Completed', count: 3, color: 'blue' }
]

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Consultation Scheduled',
    message: 'Your consultation for Hip Replacement has been scheduled for March 15th',
    type: 'success',
    timestamp: '2024-02-15T09:00:00Z',
    read: false
  },
  {
    id: '2',
    title: 'Document Required',
    message: 'Please upload your latest medical records',
    type: 'warning',
    timestamp: '2024-02-14T16:30:00Z',
    read: true
  }
]

const mockBookingProgress: BookingProgress[] = [
  {
    id: '1',
    procedure: 'Hip Replacement',
    facility: 'Apollo Hospitals',
    currentStep: 2,
    totalSteps: 5,
    nextAction: 'Upload Medical Records',
    dueDate: '2024-03-01'
  }
]

export const UserDashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Booking Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {mockBookingStatuses.map((status) => (
          <Card key={status.status}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{status.status}</span>
                <Badge className={`bg-${status.color}-500`}>{status.count}</Badge>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Booking Progress */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Bookings</h2>
        {mockBookingProgress.map((booking) => (
          <Card key={booking.id} className="mb-4">
            <CardHeader>
              <CardTitle>{booking.procedure}</CardTitle>
              <CardDescription>{booking.facility}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={(booking.currentStep / booking.totalSteps) * 100} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Next Action: {booking.nextAction}</span>
                  <span>Due: {booking.dueDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recently Viewed */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recently Viewed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockRecentlyViewed.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.facility}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">${item.price.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">
                  Viewed: {new Date(item.viewedAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <Card key={notification.id} className={notification.read ? 'opacity-60' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{notification.title}</span>
                  <Badge variant={notification.type === 'warning' ? 'destructive' : 'default'}>
                    {notification.type}
                  </Badge>
                </CardTitle>
                <CardDescription>{notification.message}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 