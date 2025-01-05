'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { Send, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: string
  timestamp: Date
}

export function NegotiationLog() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Initial contract terms proposed.',
      sender: 'John Doe',
      timestamp: new Date('2024-01-20T10:00:00')
    },
    {
      id: '2',
      text: 'Requesting clarification on section 3.2',
      sender: 'Jane Smith',
      timestamp: new Date('2024-01-20T10:05:00')
    }
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'Current User',
      timestamp: new Date()
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      <Card className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Contract Negotiation - #123</h2>
          <p className="text-sm text-gray-500">Active participants: 3</p>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'Current User' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div
                  className={`flex flex-col max-w-[70%] ${
                    message.sender === 'Current User' ? 'items-end' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{message.sender}</span>
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === 'Current User'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
} 