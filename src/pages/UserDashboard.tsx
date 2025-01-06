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
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Info, 
  AlertTriangle,
  User,
  History,
  FileText,
  Settings,
  ChevronRight,
} from 'lucide-react'
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

interface BookingStep {
  step: number
  title: string
  description: string
  status: 'completed' | 'current' | 'upcoming'
  action?: {
    label: string
    link: string
  }
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
].sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime())

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

const getBookingSteps = (currentStep: number): BookingStep[] => [
  {
    step: 1,
    title: 'Initial Consultation',
    description: 'Schedule and complete initial consultation',
    status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'upcoming',
    action: {
      label: 'Schedule Consultation',
      link: '/schedule-consultation'
    }
  },
  {
    step: 2,
    title: 'Document Submission',
    description: 'Upload required medical records and documents',
    status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'upcoming',
    action: {
      label: 'Upload Documents',
      link: '/upload-documents'
    }
  },
  {
    step: 3,
    title: 'Travel Planning',
    description: 'Plan travel arrangements and accommodation',
    status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'upcoming',
    action: {
      label: 'Plan Travel',
      link: '/travel-planning'
    }
  },
  {
    step: 4,
    title: 'Pre-Procedure Check',
    description: 'Complete pre-procedure requirements and checks',
    status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'upcoming',
    action: {
      label: 'View Requirements',
      link: '/pre-procedure'
    }
  },
  {
    step: 5,
    title: 'Final Confirmation',
    description: 'Confirm all arrangements and receive final instructions',
    status: currentStep > 5 ? 'completed' : currentStep === 5 ? 'current' : 'upcoming',
    action: {
      label: 'Confirm Details',
      link: '/confirm-booking'
    }
  },
]

const ProfileSection = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Manage your personal details and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <p className="mt-1">John Doe</p>
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="mt-1">john.doe@example.com</p>
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <p className="mt-1">+1 234 567 8900</p>
          </div>
          <div>
            <label className="text-sm font-medium">Location</label>
            <p className="mt-1">New York, USA</p>
          </div>
        </div>
        <Button variant="outline" className="mt-4">
          Edit Profile
        </Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Medical Information</CardTitle>
        <CardDescription>Your medical history and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Blood Type</label>
            <p className="mt-1">A+</p>
          </div>
          <div>
            <label className="text-sm font-medium">Allergies</label>
            <p className="mt-1">None reported</p>
          </div>
          <div>
            <label className="text-sm font-medium">Medical Conditions</label>
            <p className="mt-1">None reported</p>
          </div>
          <div>
            <label className="text-sm font-medium">Current Medications</label>
            <p className="mt-1">None reported</p>
          </div>
        </div>
        <Button variant="outline" className="mt-4">
          Update Medical Info
        </Button>
      </CardContent>
    </Card>
  </div>
)

const HistorySection = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Procedure History</CardTitle>
        <CardDescription>Your past medical procedures and consultations</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Procedure</TableHead>
              <TableHead>Facility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Jan 15, 2024</TableCell>
              <TableCell>Initial Consultation</TableCell>
              <TableCell>Apollo Hospitals</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Completed
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dec 20, 2023</TableCell>
              <TableCell>Follow-up Consultation</TableCell>
              <TableCell>Memorial Hospital</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Completed
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Document History</CardTitle>
        <CardDescription>Medical records and documents</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Document Type</TableHead>
              <TableHead>Related To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Jan 10, 2024</TableCell>
              <TableCell>Medical Records</TableCell>
              <TableCell>Hip Replacement</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dec 15, 2023</TableCell>
              <TableCell>X-Ray Results</TableCell>
              <TableCell>Initial Consultation</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
)

const SettingsSection = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Email Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Receive updates about your bookings via email
            </p>
          </div>
          <Button variant="outline">Configure</Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">SMS Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Get important alerts via SMS
            </p>
          </div>
          <Button variant="outline">Configure</Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Language Preferences</h4>
            <p className="text-sm text-muted-foreground">
              Choose your preferred language
            </p>
          </div>
          <Button variant="outline">Change</Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>Manage your privacy preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Profile Visibility</h4>
            <p className="text-sm text-muted-foreground">
              Control who can see your profile information
            </p>
          </div>
          <Button variant="outline">Manage</Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Data Usage</h4>
            <p className="text-sm text-muted-foreground">
              Manage how your data is used
            </p>
          </div>
          <Button variant="outline">Configure</Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

