'use client'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { proceduresApi, facilitiesApi, priceComparisonsApi } from "@/lib/api"
import { cn } from "@/lib/utils"

interface Procedure {
  procedure_id: string
  name: string
  description: string
}

interface Facility {
  facility_id: string
  name: string
  location: string
  certifications: string
  doctor_info: string
  patient_reviews: string
}

interface PriceComparison {
  comparison_id: string
  procedure_id: string
  facility_id: string
  us_price: number
  international_price: number
  travel_cost: number
}

export const ProcedureDetail = () => {
  const { id } = useParams()
  const [procedure, setProcedure] = useState<Procedure | null>(null)
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [priceComparisons, setPriceComparisons] = useState<PriceComparison[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      try {
        setLoading(true)
        const [procedureRes, facilitiesRes, comparisonsRes] = await Promise.all([
          proceduresApi.getById(id),
          facilitiesApi.getAll(),
          priceComparisonsApi.getAll()
        ])

        if (procedureRes.error) throw new Error(procedureRes.error)
        if (facilitiesRes.error) throw new Error(facilitiesRes.error)
        if (comparisonsRes.error) throw new Error(comparisonsRes.error)

        setProcedure(procedureRes.data)
        setFacilities(facilitiesRes.data)
        setPriceComparisons(comparisonsRes.data.filter(c => c.procedure_id === id))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    )
  }

  if (error || !procedure) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            {error || 'Procedure not found'}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const getFacilityById = (facilityId: string) => 
    facilities.find(f => f.facility_id === facilityId)

  const calculateSavings = (comparison: PriceComparison) => {
    const savings = comparison.us_price - (comparison.international_price + comparison.travel_cost)
    const percentage = Math.round((savings / comparison.us_price) * 100)
    return { savings, percentage }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/procedures" className="hover:text-primary">Procedures</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{procedure.name}</span>
      </nav>

      {/* Procedure Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{procedure.name}</h1>
          <p className="text-lg text-muted-foreground mb-6">
            {procedure.description}
          </p>
          <img 
            src={`https://mediglobal-connect.greensphere.one/images/procedures/${procedure.procedure_id}.jpg`}
            alt={procedure.name}
            className="w-full rounded-lg mb-6 h-[300px] object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "https://mediglobal-connect.greensphere.one/images/procedures/default.jpg"
            }}
          />
        </div>
        <div className="bg-primary/5 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Quick Facts</h2>
          <dl className="space-y-4">
            {priceComparisons.length > 0 && (
              <>
                <div>
                  <dt className="text-sm text-muted-foreground">Potential Savings</dt>
                  <dd className="text-2xl font-bold text-primary">
                    Up to {calculateSavings(priceComparisons[0]).percentage}%
                  </dd>
                </div>
                <Separator />
              </>
            )}
            <div>
              <dt className="text-sm text-muted-foreground">Available Facilities</dt>
              <dd className="font-semibold">{facilities.length}</dd>
            </div>
            <Separator />
            <div>
              <dt className="text-sm text-muted-foreground">Locations</dt>
              <dd className="font-semibold">
                {Array.from(new Set(facilities.map(f => f.location.split(',')[1].trim()))).join(', ')}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Price Comparison Table */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Price Comparison</h2>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Facility Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Procedure Cost</TableHead>
                <TableHead>Est. Travel Cost</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Potential Savings</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceComparisons.map((comparison) => {
                const facility = getFacilityById(comparison.facility_id)
                if (!facility) return null

                const { savings, percentage } = calculateSavings(comparison)
                const totalCost = comparison.international_price + comparison.travel_cost

                return (
                  <TableRow key={comparison.comparison_id}>
                    <TableCell className="font-medium">{facility.name}</TableCell>
                    <TableCell>{facility.location}</TableCell>
                    <TableCell>${comparison.international_price.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        ${comparison.travel_cost.toLocaleString()}
                        <Button variant="ghost" size="sm" asChild className="h-6 px-2">
                          <Link to="/travel-expense" className="text-xs">
                            Estimate
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold">${totalCost.toLocaleString()}</TableCell>
                    <TableCell className="text-primary">
                      ${savings.toLocaleString()} ({percentage}%)
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/procedures/${id}/book`}>Book Now</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Facility Credentials */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Facility Credentials</h2>
        <Tabs defaultValue={facilities[0]?.facility_id}>
          <TabsList className="mb-4">
            {facilities.map((facility) => (
              <TabsTrigger key={facility.facility_id} value={facility.facility_id}>
                {facility.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {facilities.map((facility) => (
            <TabsContent key={facility.facility_id} value={facility.facility_id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Accreditations</h3>
                    <div className="text-muted-foreground">
                      {facility.certifications}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Doctor Qualifications</h3>
                    <div className="text-muted-foreground">
                      {facility.doctor_info}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Patient Reviews</h3>
                  <div className="text-muted-foreground">
                    {facility.patient_reviews}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Button size="lg" asChild>
          <Link to={`/procedures/${id}/book`}>Start Booking Process</Link>
        </Button>
      </div>
    </div>
  )
} 