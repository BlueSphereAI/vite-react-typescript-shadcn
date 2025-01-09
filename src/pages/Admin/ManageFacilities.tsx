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
import { facilitiesApi } from "@/lib/api"
import { generateUUID } from '@/lib/utils'

interface Facility {
  uuid: string
  name: string
  location: string
  certifications: string
  doctor_info: string
  patient_reviews: string
}

export const ManageFacilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [error, setError] = useState<string | null>(null)
  const [newFacility, setNewFacility] = useState({
    name: '',
    location: '',
    certifications: '',
    doctor_info: '',
    patient_reviews: ''
  })

  const fetchFacilities = async () => {
    try {
      const response = await facilitiesApi.getAll()
      if (response.error) throw new Error(response.error)
      setFacilities(response.data ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch facilities')
    }
  }

  useEffect(() => {
    fetchFacilities()
  }, [])

  const handleAddFacility = async () => {
    try {
      if (!newFacility.name || !newFacility.location) {
        setError('Please fill in all required fields')
        return
      }

      const response = await facilitiesApi.create({
        ...newFacility,
        uuid: generateUUID()
      })
      if (response.error) throw new Error(response.error)

      // Reset form and refresh list
      setNewFacility({
        name: '',
        location: '',
        certifications: '',
        doctor_info: '',
        patient_reviews: ''
      })
      await fetchFacilities()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add facility')
    }
  }

  const handleDeleteFacility = async (facilityId: string) => {
    try {
      const response = await facilitiesApi.delete(facilityId)
      if (response.error) throw new Error(response.error)
      await fetchFacilities()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete facility')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Facilities</CardTitle>
          <CardDescription>Add, edit, or remove medical facilities</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Add New Facility */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-6">Add New Facility</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Facility</DialogTitle>
                <DialogDescription>
                  Enter the details for the new medical facility
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Facility Name *</Label>
                  <Input
                    id="name"
                    value={newFacility.name}
                    onChange={(e) => setNewFacility(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Global Health Center"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={newFacility.location}
                    onChange={(e) => setNewFacility(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Mexico City, Mexico"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea
                    id="certifications"
                    value={newFacility.certifications}
                    onChange={(e) => setNewFacility(prev => ({ ...prev, certifications: e.target.value }))}
                    placeholder="List of certifications and accreditations..."
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="doctor_info">Medical Team Information</Label>
                  <Textarea
                    id="doctor_info"
                    value={newFacility.doctor_info}
                    onChange={(e) => setNewFacility(prev => ({ ...prev, doctor_info: e.target.value }))}
                    placeholder="Information about doctors and medical staff..."
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="patient_reviews">Patient Reviews</Label>
                  <Textarea
                    id="patient_reviews"
                    value={newFacility.patient_reviews}
                    onChange={(e) => setNewFacility(prev => ({ ...prev, patient_reviews: e.target.value }))}
                    placeholder="Summary of patient reviews and ratings..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddFacility}>Add Facility</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Facilities List */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Certifications</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facilities.map((facility) => (
                <TableRow key={facility.uuid}>
                  <TableCell className="font-medium">{facility.name}</TableCell>
                  <TableCell>{facility.location}</TableCell>
                  <TableCell>{facility.certifications}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteFacility(facility.uuid)}
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