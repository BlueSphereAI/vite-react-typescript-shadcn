'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Procedure {
  id: string
  name: string
  usPrice: number
  internationalPrice: number
  travelCost: number
  location: string
  facility: string
  credentials: string[]
}

const PriceComparison = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null)

  const procedures: Procedure[] = [
    {
      id: '1',
      name: 'Hip Replacement',
      usPrice: 40000,
      internationalPrice: 12000,
      travelCost: 3000,
      location: 'India',
      facility: 'Apollo Hospitals',
      credentials: ['JCI Accredited', 'ISO 9001:2015'],
    },
    {
      id: '2',
      name: 'Knee Replacement',
      usPrice: 35000,
      internationalPrice: 10000,
      travelCost: 3000,
      location: 'Thailand',
      facility: 'Bumrungrad International',
      credentials: ['JCI Accredited', 'HIMSS Stage 7'],
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Compare Medical Procedure Prices</h1>
      
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Input
          placeholder="Search procedures..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:col-span-2"
        />
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="india">India</SelectItem>
            <SelectItem value="thailand">Thailand</SelectItem>
            <SelectItem value="turkey">Turkey</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Procedure type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="orthopedic">Orthopedic</SelectItem>
            <SelectItem value="cardiac">Cardiac</SelectItem>
            <SelectItem value="dental">Dental</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Procedure</TableHead>
              <TableHead className="text-right">US Price</TableHead>
              <TableHead className="text-right">International Price</TableHead>
              <TableHead className="text-right">Travel Cost</TableHead>
              <TableHead className="text-right">Total Cost</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {procedures.map((procedure) => (
              <TableRow
                key={procedure.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedProcedure(procedure)}
              >
                <TableCell className="font-medium">{procedure.name}</TableCell>
                <TableCell className="text-right">
                  ${procedure.usPrice.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${procedure.internationalPrice.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${procedure.travelCost.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${(procedure.internationalPrice + procedure.travelCost).toLocaleString()}
                </TableCell>
                <TableCell>{procedure.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedProcedure} onOpenChange={() => setSelectedProcedure(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedProcedure?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <h4 className="mb-2 font-semibold">Facility</h4>
              <p>{selectedProcedure?.facility}</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Credentials</h4>
              <ul className="list-inside list-disc">
                {selectedProcedure?.credentials.map((credential) => (
                  <li key={credential}>{credential}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Cost Breakdown</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>US Price:</div>
                <div>${selectedProcedure?.usPrice.toLocaleString()}</div>
                <div>International Price:</div>
                <div>${selectedProcedure?.internationalPrice.toLocaleString()}</div>
                <div>Travel Cost:</div>
                <div>${selectedProcedure?.travelCost.toLocaleString()}</div>
                <div className="font-semibold">Total Savings:</div>
                <div className="font-semibold">
                  $
                  {selectedProcedure
                    ? (
                        selectedProcedure.usPrice -
                        (selectedProcedure.internationalPrice + selectedProcedure.travelCost)
                      ).toLocaleString()
                    : 0}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PriceComparison 