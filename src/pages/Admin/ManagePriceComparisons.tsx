'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { proceduresApi, facilitiesApi, priceComparisonsApi } from "@/lib/api"
import { generateUUID } from '@/lib/utils'

interface Procedure {
  uuid: string
  name: string
}

interface Facility {
  uuid: string
  name: string
  location: string
}

interface PriceComparison {
  uuid: string
  procedure_id: string
  facility_id: string
  us_price: number
  international_price: number
  travel_cost: number
}

export const ManagePriceComparisons = () => {
  const [priceComparisons, setPriceComparisons] = useState<PriceComparison[]>([])
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [error, setError] = useState<string | null>(null)
  const [newComparison, setNewComparison] = useState({
    procedure_id: '',
    facility_id: '',
    us_price: 0,
    international_price: 0,
    travel_cost: 0
  })

  const fetchData = async () => {
    try {
      const [comparisonsRes, proceduresRes, facilitiesRes] = await Promise.all([
        priceComparisonsApi.getAll(),
        proceduresApi.getAll(),
        facilitiesApi.getAll()
      ])

      if (comparisonsRes.error) throw new Error(comparisonsRes.error)
      if (proceduresRes.error) throw new Error(proceduresRes.error)
      if (facilitiesRes.error) throw new Error(facilitiesRes.error)

      setPriceComparisons(comparisonsRes.data ?? [])
      setProcedures(proceduresRes.data ?? [])
      setFacilities(facilitiesRes.data ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAddComparison = async () => {
    try {
      if (!newComparison.procedure_id || !newComparison.facility_id) {
        setError('Please select both procedure and facility')
        return
      }

      if (newComparison.us_price <= 0 || newComparison.international_price <= 0) {
        setError('Prices must be greater than 0')
        return
      }

      const response = await priceComparisonsApi.create({
        ...newComparison,
        uuid: generateUUID()
      })
      if (response.error) throw new Error(response.error)

      // Reset form and refresh list
      setNewComparison({
        procedure_id: '',
        facility_id: '',
        us_price: 0,
        international_price: 0,
        travel_cost: 0
      })
      await fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add price comparison')
    }
  }

  const handleDeleteComparison = async (comparisonId: string) => {
    try {
      const response = await priceComparisonsApi.delete(comparisonId)
      if (response.error) throw new Error(response.error)
      await fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete price comparison')
    }
  }

  const getProcedureName = (procedureId: string) => {
    return procedures.find(p => p.uuid === procedureId)?.name || 'Unknown Procedure'
  }

  const getFacilityName = (facilityId: string) => {
    return facilities.find(f => f.uuid === facilityId)?.name || 'Unknown Facility'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Price Comparisons</CardTitle>
          <CardDescription>Add, edit, or remove price comparisons between procedures and facilities</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Add New Price Comparison */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-6">Add New Price Comparison</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Price Comparison</DialogTitle>
                <DialogDescription>
                  Enter the price comparison details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="procedure">Procedure *</Label>
                  <Select
                    value={newComparison.procedure_id}
                    onValueChange={(value) => setNewComparison(prev => ({ ...prev, procedure_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a procedure" />
                    </SelectTrigger>
                    <SelectContent>
                      {procedures.map((procedure) => (
                        <SelectItem key={procedure.uuid} value={procedure.uuid}>
                          {procedure.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facility">Facility *</Label>
                  <Select
                    value={newComparison.facility_id}
                    onValueChange={(value) => setNewComparison(prev => ({ ...prev, facility_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a facility" />
                    </SelectTrigger>
                    <SelectContent>
                      {facilities.map((facility) => (
                        <SelectItem key={facility.uuid} value={facility.uuid}>
                          {facility.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="us_price">US Price ($) *</Label>
                  <Input
                    id="us_price"
                    type="number"
                    value={newComparison.us_price}
                    onChange={(e) => setNewComparison(prev => ({ ...prev, us_price: Number(e.target.value) }))}
                    placeholder="e.g., 50000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="international_price">International Price ($) *</Label>
                  <Input
                    id="international_price"
                    type="number"
                    value={newComparison.international_price}
                    onChange={(e) => setNewComparison(prev => ({ ...prev, international_price: Number(e.target.value) }))}
                    placeholder="e.g., 15000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="travel_cost">Travel Cost ($)</Label>
                  <Input
                    id="travel_cost"
                    type="number"
                    value={newComparison.travel_cost}
                    onChange={(e) => setNewComparison(prev => ({ ...prev, travel_cost: Number(e.target.value) }))}
                    placeholder="e.g., 3000"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddComparison}>Add Price Comparison</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Price Comparisons List */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Procedure</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>US Price</TableHead>
                <TableHead>International Price</TableHead>
                <TableHead>Travel Cost</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Savings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceComparisons.map((comparison) => {
                const savings = comparison.us_price - (comparison.international_price + comparison.travel_cost)
                const savingsPercentage = Math.round((savings / comparison.us_price) * 100)
                const totalCost = comparison.international_price + comparison.travel_cost

                return (
                  <TableRow key={comparison.uuid}>
                    <TableCell className="font-medium">
                      {getProcedureName(comparison.procedure_id)}
                    </TableCell>
                    <TableCell>{getFacilityName(comparison.facility_id)}</TableCell>
                    <TableCell>${comparison.us_price.toLocaleString()}</TableCell>
                    <TableCell>${comparison.international_price.toLocaleString()}</TableCell>
                    <TableCell>${comparison.travel_cost.toLocaleString()}</TableCell>
                    <TableCell>${totalCost.toLocaleString()}</TableCell>
                    <TableCell className="text-primary">
                      ${savings.toLocaleString()} ({savingsPercentage}%)
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteComparison(comparison.uuid)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 