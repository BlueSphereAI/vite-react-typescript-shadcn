'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  ChevronDown
} from 'lucide-react'

interface TimelineEvent {
  id: string
  type: 'submission' | 'negotiation' | 'approval' | 'rejection'
  title: string
  description: string
  timestamp: Date
  user: string
  details?: string
}

const mockEvents: TimelineEvent[] = [
  {
    id: '1',
    type: 'submission',
    title: 'Contract Submitted',
    description: 'Initial contract document uploaded',
    timestamp: new Date('2024-01-20T09:00:00'),
    user: 'John Doe',
    details: 'Contract ID: CTR-2024-001'
  },
  {
    id: '2',
    type: 'negotiation',
    title: 'Negotiation Started',
    description: 'Terms discussion initiated',
    timestamp: new Date('2024-01-20T10:30:00'),
    user: 'Jane Smith',
    details: 'Discussing delivery timeline'
  },
  {
    id: '3',
    type: 'approval',
    title: 'Department Approval',
    description: 'First level approval received',
    timestamp: new Date('2024-01-21T14:15:00'),
    user: 'Mike Johnson',
    details: 'Approved with minor comments'
  }
]

const getEventIcon = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'submission':
      return <FileText className="h-5 w-5" />
    case 'negotiation':
      return <MessageSquare className="h-5 w-5" />
    case 'approval':
      return <CheckCircle className="h-5 w-5" />
    case 'rejection':
      return <XCircle className="h-5 w-5" />
    default:
      return <Clock className="h-5 w-5" />
  }
}

const getEventColor = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'submission':
      return 'bg-blue-500 text-white'
    case 'negotiation':
      return 'bg-purple-500 text-white'
    case 'approval':
      return 'bg-green-500 text-white'
    case 'rejection':
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

export function AuditTrail() {
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set())

  const toggleEvent = (eventId: string) => {
    const newExpanded = new Set(expandedEvents)
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId)
    } else {
      newExpanded.add(eventId)
    }
    setExpandedEvents(newExpanded)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Contract Audit Trail</h2>
          <p className="text-gray-600 mt-2">
            Track all activities and changes throughout the contract lifecycle
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />

            {/* Timeline Events */}
            <div className="space-y-6">
              {mockEvents.map((event) => (
                <div key={event.id} className="relative pl-14">
                  {/* Event Icon */}
                  <div
                    className={`absolute left-0 p-2 rounded-full ${getEventColor(
                      event.type
                    )}`}
                  >
                    {getEventIcon(event.type)}
                  </div>

                  {/* Event Content */}
                  <div className="bg-white rounded-lg border p-4">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-between p-0 h-auto hover:bg-transparent"
                      onClick={() => toggleEvent(event.id)}
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                      {expandedEvents.has(event.id) ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </Button>

                    {/* Expanded Details */}
                    {expandedEvents.has(event.id) && (
                      <div className="mt-4 pt-4 border-t">
                        <dl className="space-y-2 text-sm">
                          <div>
                            <dt className="text-gray-500">Timestamp</dt>
                            <dd className="font-medium text-gray-900">
                              {event.timestamp.toLocaleString()}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">User</dt>
                            <dd className="font-medium text-gray-900">{event.user}</dd>
                          </div>
                          {event.details && (
                            <div>
                              <dt className="text-gray-500">Details</dt>
                              <dd className="font-medium text-gray-900">
                                {event.details}
                              </dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
} 