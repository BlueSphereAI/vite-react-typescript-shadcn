'use client'

import { useParams, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

interface Facility {
  name: string
  location: string
  procedureCost: number
  travelCost: number
  totalCost: number
  rating: number
  accreditations: string[]
  doctorQualifications: string[]
  patientReviews: {
    rating: number
    comment: string
    date: string
  }[]
}

// Mock data - in a real app, this would come from an API
const mockFacilities: Facility[] = [
  {
    name: "Global Care Hospital",
    location: "Bangkok, Thailand",
    procedureCost: 12000,
    travelCost: 2000,
    totalCost: 14000,
    rating: 4.8,
    accreditations: ["JCI Accredited", "ISO 9001:2015"],
    doctorQualifications: ["Board Certified", "20+ Years Experience"],
    patientReviews: [
      {
        rating: 5,
        comment: "Excellent care and results",
        date: "2023-12-01"
      }
    ]
  },
  {
    name: "American Medical Center",
    location: "New York, USA",
    procedureCost: 35000,
    travelCost: 500,
    totalCost: 35500,
    rating: 4.9,
    accreditations: ["JCAHO Accredited", "AAAHC Certified"],
    doctorQualifications: ["Harvard Medical School", "30+ Years Experience"],
    patientReviews: [
      {
        rating: 5,
        comment: "World-class treatment",
        date: "2023-11-15"
      }
    ]
  }
]

export const ProcedureDetail = () => {
  const { id } = useParams()
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/procedures" className="hover:text-primary">Procedures</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Knee Replacement</span>
      </nav>

      {/* Procedure Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">Knee Replacement Surgery</h1>
          <p className="text-lg text-muted-foreground mb-6">
            A surgical procedure to replace the weight-bearing surfaces of the knee joint to relieve pain and disability.
          </p>
          <img 
            src="https://mediglobal-connect.greensphere.one/images/procedures/knee-replacement-detail.jpg"
            alt="Knee Replacement Procedure"
            className="w-full rounded-lg mb-6"
          />
        </div>
        <div className="bg-primary/5 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Quick Facts</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-muted-foreground">Average Savings</dt>
              <dd className="text-2xl font-bold text-primary">Up to 70%</dd>
            </div>
            <Separator />
            <div>
              <dt className="text-sm text-muted-foreground">Recovery Time</dt>
              <dd className="font-semibold">4-6 weeks</dd>
            </div>
            <Separator />
            <div>
              <dt className="text-sm text-muted-foreground">Success Rate</dt>
              <dd className="font-semibold">95%</dd>
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
                <TableHead>Rating</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFacilities.map((facility, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{facility.name}</TableCell>
                  <TableCell>{facility.location}</TableCell>
                  <TableCell>${facility.procedureCost.toLocaleString()}</TableCell>
                  <TableCell>${facility.travelCost.toLocaleString()}</TableCell>
                  <TableCell className="font-bold">${facility.totalCost.toLocaleString()}</TableCell>
                  <TableCell>{facility.rating}/5</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Facility Credentials */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Facility Credentials</h2>
        <Tabs defaultValue="global-care">
          <TabsList className="mb-4">
            {mockFacilities.map((facility, index) => (
              <TabsTrigger key={index} value={facility.name.toLowerCase().replace(/\s+/g, '-')}>
                {facility.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {mockFacilities.map((facility, index) => (
            <TabsContent key={index} value={facility.name.toLowerCase().replace(/\s+/g, '-')}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Accreditations</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {facility.accreditations.map((accreditation, i) => (
                        <li key={i}>{accreditation}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Doctor Qualifications</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {facility.doctorQualifications.map((qualification, i) => (
                        <li key={i}>{qualification}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Patient Reviews</h3>
                  <div className="space-y-4">
                    {facility.patientReviews.map((review, i) => (
                      <div key={i} className="bg-primary/5 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">Rating: {review.rating}/5</span>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
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