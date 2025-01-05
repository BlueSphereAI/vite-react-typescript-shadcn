'use client'

import { useState } from 'react'
import { Badge } from '../../../components/ui/badge'
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
import { Loader2 } from 'lucide-react'

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
  const [isVerifying, setIsVerifying] = useState(false)

  const verifyOnBlockchain = async (hash: string) => {
    setVerifyingHash(hash)
    setIsVerifying(true)
    // Simulate blockchain verification delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsVerifying(false)
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
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Immutable Record Log</h1>
        <p className="mt-2 text-gray-600">
          View and verify all contract-related activities recorded on the blockchain.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 sticky top-0 bg-white/80 backdrop-blur-sm py-4 z-10">
        <div className="flex-1">
          <Input
            placeholder="Search by action, contract ID, or details..."
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
          <Card 
            key={record.id} 
            className="transition-all hover:shadow-md border-l-4 hover:border-l-8"
            style={{
              borderLeftColor: record.status === 'Verified' ? '#22c55e' : '#94a3b8'
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-lg">{record.action}</span>
                    <Badge
                      variant={record.status === 'Verified' ? 'default' : 'secondary'}
                      className="rounded-full"
                    >
                      {record.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>{record.timestamp}</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium">{record.contractId}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Record Details</DialogTitle>
                        <DialogDescription>
                          Complete information about this record.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="grid gap-4 py-4 border rounded-lg p-4 bg-gray-50">
                          <div>
                            <h4 className="font-semibold text-gray-700">Action</h4>
                            <p className="text-sm text-gray-600">{record.action}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700">Details</h4>
                            <p className="text-sm text-gray-600">{record.details}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700">Blockchain Hash</h4>
                            <p className="text-sm font-mono text-gray-600 break-all">{record.hash}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700">Timestamp</h4>
                            <p className="text-sm text-gray-600">{record.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="default"
                    size="sm"
                    className="rounded-full"
                    onClick={() => verifyOnBlockchain(record.hash)}
                  >
                    Verify
                  </Button>
                </div>
              </div>
              <div className="mt-3 border-t pt-3">
                <p className="text-sm text-gray-600 line-clamp-2">{record.details}</p>
              </div>
              <div className="mt-2 font-mono text-xs text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                Hash: {record.hash}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredRecords.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border">
            <p className="text-gray-500">No records found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Verification Dialog */}
      <Dialog open={!!verifyingHash} onOpenChange={() => !isVerifying && setVerifyingHash(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Blockchain Verification</DialogTitle>
            <DialogDescription>
              {isVerifying ? 'Verifying record on blockchain...' : `Verification result for hash: ${verifyingHash}`}
            </DialogDescription>
          </DialogHeader>
          {isVerifying ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : (
            <Alert className="bg-green-50 border-green-200">
              <AlertTitle className="text-green-800 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Verification Successful
              </AlertTitle>
              <AlertDescription className="text-green-700">
                This record has been verified on the blockchain. The hash and contents match the blockchain entry. 
                The record is immutable and cannot be altered.
              </AlertDescription>
            </Alert>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 