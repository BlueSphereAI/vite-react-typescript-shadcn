'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
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
  },
  {
    id: '4',
    timestamp: '2024-01-21T14:20:00',
    action: 'Contract Approval',
    contractId: 'CTR-2024-001',
    user: 'Sarah Wilson',
    role: 'Senior Manager',
    details: 'Final approval granted',
    category: 'approval',
  },
]

const categories = [
  { label: 'All Activities', value: 'all' },
  { label: 'Submissions', value: 'submission' },
  { label: 'Reviews', value: 'review' },
  { label: 'Amendments', value: 'amendment' },
  { label: 'Approvals', value: 'approval' },
]

export function AuditTrail() {
  const [date, setDate] = useState<Date>()
  const [category, setCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAuditTrail = mockAuditTrail
    .filter((item) => {
      if (category !== 'all' && item.category !== category) return false
      if (date && !format(new Date(item.timestamp), 'yyyy-MM-dd').includes(format(date, 'yyyy-MM-dd'))) return false
      if (searchQuery && !Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )) return false
      return true
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const getCategoryColor = (category: string) => {
    const colors = {
      submission: 'bg-blue-500',
      review: 'bg-yellow-500',
      amendment: 'bg-purple-500',
      approval: 'bg-green-500',
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
      <div className="flex flex-wrap gap-4">
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
      <div className="space-y-4">
        {filteredAuditTrail.map((item, index) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-3 h-3 rounded-full mt-2 ${getCategoryColor(item.category)}`} />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{item.action}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{format(new Date(item.timestamp), 'PPpp')}</span>
                        <span>•</span>
                        <span>{item.contractId}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <p className="text-gray-600">{item.details}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{item.user}</span>
                    <span>•</span>
                    <span>{item.role}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAuditTrail.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No audit trail entries found matching your filters.
          </div>
        )}
      </div>
    </div>
  )
} 