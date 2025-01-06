'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface BookingRequest {
  id: string
  procedure: string
  facility: string
  status: 'pending' | 'confirmed' | 'completed'
  date: string
  estimatedCost: number
}

interface ChatMessage {
  id: string
  sender: 'user' | 'advisor'
  message: string
  timestamp: string
}

const mockBookings: BookingRequest[] = [
  {
    id: 'BK001',
    procedure: 'Hip Replacement',
    facility: 'Apollo Hospitals',
    status: 'confirmed',
    date: '2024-03-15',
    estimatedCost: 12000,
  },
  {
    id: 'BK002',
    procedure: 'Dental Implants',
    facility: 'Bumrungrad International',
    status: 'pending',
    date: '2024-04-01',
    estimatedCost: 3500,
  },
]

const mockFAQs = [
  {
    question: 'What documents do I need for medical travel?',
    answer:
      'You will need a valid passport, medical visa, medical records, and confirmation from the healthcare facility.',
  },
  {
    question: 'How long is the typical recovery period?',
    answer:
      'Recovery periods vary by procedure. We recommend discussing this with your healthcare provider.',
  },
  {
    question: 'What happens if I need to reschedule?',
    answer:
      'You can reschedule your procedure up to 2 weeks before the scheduled date without any penalty.',
  },
]

const BookingManagement = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'advisor',
      message: 'Hello! How can I assist you with your medical travel plans today?',
      timestamp: new Date().toISOString(),
    },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toISOString(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setNewMessage('')

    // Simulate advisor response
    setTimeout(() => {
      const advisorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'advisor',
        message:
          'Thank you for your message. One of our medical travel advisors will respond shortly.',
        timestamp: new Date().toISOString(),
      }
      setChatMessages((prev) => [...prev, advisorMessage])
    }, 1000)
  }

  const getStatusColor = (status: BookingRequest['status']) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'completed':
        return 'text-blue-600'
      default:
        return ''
    }
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Booking Management</h1>

      {/* Booking List */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Bookings</CardTitle>
          <CardDescription>Manage your medical travel bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Procedure</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Estimated Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.procedure}</TableCell>
                  <TableCell>{booking.facility}</TableCell>
                  <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    ${booking.estimatedCost.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Booking Details</DialogTitle>
                          <DialogDescription>
                            Complete information about your medical travel booking
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div>
                            <h4 className="mb-2 font-semibold">Procedure Details</h4>
                            <p>{booking.procedure}</p>
                          </div>
                          <div>
                            <h4 className="mb-2 font-semibold">Facility</h4>
                            <p>{booking.facility}</p>
                          </div>
                          <div>
                            <h4 className="mb-2 font-semibold">Status</h4>
                            <p className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </p>
                          </div>
                          <div>
                            <h4 className="mb-2 font-semibold">Scheduled Date</h4>
                            <p>{new Date(booking.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <h4 className="mb-2 font-semibold">Estimated Cost</h4>
                            <p>${booking.estimatedCost.toLocaleString()}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Chat Support */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Chat with Medical Travel Advisor</CardTitle>
              <CardDescription>Get real-time assistance with your bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 h-[400px] space-y-4 overflow-y-auto rounded-lg border bg-muted/50 p-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className="mt-1 text-xs opacity-70">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[80px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  className="px-8"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockFAQs.map((faq, index) => (
                <div key={index}>
                  <h4 className="mb-2 font-semibold">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BookingManagement 