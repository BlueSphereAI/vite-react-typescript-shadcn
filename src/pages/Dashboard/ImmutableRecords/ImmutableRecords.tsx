'use client'

import React, { useState } from 'react'
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

export function ImmutableRecords() {
  const [selectedRecord, setSelectedRecord] = useState<typeof mockRecords[0] | null>(null)

  const verifyOnBlockchain = (hash: string) => {
    // TODO: Implement actual blockchain verification
    console.log('Verifying hash:', hash)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Immutable Record Log</h1>
        <p className="mt-2 text-gray-600">
          View and verify all contract-related activities recorded on the blockchain.
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Contract ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Blockchain Hash</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.timestamp}</TableCell>
                <TableCell>{record.action}</TableCell>
                <TableCell>{record.contractId}</TableCell>
                <TableCell>
                  <Badge
                    variant={record.status === 'Verified' ? 'default' : 'secondary'}
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{record.hash}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRecord(record)}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 