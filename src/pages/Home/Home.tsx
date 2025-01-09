'use client'

import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { proceduresApi, priceComparisonsApi } from "@/lib/api"

interface Procedure {
  name: string
  description: string
  uuid: string
}

interface PriceComparison {
  procedure_id: string
  us_price: number
  international_price: number
  travel_cost: number
  uuid: string
}

export const Home = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [priceComparisons, setPriceComparisons] = useState<PriceComparison[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [proceduresRes, comparisonsRes] = await Promise.all([
          proceduresApi.getAll(),
          priceComparisonsApi.getAll()
        ])

        if (proceduresRes.error) throw new Error(proceduresRes.error)
        if (comparisonsRes.error) throw new Error(comparisonsRes.error)

        setProcedures(proceduresRes.data ?? [])
        setPriceComparisons(comparisonsRes.data ?? [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/procedures/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const calculateSavings = (procedureId: string) => {
    const comparison = priceComparisons.find(c => c.procedure_id === procedureId)
    if (!comparison) return null

    const savings = comparison.us_price - (comparison.international_price + comparison.travel_cost)
    const savingsPercentage = Math.round((savings / comparison.us_price) * 100)
    return {
      amount: savings,
      percentage: savingsPercentage
    }
  }

  return (
    <div>
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Find Affordable Medical Procedures Worldwide
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Compare prices, credentials, and travel costs for medical procedures globally
          </p>
          <div className="flex max-w-xl mx-auto gap-4">
            <Input 
              type="text" 
              placeholder="Search procedures (e.g., knee replacement)" 
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button size="lg" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Procedure Comparisons</h2>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeletons
              Array(3).fill(null).map((_, index) => (
                <Card key={index} className="overflow-hidden">
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
              ))
            ) : (
              procedures.slice(0, 3).map((procedure) => {
                const savings = calculateSavings(procedure.uuid)
                console.log(procedure)
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
                      {savings && (
                        <p className="text-primary font-semibold">
                          Average savings: ${savings.amount.toLocaleString()} ({savings.percentage}%)
                        </p>
                      )}
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        asChild
                      >
                        <Link to={`/procedures/${procedure.uuid}`}>
                          View Comparison
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </section>
    </div>
  )
} 