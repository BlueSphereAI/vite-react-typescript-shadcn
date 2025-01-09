'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { proceduresApi, facilitiesApi, priceComparisonsApi } from "@/lib/api"

interface Procedure {
  uuid: string
  name: string
  description: string
}

interface Facility {
  uuid: string
  name: string
  location: string
  certifications: string
  doctor_info: string
  patient_reviews: string
}

interface PriceComparison {
  uuid: string
  procedure_id: string
  facility_id: string
  us_price: number
  international_price: number
  travel_cost: number
}

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [priceComparisons, setPriceComparisons] = useState<PriceComparison[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState(query)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [proceduresRes, facilitiesRes, comparisonsRes] = await Promise.all([
          proceduresApi.getAll(),
          facilitiesApi.getAll(),
          priceComparisonsApi.getAll()
        ])

        if (proceduresRes.error) throw new Error(proceduresRes.error)
        if (facilitiesRes.error) throw new Error(facilitiesRes.error)
        if (comparisonsRes.error) throw new Error(comparisonsRes.error)

        setProcedures(proceduresRes.data || [])
        setFacilities(facilitiesRes.data || [])
        setPriceComparisons(comparisonsRes.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProcedures = procedures.filter(procedure => 
    procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    procedure.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const calculateSavings = (procedureId: string) => {
    const comparisons = priceComparisons.filter(c => c.procedure_id === procedureId)
    if (comparisons.length === 0) return null

    const maxSavings = comparisons.reduce((max, comparison) => {
      const savings = comparison.us_price - (comparison.international_price + comparison.travel_cost)
      const percentage = Math.round((savings / comparison.us_price) * 100)
      return percentage > max ? percentage : max
    }, 0)

    return maxSavings
  }

  const getFacilitiesForProcedure = (procedureId: string) => {
    const comparisons = priceComparisons.filter(c => c.procedure_id === procedureId)
    const facilityIds = comparisons.map(c => c.facility_id)
    return facilities.filter(f => facilityIds.includes(f.uuid))
  }

  const getLocationsForProcedure = (procedureId: string) => {
    const procedureFacilities = getFacilitiesForProcedure(procedureId)
    return Array.from(new Set(procedureFacilities.map(f => {
      const parts = f.location.split(',')
      return parts[1]?.trim() || parts[0]?.trim() || f.location
    })))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-full max-w-xl mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(null).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <Skeleton className="h-6 w-3/4 mt-4" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Input */}
      <div className="max-w-xl mx-auto mb-12">
        <Input
          type="text"
          placeholder="Search procedures by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-lg"
        />
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProcedures.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No procedures found matching your search.
          </div>
        ) : (
          filteredProcedures.map((procedure) => {
            const savings = calculateSavings(procedure.uuid)
            const locations = getLocationsForProcedure(procedure.uuid)
            const facilitiesCount = getFacilitiesForProcedure(procedure.uuid).length

            return (
              <Card key={procedure.uuid} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardHeader>
                  <img 
                    src={`https://mediglobal-connect.greensphere.one/images/procedures/${procedure.uuid}.jpg`}
                    alt={procedure.name}
                    className="w-full h-48 object-cover rounded-t-lg transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                    {procedure.name}
                  </CardTitle>
                  <CardDescription>{procedure.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savings !== null && (
                      <>
                        <div>
                          <dt className="text-sm text-muted-foreground">Potential Savings</dt>
                          <dd className="text-xl font-bold text-primary">Up to {savings}%</dd>
                        </div>
                        <Separator />
                      </>
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <dt className="text-sm text-muted-foreground">Available Facilities</dt>
                        <dd className="font-semibold">{facilitiesCount}</dd>
                      </div>
                      <div className="text-right">
                        <dt className="text-sm text-muted-foreground">Locations</dt>
                        <dd className="font-semibold">{locations.join(', ')}</dd>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link to={`/procedures/${procedure.uuid}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
} 