const UserDashboard = () => {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeSection, setActiveSection] = useState('overview')

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

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5

    if (diffInHours < 24) {
      return `${Math.round(diffInHours)} hours ago`
    }
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
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
        <div className="flex items-center gap-4">
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Button
                  variant={activeSection === 'overview' ? 'default' : 'ghost'}
                  className="flex items-center gap-2"
                  onClick={() => setActiveSection('overview')}
                >
                  <FileText className="h-4 w-4" />
                  Overview
                </Button>
              </li>
              <li>
                <Button
                  variant={activeSection === 'profile' ? 'default' : 'ghost'}
                  className="flex items-center gap-2"
                  onClick={() => setActiveSection('profile')}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </li>
              <li>
                <Button
                  variant={activeSection === 'history' ? 'default' : 'ghost'}
                  className="flex items-center gap-2"
                  onClick={() => setActiveSection('history')}
                >
                  <History className="h-4 w-4" />
                  History
                </Button>
              </li>
              <li>
                <Button
                  variant={activeSection === 'settings' ? 'default' : 'ghost'}
                  className="flex items-center gap-2"
                  onClick={() => setActiveSection('settings')}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </li>
            </ul>
          </nav>
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
      </div>

      {activeSection === 'overview' && (
        <>
          {/* Booking Status Overview */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            {mockBookingStatus.map((status) => (
              <Card key={status.status} className="transition-transform duration-200 hover:scale-105">
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
                    <Progress 
                      value={(status.count / 6) * 100} 
                      className="h-2 w-24"
                      aria-label={`${status.status} bookings progress`}
                    />
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
                  role="alert"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div>
                        <AlertTitle className="text-sm font-semibold">
                          {notification.title}
                        </AlertTitle>
                        <AlertDescription className="mt-1 text-sm">
                          {notification.message}
                        </AlertDescription>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {formatTimestamp(notification.timestamp)}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => markAsRead(notification.id)}
                      aria-label={notification.read ? 'Notification read' : 'Mark notification as read'}
                    >
                      {notification.read ? 'Read' : 'Mark as read'}
                    </Button>
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

          {/* Booking Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Booking Progress</CardTitle>
              <CardDescription>Track your ongoing medical travel arrangements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {mockBookingProgress.map((booking) => {
                  const steps = getBookingSteps(booking.currentStep)
                  return (
                    <div key={booking.id} className="space-y-6">
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
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Overall Progress</span>
                          <span className="font-medium">
                            {Math.round((booking.currentStep / booking.totalSteps) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(booking.currentStep / booking.totalSteps) * 100}
                          className="h-2 transition-all duration-300"
                        />
                        <div className="mt-6 space-y-4">
                          {steps.map((step) => (
                            <div
                              key={step.step}
                              className={`flex items-start gap-4 rounded-lg border p-4 transition-colors duration-200 ${
                                step.status === 'completed'
                                  ? 'border-green-200 bg-green-50'
                                  : step.status === 'current'
                                  ? 'border-blue-200 bg-blue-50'
                                  : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium ${
                                  step.status === 'completed'
                                    ? 'border-green-500 bg-green-500 text-white'
                                    : step.status === 'current'
                                    ? 'border-blue-500 bg-blue-500 text-white'
                                    : 'border-gray-300 bg-white text-gray-500'
                                }`}
                              >
                                {step.status === 'completed' ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  step.step
                                )}
                              </div>
                              <div className="flex flex-1 items-center justify-between">
                                <div>
                                  <h5 className="font-medium">{step.title}</h5>
                                  <p className="text-sm text-muted-foreground">
                                    {step.description}
                                  </p>
                                </div>
                                {step.action && (step.status === 'current' || step.status === 'upcoming') && (
                                  <Button
                                    variant={step.status === 'current' ? 'default' : 'outline'}
                                    size="sm"
                                    className="ml-4"
                                    asChild
                                  >
                                    <Link to={step.action.link}>
                                      {step.action.label}
                                      <ChevronRight className="ml-2 h-4 w-4" />
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Separator className="mt-4" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recently Viewed */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recently Viewed Procedures</CardTitle>
              <CardDescription>
                Quick access to procedures you've viewed in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Procedure</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Viewed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRecentlyViewed.map((item) => (
                    <TableRow 
                      key={item.id}
                      className="transition-colors duration-200 hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">
                        <Link 
                          to={`/compare?procedure=${encodeURIComponent(item.name)}`}
                          className="text-primary hover:underline"
                        >
                          {item.name}
                        </Link>
                      </TableCell>
                      <TableCell>{item.facility}</TableCell>
                      <TableCell className="text-right">
                        ${item.price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {formatTimestamp(item.viewedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <Link to={`/compare?procedure=${encodeURIComponent(item.name)}`}>
                              Compare
                            </Link>
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="sm"
                            asChild
                          >
                            <Link to={`/facilities?procedure=${encodeURIComponent(item.name)}`}>
                              View Facilities
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {mockRecentlyViewed.length === 0 && (
                    <TableRow>
                      <TableCell 
                        colSpan={5} 
                        className="text-center text-muted-foreground"
                      >
                        No recently viewed procedures
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {activeSection === 'profile' && <ProfileSection />}
      {activeSection === 'history' && <HistorySection />}
      {activeSection === 'settings' && <SettingsSection />}
    </div>
  )
}

export default UserDashboard 