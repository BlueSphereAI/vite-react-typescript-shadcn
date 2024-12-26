'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MedicalProcedure } from '@/types'

// Mock data for demonstration
const mockProcedures: MedicalProcedure[] = [
  {
    id: '1',
    name: 'Hip Replacement',
    category: 'Orthopedics',
    usPrice: 40000,
    internationalPrice: 12000,
    travelCost: 3000,
    facilityId: 'facility1',
  },
  {
    id: '2',
    name: 'Heart Bypass Surgery',
    category: 'Cardiology',
    usPrice: 123000,
    internationalPrice: 27000,
    travelCost: 4000,
    facilityId: 'facility2',
  },
  {
    id: '3',
    name: 'Dental Implants',
    category: 'Dental',
    usPrice: 4500,
    internationalPrice: 1200,
    travelCost: 2000,
    facilityId: 'facility3',
  },
]

const PriceComparison = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProcedure, setSelectedProcedure] = useState<MedicalProcedure | null>(null)

  const filteredProcedures = mockProcedures.filter((procedure) =>
    procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    procedure.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const calculateSavings = (usPrice: number, internationalPrice: number, travelCost: number) => {
    const totalInternationalCost = internationalPrice + travelCost
    const savings = usPrice - totalInternationalCost
    const savingsPercentage = (savings / usPrice) * 100
    return {
      amount: savings,
      percentage: savingsPercentage.toFixed(1),
    }
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Compare Medical Procedure Prices</h1>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex max-w-md space-x-2">
          <Input
            type="text"
            placeholder="Search procedures or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button>Search</Button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Procedure</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">US Price</TableHead>
              <TableHead className="text-right">International Price</TableHead>
              <TableHead className="text-right">Travel Cost</TableHead>
              <TableHead className="text-right">Total Savings</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProcedures.map((procedure) => {
              const savings = calculateSavings(
                procedure.usPrice,
                procedure.internationalPrice,
                procedure.travelCost
              )
              return (
                <TableRow key={procedure.id}>
                  <TableCell className="font-medium">{procedure.name}</TableCell>
                  <TableCell>{procedure.category}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(procedure.usPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(procedure.internationalPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(procedure.travelCost)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {formatPrice(savings.amount)} ({savings.percentage}%)
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedProcedure(procedure)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{procedure.name}</DialogTitle>
                          <DialogDescription>
                            Detailed breakdown of costs and potential savings
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold">US Cost</h4>
                              <p className="text-2xl">
                                {formatPrice(procedure.usPrice)}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold">International Cost</h4>
                              <p className="text-2xl">
                                {formatPrice(procedure.internationalPrice)}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Travel Expenses</h4>
                              <p className="text-2xl">
                                {formatPrice(procedure.travelCost)}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Total Savings</h4>
                              <p className="text-2xl text-green-600">
                                {formatPrice(savings.amount)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button className="w-full">
                              Request More Information
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PriceComparison 