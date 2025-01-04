'use client'

import React, { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Progress } from '../../../components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog'
import { Textarea } from '../../../components/ui/textarea'

type ContractStatus = 'pending' | 'review' | 'approved' | 'rejected'
type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

// Mock data for demonstration
const mockContracts = [
  {
    id: 'CTR-2024-001',
    title: 'Project Alpha Contract',
    submittedBy: 'John Doe',
    department: 'IT',
    status: 'pending' as ContractStatus,
    currentStage: 2,
    totalStages: 4,
    stages: [
      { name: 'Initial Review', completed: true, approver: 'Jane Smith', date: '2024-01-20' },
      { name: 'Legal Review', completed: true, approver: 'Mike Johnson', date: '2024-01-21' },
      { name: 'Financial Review', completed: false },
      { name: 'Final Approval', completed: false },
    ],
  },
  {
    id: 'CTR-2024-002',
    title: 'Project Beta Contract',
    submittedBy: 'Alice Brown',
    department: 'Finance',
    status: 'review' as ContractStatus,
    currentStage: 1,
    totalStages: 4,
    stages: [
      { name: 'Initial Review', completed: true, approver: 'John Doe', date: '2024-01-22' },
      { name: 'Legal Review', completed: false },
      { name: 'Financial Review', completed: false },
      { name: 'Final Approval', completed: false },
    ],
  },
]

export function ApprovalWorkflow() {
  const [selectedContract, setSelectedContract] = useState<typeof mockContracts[0] | null>(null)
  const [comments, setComments] = useState('')

  const handleApprove = (contract: typeof mockContracts[0]) => {
    // TODO: Implement actual approval logic
    console.log('Approving contract:', contract.id)
  }

  const handleReject = (contract: typeof mockContracts[0]) => {
    // TODO: Implement actual rejection logic
    console.log('Rejecting contract:', contract.id)
  }

  const getStatusBadge = (status: ContractStatus): BadgeVariant => {
    const variants: Record<ContractStatus, BadgeVariant> = {
      pending: 'secondary',
      review: 'default',
      approved: 'default',
      rejected: 'destructive',
    }
    return variants[status]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Approval Workflow</h1>
        <p className="mt-2 text-gray-600">
          Review and approve contracts through the defined workflow stages.
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {mockContracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {contract.title}
                </CardTitle>
                <Badge variant={getStatusBadge(contract.status)}>
                  {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Submitted by: {contract.submittedBy}</span>
                    <span className="text-gray-500">Department: {contract.department}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Approval Progress</span>
                      <span>{contract.currentStage} of {contract.totalStages} stages</span>
                    </div>
                    <Progress value={(contract.currentStage / contract.totalStages) * 100} />
                  </div>

                  <div className="flex justify-between items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Contract Approval Details</DialogTitle>
                          <DialogDescription>
                            Review the approval stages and current status.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {contract.stages.map((stage, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <div className={`w-2 h-2 rounded-full ${
                                stage.completed ? 'bg-green-500' : 'bg-gray-300'
                              }`} />
                              <div className="flex-1">
                                <p className="font-medium">{stage.name}</p>
                                {stage.completed && (
                                  <p className="text-sm text-gray-500">
                                    Approved by {stage.approver} on {stage.date}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Comments</label>
                            <Textarea
                              placeholder="Add your comments..."
                              value={comments}
                              onChange={(e) => setComments(e.target.value)}
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleReject(contract)}
                      >
                        Reject
                      </Button>
                      <Button
                        onClick={() => handleApprove(contract)}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="approved">
          <Alert>
            <AlertTitle>No Approved Contracts</AlertTitle>
            <AlertDescription>
              There are currently no approved contracts to display.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="rejected">
          <Alert>
            <AlertTitle>No Rejected Contracts</AlertTitle>
            <AlertDescription>
              There are currently no rejected contracts to display.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
} 