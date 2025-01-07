'use client'

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  sender: 'user' | 'advisor'
  message: string
  timestamp: Date
}

export const Booking = () => {
  const { id } = useParams()
  const [date, setDate] = useState<Date>()
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'advisor',
      message: 'Hello! I\'m your virtual advisor. How can I help you with your medical travel booking today?',
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    procedure: 'Knee Replacement',
    preferredDate: null as Date | null,
    specialRequirements: ''
  })

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date()
    }
    
    setChatMessages(prev => [...prev, userMessage])
    setNewMessage('')

    // Simulate advisor response
    setTimeout(() => {
      const advisorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'advisor',
        message: 'I understand your query. Let me help you with that. Please fill out the booking form with your details, and I\'ll assist you further.',
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, advisorMessage])
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/procedures" className="hover:text-primary">Procedures</Link>
        <span className="mx-2">/</span>
        <Link to={`/procedures/${id}`} className="hover:text-primary">Procedure Details</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Booking Simulation</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Booking Request Form</CardTitle>
              <CardDescription>
                Fill in your details to simulate a booking request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={bookingDetails.phone}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Special Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={bookingDetails.specialRequirements}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, specialRequirements: e.target.value }))}
                    placeholder="Any special requirements or notes..."
                  />
                </div>

                <Button type="submit" className="w-full">Submit Booking Request</Button>
              </form>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>
                Review your booking details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Procedure</dt>
                  <dd className="font-medium">{bookingDetails.procedure}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Patient Name</dt>
                  <dd className="font-medium">{bookingDetails.name || 'Not specified'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Preferred Date</dt>
                  <dd className="font-medium">
                    {date ? format(date, "PPP") : 'Not specified'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Contact</dt>
                  <dd className="font-medium">
                    {bookingDetails.email && bookingDetails.phone 
                      ? `${bookingDetails.email} | ${bookingDetails.phone}`
                      : 'Not specified'
                    }
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Virtual Advisor Chat */}
        <div>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://mediglobal-connect.greensphere.one/images/advisor-avatar.jpg" />
                  <AvatarFallback>VA</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Virtual Advisor</CardTitle>
                  <CardDescription>Here to help with your booking</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 space-y-4 mb-4 max-h-[500px] overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-2",
                      msg.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.sender === 'advisor' && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://mediglobal-connect.greensphere.one/images/advisor-avatar.jpg" />
                        <AvatarFallback>VA</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "rounded-lg p-3 max-w-[80%]",
                        msg.sender === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <span className="text-xs opacity-70">
                        {format(msg.timestamp, "HH:mm")}
                      </span>
                    </div>
                    {msg.sender === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>ME</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
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