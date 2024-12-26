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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { BookingSimulation } from '@/types'

// Mock data for demonstration
const mockBookings: BookingSimulation[] = [
  {
    id: 'booking1',
    procedureId: 'proc1',
    facilityId: 'facility1',
    status: 'pending',
    date: '2024-02-15',
    totalCost: 15000,
  },
  {
    id: 'booking2',
    procedureId: 'proc2',
    facilityId: 'facility2',
    status: 'confirmed',
    date: '2024-03-01',
    totalCost: 31000,
  },
]

const mockFAQs = [
  {
    question: 'How does the booking process work?',
    answer:
      'Our booking process is simple: select your procedure, choose a facility, and submit your request. Our team will then guide you through the next steps.',
  },
  {
    question: 'What happens after I request a booking?',
    answer:
      'Our team will review your request and contact you within 24 hours to discuss details, answer questions, and help plan your medical journey.',
  },
  {
    question: 'Can I cancel or modify my booking?',
    answer:
      'Yes, you can modify or cancel your booking up to 14 days before the scheduled date without any penalty.',
  },
]

const Support = () => {
  const [chatMessages, setChatMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([
    {
      text: 'Hello! How can I assist you today with your medical travel plans?',
      isUser: false,
    },
  ])
  const [messageInput, setMessageInput] = useState('')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    // Add user message
    setChatMessages((prev) => [
      ...prev,
      { text: messageInput, isUser: true },
    ])

    // Simulate automated response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          text: "Thank you for your message. Our support team will get back to you shortly. In the meantime, feel free to check our FAQ section for quick answers to common questions.",
          isUser: false,
        },
      ])
    }, 1000)

    setMessageInput('')
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Booking Management & Support</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Booking Management Section */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">Your Bookings</h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{formatDate(booking.date)}</TableCell>
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
                        <TableCell className="text-right">
                          {formatCurrency(booking.totalCost)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Booking Details</DialogTitle>
                                <DialogDescription>
                                  View and manage your booking
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="font-semibold">Date</p>
                                    <p className="text-muted-foreground">
                                      {formatDate(booking.date)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-semibold">Status</p>
                                    <p className="text-muted-foreground">
                                      {booking.status}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-semibold">Total Cost</p>
                                    <p className="text-muted-foreground">
                                      {formatCurrency(booking.totalCost)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    className="flex-1"
                                  >
                                    Modify
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    className="flex-1"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {mockFAQs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="mb-2 font-semibold">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Support Section */}
        <div>
          <Card className="flex h-[600px] flex-col">
            <CardContent className="flex flex-1 flex-col p-6">
              <h2 className="mb-6 text-xl font-semibold">Chat Support</h2>
              
              {/* Chat Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="mt-4 flex space-x-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Support 