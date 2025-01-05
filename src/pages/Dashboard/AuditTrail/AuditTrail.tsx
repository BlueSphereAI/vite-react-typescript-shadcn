'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Calendar } from '../../../components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover'
import { Badge } from '../../../components/ui/badge'
import { Card, CardContent } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { ScrollArea } from '../../../components/ui/scroll-area'

// Mock data for demonstration
const mockAuditTrail = [
  {
    id: '1',
    timestamp: '2024-01-20T14:30:00',
    action: 'Contract Submission',
    contractId: 'CTR-2024-001',
    user: 'John Doe',
    role: 'Contract Manager',
    details: 'Initial contract submission for Project Alpha',
    category: 'submission',
    changes: [
      { field: 'Title', from: null, to: 'Project Alpha Contract' },
      { field: 'Status', from: null, to: 'Pending Review' },
    ],
  },
  {
    id: '2',
    timestamp: '2024-01-20T15:45:00',
    action: 'Contract Review',
    contractId: 'CTR-2024-001',
    user: 'Jane Smith',
    role: 'Legal Advisor',
    details: 'Legal review completed with minor amendments',
    category: 'review',
    changes: [
      { field: 'Section 3.2', from: '30 days', to: '45 days' },
      { field: 'Status', from: 'Pending Review', to: 'Under Review' },
    ],
  },
  {
    id: '3',
    timestamp: '2024-01-21T09:15:00',
    action: 'Contract Amendment',
    contractId: 'CTR-2024-001',
    user: 'Mike Johnson',
    role: 'Department Head',
    details: 'Budget adjustments approved',
    category: 'amendment',
    changes: [
      { field: 'Budget', from: '$100,000', to: '$120,000' },
      { field: 'Timeline', from: 'Q2 2024', to: 'Q3 2024' },
    ],
  },
]

const categories = [
  { label: 'All Activities', value: 'all' },
  { label: 'Submissions', value: 'submission' },
  { label: 'Reviews', value: 'review' },
  { label: 'Amendments', value: 'amendment' },
]

export function AuditTrail() {
  const [date, setDate] = useState<Date>()
  const [category, setCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredAuditTrail = mockAuditTrail
    .filter((item) => {
      if (category !== 'all' && item.category !== category) return false
      if (date && !format(new Date(item.timestamp), 'yyyy-MM-dd').includes(format(date, 'yyyy-MM-dd'))) return false
      if (searchQuery && !Object.values(item).some(value => 
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )) return false
      return true
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const getCategoryColor = (category: string) => {
    const colors = {
      submission: 'bg-blue-500',
      review: 'bg-yellow-500',
      amendment: 'bg-purple-500',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-500'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit Trail</h1>
        <p className="mt-2 text-gray-600">
          View a complete timeline of all contract-related activities.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 sticky top-0 bg-white/80 backdrop-blur-sm py-4 z-10">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search audit trail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {categories.find((c) => c.value === category)?.label || 'Filter by Category'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((cat) => (
              <DropdownMenuItem
                key={cat.value}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {date && (
          <Button
            variant="ghost"
            onClick={() => setDate(undefined)}
          >
            Clear Date
          </Button>
        )}
      </div>

      {/* Timeline */}
      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className="relative space-y-4 pl-8 before:absolute before:left-4 before:top-2 before:h-[calc(100%-2rem)] before:w-0.5 before:bg-gray-200">
          {filteredAuditTrail.map((item) => (
            <Card key={item.id} className="relative">
              <div className={`absolute -left-8 top-6 w-4 h-4 rounded-full border-4 border-white ${getCategoryColor(item.category)}`} />
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{item.action}</h3>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{format(new Date(item.timestamp), 'PPpp')}</span>
                      <span>•</span>
                      <span>{item.contractId}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expandedItems.includes(item.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="mt-2 text-gray-600">{item.details}</p>
                {expandedItems.includes(item.id) && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    <div className="grid gap-2">
                      <div className="text-sm font-medium text-gray-500">Changes Made:</div>
                      {item.changes.map((change, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                          <div className="font-medium">{change.field}</div>
                          <div className="text-gray-500">
                            {change.from || '(empty)'}
                          </div>
                          <div className="text-gray-900">
                            {change.to}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Modified by:</span>
                      <span className="font-medium">{item.user}</span>
                      <span>•</span>
                      <span>{item.role}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {filteredAuditTrail.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border">
              <p className="text-gray-500">No audit trail entries found matching your filters.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
} 