'use client'

import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Card, CardContent } from '../../../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'

// Mock data for demonstration
const mockContracts = [
  { id: 'CTR-2024-001', title: 'Project Alpha Contract' },
  { id: 'CTR-2024-002', title: 'Project Beta Contract' },
  { id: 'CTR-2024-003', title: 'Project Gamma Contract' },
]

const mockMessages = [
  {
    id: '1',
    contractId: 'CTR-2024-001',
    sender: 'John Doe',
    role: 'Contract Manager',
    avatar: '/avatars/john.jpg',
    message: 'I suggest we revise section 3.2 regarding the delivery timeline.',
    timestamp: '2024-01-20 14:30:00',
  },
  {
    id: '2',
    contractId: 'CTR-2024-001',
    sender: 'Jane Smith',
    role: 'Legal Advisor',
    avatar: '/avatars/jane.jpg',
    message: 'Agreed. The current timeline might be too aggressive. We should extend it by 2 weeks.',
    timestamp: '2024-01-20 14:35:00',
  },
  {
    id: '3',
    contractId: 'CTR-2024-001',
    sender: 'Mike Johnson',
    role: 'Department Head',
    avatar: '/avatars/mike.jpg',
    message: 'That works for me. Please update the document accordingly.',
    timestamp: '2024-01-20 14:40:00',
  },
]

export function NegotiationLog() {
  const [selectedContract, setSelectedContract] = useState<string>('')
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages)

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContract) return

    const message = {
      id: (messages.length + 1).toString(),
      contractId: selectedContract,
      sender: 'Current User',
      role: 'Contract Manager',
      avatar: '/avatars/user.jpg',
      message: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const filteredMessages = messages.filter(
    (message) => message.contractId === selectedContract
  )

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Negotiation Log</h1>
        <p className="mt-2 text-gray-600">
          Discuss and negotiate contract terms with stakeholders.
        </p>
      </div>

      {/* Contract Selection */}
      <div className="w-full max-w-xs">
        <Select
          value={selectedContract}
          onValueChange={(value) => setSelectedContract(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a contract" />
          </SelectTrigger>
          <SelectContent>
            {mockContracts.map((contract) => (
              <SelectItem key={contract.id} value={contract.id}>
                {contract.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Messages Area */}
      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-4 space-y-4 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4">
            {selectedContract ? (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-start space-x-4"
                >
                  <Avatar>
                    <AvatarImage src={message.avatar} alt={message.sender} />
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{message.sender}</span>
                      <span className="text-sm text-gray-500">({message.role})</span>
                    </div>
                    <p className="text-gray-700">{message.message}</p>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a contract to view negotiations
              </div>
            )}
          </div>

          {/* Message Input */}
          {selectedContract && (
            <div className="flex space-x-2 pt-4 border-t">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 