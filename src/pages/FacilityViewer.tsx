'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Doctor, Review } from '@/types'

// Mock data for demonstration
const facilityData = {
  id: 'facility1',
  name: 'Apollo Hospitals',
  location: 'Chennai, India',
  image: 'https://example.com/apollo.jpg',
  description:
    'Apollo Hospitals is one of the most renowned healthcare providers in Asia, known for its excellence in medical care and state-of-the-art facilities.',
  certifications: [
    'Joint Commission International (JCI)',
    'National Accreditation Board for Hospitals & Healthcare Providers (NABH)',
    'ISO 9001:2015',
    'International Organization for Standardization',
  ],
  doctors: [
    {
      id: 'doc1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Orthopedic Surgery',
      experience: 15,
      qualifications: ['MBBS', 'MS Orthopedics', 'Fellowship in Joint Replacement'],
      image: 'https://example.com/doctor1.jpg',
    },
    {
      id: 'doc2',
      name: 'Dr. Michael Chen',
      specialization: 'Cardiology',
      experience: 20,
      qualifications: ['MD', 'DM Cardiology', 'Fellowship in Interventional Cardiology'],
      image: 'https://example.com/doctor2.jpg',
    },
  ] as Doctor[],
  reviews: [
    {
      id: 'rev1',
      patientName: 'John Smith',
      rating: 5,
      comment:
        'Excellent care and attention. The staff was very professional and the facilities were world-class.',
      date: '2023-11-15',
    },
    {
      id: 'rev2',
      patientName: 'Maria Garcia',
      rating: 4,
      comment:
        'Very satisfied with the treatment. The doctors were knowledgeable and caring.',
      date: '2023-10-28',
    },
  ] as Review[],
}

const FacilityViewer = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating)
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <span>Facilities</span> &gt; <span>{facilityData.name}</span>
      </div>

      {/* Facility Header */}
      <div className="mb-8">
        <div className="relative mb-6 h-64 overflow-hidden rounded-lg">
          <img
            src={facilityData.image}
            alt={facilityData.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="mb-2 text-3xl font-bold">{facilityData.name}</h1>
        <p className="mb-4 text-lg text-muted-foreground">
          {facilityData.location}
        </p>
        <p className="max-w-3xl text-muted-foreground">
          {facilityData.description}
        </p>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {facilityData.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Doctors Tab */}
        <TabsContent value="doctors">
          <div className="grid gap-6 md:grid-cols-2">
            {facilityData.doctors.map((doctor) => (
              <Card key={doctor.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback>
                        {doctor.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{doctor.name}</h3>
                      <p className="text-muted-foreground">
                        {doctor.specialization}
                      </p>
                      <p className="mt-1 text-sm">
                        {doctor.experience} years of experience
                      </p>
                      <div className="mt-2">
                        {doctor.qualifications.map((qual) => (
                          <Badge key={qual} variant="outline" className="mr-2">
                            {qual}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <div className="grid gap-6">
            {facilityData.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">{review.patientName}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mb-2">{renderStars(review.rating)}</div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-muted-foreground">
                    21 Hospital Road, Chennai 600006, India
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-muted-foreground">+91 44 2829 3333</p>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">
                    contact@apollohospitals.com
                  </p>
                </div>
                <Button className="w-full">Send Inquiry</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FacilityViewer 