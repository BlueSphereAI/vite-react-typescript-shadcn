'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react'

interface Contract {
  id: string
  title: string
  submittedBy: string
  submittedDate: Date
  status: 'pending' | 'approved' | 'rejected' | 'changes_requested'
  type: string
  version: string
}

const mockContracts: Contract[] = [
  {
    id: 'CTR-2024-001',
    title: 'Software Development Agreement',
    submittedBy: 'John Doe',
    submittedDate: new Date('2024-01-20'),
    status: 'pending',
    type: 'Service Contract',
    version: '1.0'
  },
  {
    id: 'CTR-2024-002',
    title: 'Office Lease Agreement',
    submittedBy: 'Jane Smith',
    submittedDate: new Date('2024-01-21'),
    status: 'pending',
    type: 'Lease Agreement',
    version: '1.0'
  },
  {
    id: 'CTR-2024-003',
    title: 'IT Support Contract',
    submittedBy: 'Mike Johnson',
    submittedDate: new Date('2024-01-22'),
    status: 'changes_requested',
    type: 'Service Contract',
    version: '1.1'
  }
]

export function ApprovalWorkflow() {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'request_changes' | null>(null)
  const [comments, setComments] = useState('')

  const handleAction = (contract: Contract, type: typeof actionType) => {
    setSelectedContract(contract)
    setActionType(type)
    setComments('')
  }

  const handleConfirmAction = () => {
    if (!selectedContract || !actionType) return

    const newStatus = actionType === 'approve' 
      ? 'approved' 
      : actionType === 'reject'
      ? 'rejected'
      : 'changes_requested'

    setContracts(prevContracts =>
      prevContracts.map(c =>
        c.id === selectedContract.id
          ? { ...c, status: newStatus }
          : c
      )
    )

    setSelectedContract(null)
    setActionType(null)
    setComments('')
  }

  const getStatusBadge = (status: Contract['status']) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>
      case 'changes_requested':
        return <Badge variant="secondary">Changes Requested</Badge>
      default:
        return <Badge variant="outline">Pending Review</Badge>
    }
  }

  const getActionButtons = (contract: Contract) => {
    if (contract.status === 'approved' || contract.status === 'rejected') {
      return null
    }

    return (
      <div className="flex gap-2">
        <Button
          size="sm"
          className="bg-green-500 hover:bg-green-600"
          onClick={() => handleAction(contract, 'approve')}
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Approve
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAction(contract, 'request_changes')}
        >
          <Clock className="h-4 w-4 mr-1" />
          Request Changes
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleAction(contract, 'reject')}
        >
          <XCircle className="h-4 w-4 mr-1" />
          Reject
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Contract Approval Workflow</h2>
          <p className="text-gray-600 mt-2">
            Review and approve contracts or request changes
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-16rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.id}</TableCell>
                  <TableCell>{contract.title}</TableCell>
                  <TableCell>{contract.type}</TableCell>
                  <TableCell>{contract.version}</TableCell>
                  <TableCell>{contract.submittedBy}</TableCell>
                  <TableCell>{contract.submittedDate.toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(contract.status)}</TableCell>
                  <TableCell>{getActionButtons(contract)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      <Dialog open={!!selectedContract && !!actionType} onOpenChange={() => {
        setSelectedContract(null)
        setActionType(null)
        setComments('')
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {actionType === 'approve' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Approve Contract
                </>
              ) : actionType === 'reject' ? (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Reject Contract
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Request Changes
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {selectedContract && (
              <div className="text-sm">
                <p><span className="font-medium">Contract ID:</span> {selectedContract.id}</p>
                <p><span className="font-medium">Title:</span> {selectedContract.title}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Comments</label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder={
                  actionType === 'approve'
                    ? 'Add any approval comments...'
                    : actionType === 'reject'
                    ? 'Specify the reason for rejection...'
                    : 'Describe the changes required...'
                }
                className="h-32"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedContract(null)
                setActionType(null)
                setComments('')
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAction}
              className={
                actionType === 'approve'
                  ? 'bg-green-500 hover:bg-green-600'
                  : actionType === 'reject'
                  ? 'bg-red-500 hover:bg-red-600'
                  : ''
              }
              disabled={!comments.trim()}
            >
              Confirm {actionType === 'approve' ? 'Approval' : actionType === 'reject' ? 'Rejection' : 'Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 