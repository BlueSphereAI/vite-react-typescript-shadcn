'use client'

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { proceduresApi, facilitiesApi, bookingsApi } from "@/lib/api"
import { generateUUID } from '@/lib/utils'

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

export const Booking = () => {
  const { id: procedureId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [procedure, setProcedure] = useState<Procedure | null>(null)
  const [facility, setFacility] = useState<Facility | null>(null)

  const [bookingData, setBookingData] = useState({
    itinerary: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      if (!procedureId) return

      try {
        setLoading(true)
        const procedureRes = await proceduresApi.getById(procedureId)
        if (procedureRes.error) throw new Error(procedureRes.error)
        setProcedure(procedureRes.data)

        // For now, we'll just get the first facility. In a real app, you'd get the selected facility.
        const facilitiesRes = await facilitiesApi.getAll()
        if (facilitiesRes.error) throw new Error(facilitiesRes.error)
        setFacility(facilitiesRes.data?.[0] || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [procedureId])

  const handleInputChange = (field: keyof typeof bookingData, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    if (!procedureId || !facility) return

    try {
      setSubmitting(true)
      setError(null)

      if (!bookingData.itinerary.trim()) {
        setError('Please provide your travel itinerary')
        return
      }

      const response = await bookingsApi.create({
        uuid: generateUUID(),
        user_id: generateUUID(), // In a real app, this would come from auth
        procedure_id: procedureId,
        facility_id: facility.uuid,
        itinerary: bookingData.itinerary,
        status: 'Pending'
      })

      if (response.error) throw new Error(response.error)

      // Redirect to dashboard on success
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit booking')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="h-8 w-64 bg-muted animate-pulse rounded" />
            <div className="h-4 w-96 bg-muted animate-pulse rounded mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Array(3).fill(null).map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !procedure || !facility) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            {error || 'Procedure or facility not found'}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/procedures" className="hover:text-primary">Procedures</Link>
        <span className="mx-2">/</span>
        <Link to={`/procedures/${procedureId}`} className="hover:text-primary">{procedure.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Book Procedure</span>
      </nav>

      <Card>
        <CardHeader>
          <CardTitle>Book {procedure.name}</CardTitle>
          <CardDescription>
            Complete the booking form to schedule your procedure at {facility.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6 max-w-2xl mx-auto">
            {/* Procedure Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold">Procedure Details</h3>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p><span className="font-medium">Procedure:</span> {procedure.name}</p>
                <p><span className="font-medium">Facility:</span> {facility.name}</p>
                <p><span className="font-medium">Location:</span> {facility.location}</p>
              </div>
            </div>

            <Separator />

            {/* Booking Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="itinerary">Travel Itinerary *</Label>
                <Textarea
                  id="itinerary"
                  value={bookingData.itinerary}
                  onChange={(e) => handleInputChange('itinerary', e.target.value)}
                  placeholder="Please provide your travel plans and any special requirements..."
                  className="min-h-[150px]"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => navigate(`/procedures/${procedureId}`)}
              >
                Back to Procedure
              </Button>
              <div className="space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  disabled={submitting}
                >
                  Save for Later
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Booking Request'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 