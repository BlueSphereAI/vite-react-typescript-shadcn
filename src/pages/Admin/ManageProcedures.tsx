'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { proceduresApi } from "@/lib/api"

interface Procedure {
  uuid: string
  name: string
  description: string
}

export const ManageProcedures = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [error, setError] = useState<string | null>(null)
  const [newProcedure, setNewProcedure] = useState({
    name: '',
    description: ''
  })

  const fetchProcedures = async () => {
    try {
      const response = await proceduresApi.getAll()
      if (response.error) throw new Error(response.error)
      setProcedures(response.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch procedures')
    }
  }

  useEffect(() => {
    fetchProcedures()
  }, [])

  const handleAddProcedure = async () => {
    try {
      if (!newProcedure.name || !newProcedure.description) {
        setError('Please fill in all fields')
        return
      }

      const response = await proceduresApi.create(newProcedure)
      if (response.error) throw new Error(response.error)

      // Reset form and refresh list
      setNewProcedure({ name: '', description: '' })
      await fetchProcedures()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add procedure')
    }
  }

  const handleDeleteProcedure = async (procedureId: string) => {
    try {
      const response = await proceduresApi.delete(procedureId)
      if (response.error) throw new Error(response.error)
      await fetchProcedures()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete procedure')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Procedures</CardTitle>
          <CardDescription>Add, edit, or remove medical procedures</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Add New Procedure */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-6">Add New Procedure</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Procedure</DialogTitle>
                <DialogDescription>
                  Enter the details for the new medical procedure
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Procedure Name</Label>
                  <Input
                    id="name"
                    value={newProcedure.name}
                    onChange={(e) => setNewProcedure(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Knee Replacement"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProcedure.description}
                    onChange={(e) => setNewProcedure(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of the procedure..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddProcedure}>Add Procedure</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Procedures List */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {procedures.map((procedure) => (
                <TableRow key={procedure.uuid}>
                  <TableCell className="font-medium">{procedure.name}</TableCell>
                  <TableCell>{procedure.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProcedure(procedure.uuid)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 