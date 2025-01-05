'use client'

import { useState } from 'react'
import { Badge } from '../../../components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert'
import { Input } from '../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Card, CardContent } from '../../../components/ui/card'

// Mock data for demonstration
const mockRecords = [
  {
    id: '1',
    timestamp: '2024-01-20 14:30:00',
    action: 'Contract Submission',
    contractId: 'CTR-2024-001',
    hash: '0x1234...5678',
    status: 'Verified',
    details: 'Initial contract submission for Project Alpha',
  },
  {
    id: '2',
    timestamp: '2024-01-20 15:45:00',
    action: 'Contract Amendment',
    contractId: 'CTR-2024-001',
    hash: '0x5678...9012',
    status: 'Verified',
    details: 'Budget adjustment for Q1 deliverables',
  },
  {
    id: '3',
    timestamp: '2024-01-21 09:15:00',
    action: 'Contract Approval',
    contractId: 'CTR-2024-001',
    hash: '0x9012...3456',
    status: 'Pending',
    details: 'Final approval by department head',
  },
]

type FilterType = 'all' | 'submission' | 'amendment' | 'approval'

export function ImmutableRecords() {
  const [verifyingHash, setVerifyingHash] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<FilterType>('all')

  const verifyOnBlockchain = (hash: string) => {
    setVerifyingHash(hash)
    console.log('Verifying hash:', hash)
  }

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = 
      record.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.contractId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.details.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = 
      filterType === 'all' || 
      record.action.toLowerCase().includes(filterType.toLowerCase())

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Immutable Record Log</h1>
        <p className="mt-2 text-gray-600">
          View and verify all contract-related activities recorded on the blockchain.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Select
          value={filterType}
          onValueChange={(value) => setFilterType(value as FilterType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Records</SelectItem>
            <SelectItem value="submission">Submissions</SelectItem>
            <SelectItem value="amendment">Amendments</SelectItem>
            <SelectItem value="approval">Approvals</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{record.action}</span>
                    <Badge
                      variant={record.status === 'Verified' ? 'default' : 'secondary'}
                    >
                      {record.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>{record.timestamp}</span>
                    <span className="mx-2">•</span>
                    <span>{record.contractId}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Record Details</DialogTitle>
                        <DialogDescription>
                          Complete information about this record.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Action</h4>
                          <p className="text-sm text-gray-600">{record.action}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Details</h4>
                          <p className="text-sm text-gray-600">{record.details}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Blockchain Hash</h4>
                          <p className="text-sm font-mono text-gray-600">{record.hash}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Timestamp</h4>
                          <p className="text-sm text-gray-600">{record.timestamp}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => verifyOnBlockchain(record.hash)}
                  >
                    Verify
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600 line-clamp-2">{record.details}</p>
              </div>
              <div className="mt-2 font-mono text-xs text-gray-500">
                Hash: {record.hash}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No records found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Verification Dialog */}
      <Dialog open={!!verifyingHash} onOpenChange={() => setVerifyingHash(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Blockchain Verification</DialogTitle>
            <DialogDescription>
              Verification result for hash: {verifyingHash}
            </DialogDescription>
          </DialogHeader>
          <Alert>
            <AlertTitle>Verification Successful</AlertTitle>
            <AlertDescription>
              This record has been verified on the blockchain. The hash and contents match the blockchain entry.
            </AlertDescription>
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  )
} 