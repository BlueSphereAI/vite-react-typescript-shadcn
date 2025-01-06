'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Facility {
  id: string
  name: string
  location: string
  image: string
  description: string
  specialties: string[]
  accreditations: string[]
  rating: number
}

const facilities: Facility[] = [
  {
    id: 'apollo',
    name: 'Apollo Hospitals',
    location: 'Chennai, India',
    image: 'https://example.com/apollo.jpg',
    description:
      'Apollo Hospitals is one of Asia\'s largest integrated healthcare organizations. We are committed to providing world-class healthcare services.',
    specialties: ['Orthopedics', 'Cardiology', 'Neurology', 'Oncology'],
    accreditations: [
      'Joint Commission International (JCI)',
      'National Accreditation Board for Hospitals & Healthcare Providers (NABH)',
    ],
    rating: 4.8,
  },
  {
    id: 'bumrungrad',
    name: 'Bumrungrad International',
    location: 'Bangkok, Thailand',
    image: 'https://example.com/bumrungrad.jpg',
    description:
      'Bumrungrad International Hospital is one of the largest private hospitals in Southeast Asia, with state-of-the-art facilities and world-class healthcare services.',
    specialties: ['Cardiology', 'Orthopedics', 'Plastic Surgery', 'Dental'],
    accreditations: ['Joint Commission International (JCI)', 'Hospital Accreditation (HA)'],
    rating: 4.9,
  },
  {
    id: 'memorial',
    name: 'Memorial Hospital',
    location: 'Istanbul, Turkey',
    image: 'https://example.com/memorial.jpg',
    description:
      'Memorial Hospital Group is Turkey\'s leading healthcare provider, offering comprehensive medical services with cutting-edge technology.',
    specialties: ['Dental', 'Ophthalmology', 'IVF', 'Oncology'],
    accreditations: ['Joint Commission International (JCI)', 'ISO 9001:2015'],
    rating: 4.7,
  },
]

const FacilityList = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch = facility.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesSpecialty =
      !selectedSpecialty ||
      selectedSpecialty === 'all' ||
      facility.specialties.some(
        (specialty) => specialty.toLowerCase() === selectedSpecialty.toLowerCase()
      )
    const matchesLocation =
      !selectedLocation ||
      selectedLocation === 'all' ||
      facility.location.toLowerCase().includes(selectedLocation.toLowerCase())
    return matchesSearch && matchesSpecialty && matchesLocation
  })

  const allSpecialties = Array.from(
    new Set(facilities.flatMap((f) => f.specialties))
  ).sort()

  const allLocations = Array.from(
    new Set(facilities.map((f) => f.location.split(',')[1].trim()))
  ).sort()

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Medical Facilities</h1>
        <p className="mt-2 text-muted-foreground">
          Explore our network of internationally accredited healthcare facilities
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="relative">
          <Input
            placeholder="Search facilities..."
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
          value={selectedSpecialty} 
          onValueChange={setSelectedSpecialty}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {allSpecialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty.toLowerCase()}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select 
          defaultValue="all"
          value={selectedLocation} 
          onValueChange={setSelectedLocation}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {allLocations.map((location) => (
              <SelectItem key={location} value={location.toLowerCase()}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Facility Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFacilities.map((facility) => (
          <Card
            key={facility.id}
            className="cursor-pointer transition-shadow hover:shadow-lg"
            onClick={() => navigate(`/facilities/${facility.id}`)}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={facility.image}
                alt={facility.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{facility.name}</CardTitle>
                <div className="flex items-center text-yellow-500">
                  <span className="mr-1">★</span>
                  <span className="text-sm text-muted-foreground">
                    {facility.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <CardDescription>{facility.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="mb-2 font-semibold">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {facility.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Accreditations</h4>
                <ul className="list-inside list-disc text-sm text-muted-foreground">
                  {facility.accreditations.map((accreditation) => (
                    <li key={accreditation}>{accreditation}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFacilities.length === 0 && (
        <div className="mt-8 text-center text-muted-foreground">
          No facilities found matching your criteria
        </div>
      )}
    </div>
  )
}

export default FacilityList 