'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
  DialogDescription,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { BarChart } from '@/components/ui/bar-chart'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Procedure {
  id: string
  name: string
  usPrice: number
  internationalPrice: number
  travelCost: number
  location: string
  facility: string
  credentials: string[]
  type: string
  category: string
  recoveryTime: string
  successRate: number
  description: string
}

type SortField = 'name' | 'usPrice' | 'internationalPrice' | 'travelCost' | 'location' | 'savings'
type SortOrder = 'asc' | 'desc'

const PriceComparison = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null)
  const [sortField, setSortField] = useState<SortField>('savings')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

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
      type: 'orthopedic',
      category: 'Joint Replacement',
      recoveryTime: '3-6 months',
      successRate: 95,
      description: 'Total hip replacement surgery involves removing damaged bone and cartilage and replacing them with prosthetic components.',
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
      type: 'orthopedic',
      category: 'Joint Replacement',
      recoveryTime: '3-6 months',
      successRate: 92,
      description: 'Total knee replacement surgery replaces damaged knee joint surfaces with metal and plastic components to restore function.',
    },
    {
      id: '3',
      name: 'Heart Bypass Surgery',
      usPrice: 123000,
      internationalPrice: 27000,
      travelCost: 4000,
      location: 'India',
      facility: 'Fortis Hospital',
      credentials: ['JCI Accredited', 'NABH Certified'],
      type: 'cardiac',
      category: 'Cardiac Surgery',
      recoveryTime: '6-12 weeks',
      successRate: 98,
      description: 'Coronary artery bypass grafting (CABG) improves blood flow to the heart by using grafts to bypass blocked arteries.',
    },
    {
      id: '4',
      name: 'Dental Implants',
      usPrice: 4500,
      internationalPrice: 1200,
      travelCost: 2000,
      location: 'Turkey',
      facility: 'Memorial Hospital',
      credentials: ['ISO 9001:2015', 'Turkish Medical Association'],
      type: 'dental',
      category: 'Dental Surgery',
      recoveryTime: '3-6 months',
      successRate: 97,
      description: 'Dental implants are artificial tooth roots that provide a permanent base for fixed replacement teeth.',
    },
  ]

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕'
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  const calculateSavings = (procedure: Procedure) => {
    const totalCost = procedure.internationalPrice + procedure.travelCost
    const savings = procedure.usPrice - totalCost
    const percentage = (savings / procedure.usPrice) * 100
    return { amount: savings, percentage }
  }

  const filteredAndSortedProcedures = procedures
    .filter((procedure) => {
      const matchesSearch = procedure.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesLocation = !selectedLocation || selectedLocation === 'all' || procedure.location.toLowerCase() === selectedLocation
      const matchesType = !selectedType || selectedType === 'all' || procedure.type === selectedType
      return matchesSearch && matchesLocation && matchesType
    })
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1
      if (sortField === 'savings') {
        const savingsA = calculateSavings(a).amount
        const savingsB = calculateSavings(b).amount
        return multiplier * (savingsA - savingsB)
      }
      if (sortField === 'name' || sortField === 'location') {
        return multiplier * a[sortField].localeCompare(b[sortField])
      }
      return multiplier * (a[sortField] - b[sortField])
    })

  const chartData = filteredAndSortedProcedures.map(procedure => ({
    name: procedure.name,
    'US Cost': procedure.usPrice,
    'International Cost': procedure.internationalPrice + procedure.travelCost,
    Savings: procedure.usPrice - (procedure.internationalPrice + procedure.travelCost)
  }))

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Compare Medical Procedure Prices</h1>
      
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Input
            placeholder="Search procedures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-8"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </Button>
          )}
        </div>
        <Select 
          defaultValue="all"
          value={selectedLocation} 
          onValueChange={setSelectedLocation}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="india">India</SelectItem>
            <SelectItem value="thailand">Thailand</SelectItem>
            <SelectItem value="turkey">Turkey</SelectItem>
          </SelectContent>
        </Select>
        <Select 
          defaultValue="all"
          value={selectedType} 
          onValueChange={setSelectedType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Procedure type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="orthopedic">Orthopedic</SelectItem>
            <SelectItem value="cardiac">Cardiac</SelectItem>
            <SelectItem value="dental">Dental</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-8 rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">Cost Comparison Overview</h2>
        <div className="h-[300px]">
          <BarChart data={chartData} />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('name')}
              >
                Procedure {getSortIcon('name')}
              </TableHead>
              <TableHead
                className="cursor-pointer text-right hover:bg-muted/50"
                onClick={() => handleSort('usPrice')}
              >
                US Price {getSortIcon('usPrice')}
              </TableHead>
              <TableHead
                className="cursor-pointer text-right hover:bg-muted/50"
                onClick={() => handleSort('internationalPrice')}
              >
                International Price {getSortIcon('internationalPrice')}
              </TableHead>
              <TableHead
                className="cursor-pointer text-right hover:bg-muted/50"
                onClick={() => handleSort('travelCost')}
              >
                Travel Cost {getSortIcon('travelCost')}
              </TableHead>
              <TableHead className="text-right">Total Cost</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('location')}
              >
                Location {getSortIcon('location')}
              </TableHead>
              <TableHead
                className="cursor-pointer text-right hover:bg-muted/50"
                onClick={() => handleSort('savings')}
              >
                Savings {getSortIcon('savings')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedProcedures.map((procedure) => {
              const { amount: savings, percentage } = calculateSavings(procedure)
              return (
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
                  <TableCell>
                    <div className="space-y-1 text-right">
                      <div className="text-green-600">
                        ${savings.toLocaleString()} ({percentage.toFixed(1)}%)
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {filteredAndSortedProcedures.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                  No procedures found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedProcedure} onOpenChange={() => setSelectedProcedure(null)}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedProcedure?.name}</DialogTitle>
            <DialogDescription>{selectedProcedure?.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Procedure Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-semibold">Category:</span> {selectedProcedure?.category}
                  </div>
                  <div>
                    <span className="font-semibold">Type:</span> {selectedProcedure?.type}
                  </div>
                  <div>
                    <span className="font-semibold">Recovery Time:</span> {selectedProcedure?.recoveryTime}
                  </div>
                  <div>
                    <span className="font-semibold">Success Rate:</span> {selectedProcedure?.successRate}%
                    <Progress value={selectedProcedure?.successRate} className="mt-1 h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Facility Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-semibold">Name:</span> {selectedProcedure?.facility}
                  </div>
                  <div>
                    <span className="font-semibold">Location:</span> {selectedProcedure?.location}
                  </div>
                  <div>
                    <span className="font-semibold">Credentials:</span>
                    <ul className="mt-1 list-inside list-disc">
                      {selectedProcedure?.credentials.map((credential) => (
                        <li key={credential}>{credential}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Cost Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>US Price:</span>
                        <span>${selectedProcedure?.usPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>International Price:</span>
                        <span>${selectedProcedure?.internationalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Travel Cost:</span>
                        <span>${selectedProcedure?.travelCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>Total International Cost:</span>
                        <span>
                          ${selectedProcedure
                            ? (
                                selectedProcedure.internationalPrice + selectedProcedure.travelCost
                              ).toLocaleString()
                            : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Savings</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-green-600">
                        <span>Total Savings:</span>
                        <span>
                          ${selectedProcedure
                            ? (
                                selectedProcedure.usPrice -
                                (selectedProcedure.internationalPrice + selectedProcedure.travelCost)
                              ).toLocaleString()
                            : 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Savings Percentage:</span>
                        <span>
                          {selectedProcedure
                            ? (
                                ((selectedProcedure.usPrice -
                                  (selectedProcedure.internationalPrice + selectedProcedure.travelCost)) /
                                  selectedProcedure.usPrice) *
                                100
                              ).toFixed(1)
                            : 0}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          selectedProcedure
                            ? ((selectedProcedure.usPrice -
                                (selectedProcedure.internationalPrice + selectedProcedure.travelCost)) /
                                selectedProcedure.usPrice) *
                              100
                            : 0
                        }
                        className="mt-2 h-2"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button
                className="flex-1"
                onClick={() => window.open(`/facilities/${selectedProcedure?.facility.toLowerCase().replace(/\s+/g, '-')}`, '_blank')}
              >
                View Facility Details
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => {
                  // Add to comparison list
                }}
              >
                Add to Comparison
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PriceComparison 