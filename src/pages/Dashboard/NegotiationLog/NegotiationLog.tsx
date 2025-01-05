'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { Send, User, Users, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Message {
  id: string
  text: string
  sender: string
  timestamp: Date
  avatar?: string
  role?: string
}

interface Participant {
  id: string
  name: string
  role: string
  avatar?: string
  status: 'online' | 'offline'
}

const mockContracts = [
  { id: 'CTR-001', title: 'Software Development Agreement' },
  { id: 'CTR-002', title: 'Office Lease Contract' },
  { id: 'CTR-003', title: 'Service Level Agreement' },
]

const mockParticipants: Participant[] = [
  { id: '1', name: 'John Doe', role: 'Contract Manager', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: '2', name: 'Jane Smith', role: 'Legal Advisor', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: '3', name: 'Mike Johnson', role: 'Department Head', status: 'offline', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
]

export function NegotiationLog() {
  const [selectedContract, setSelectedContract] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [participants, setParticipants] = useState(mockParticipants)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedContract) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'Current User',
      timestamp: new Date(),
      role: 'Contract Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Current'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleContractSelect = (contractId: string) => {
    setSelectedContract(contractId)
    // Simulate loading messages for the selected contract
    setMessages([
      {
        id: '1',
        text: 'Initial contract terms proposed for review.',
        sender: 'John Doe',
        timestamp: new Date('2024-01-20T10:00:00'),
        role: 'Contract Manager',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      },
      {
        id: '2',
        text: 'Requesting clarification on section 3.2 regarding delivery terms.',
        sender: 'Jane Smith',
        timestamp: new Date('2024-01-20T10:05:00'),
        role: 'Legal Advisor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
      }
    ])
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      {!selectedContract ? (
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Contract</h2>
          <div className="space-y-4">
            {mockContracts.map((contract) => (
              <Button
                key={contract.id}
                variant="outline"
                className="w-full justify-start h-auto py-4"
                onClick={() => handleContractSelect(contract.id)}
              >
                <div>
                  <h3 className="font-semibold text-left">{contract.title}</h3>
                  <p className="text-sm text-gray-500 text-left">ID: {contract.id}</p>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <Select value={selectedContract} onValueChange={handleContractSelect}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select contract" />
                </SelectTrigger>
                <SelectContent>
                  {mockContracts.map((contract) => (
                    <SelectItem key={contract.id} value={contract.id}>
                      {contract.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                {participants.filter(p => p.status === 'online').length} participants online
              </p>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Participants</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <div className="space-y-4">
                    {participants.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={participant.avatar} />
                            <AvatarFallback>{participant.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            <p className="text-sm text-gray-500">{participant.role}</p>
                          </div>
                        </div>
                        <Badge
                          variant={participant.status === 'online' ? 'default' : 'secondary'}
                        >
                          {participant.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
                    <Avatar>
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div
                    className={`flex flex-col max-w-[70%] ${
                      message.sender === 'Current User' ? 'items-end' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{message.sender}</span>
                      {message.role && (
                        <span className="text-xs text-gray-500">({message.role})</span>
                      )}
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
      )}
    </div>
  )
} 