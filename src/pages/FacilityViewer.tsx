'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface Review {
  id: string
  patientName: string
  rating: number
  comment: string
  date: string
}

interface Doctor {
  id: string
  name: string
  specialization: string
  qualifications: string[]
  experience: string
}

const mockFacility = {
  name: 'Apollo Hospitals',
  location: 'Chennai, India',
  image: 'https://example.com/apollo.jpg',
  description:
    'Apollo Hospitals is one of Asia\'s largest integrated healthcare organizations. We are committed to providing world-class healthcare services.',
  certifications: [
    'Joint Commission International (JCI) Accreditation',
    'National Accreditation Board for Hospitals & Healthcare Providers (NABH)',
    'ISO 9001:2015 Certification',
  ],
  doctors: [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Orthopedic Surgery',
      qualifications: ['MBBS', 'MS (Ortho)', 'Fellowship in Joint Replacement'],
      experience: '15+ years',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Cardiology',
      qualifications: ['MBBS', 'MD (Cardiology)', 'Fellowship in Interventional Cardiology'],
      experience: '12+ years',
    },
  ],
  reviews: [
    {
      id: '1',
      patientName: 'John D.',
      rating: 5,
      comment:
        'Excellent care and attention throughout my knee replacement procedure. The staff was very professional and caring.',
      date: '2023-12-15',
    },
    {
      id: '2',
      patientName: 'Maria S.',
      rating: 4,
      comment:
        'Very good experience overall. Clean facilities and knowledgeable doctors. Would recommend to others.',
      date: '2023-11-28',
    },
  ],
}

const FacilityViewer = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', contactForm)
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-muted-foreground">
        Home / Facilities / {mockFacility.name}
      </div>

      {/* Facility Overview */}
      <div className="mb-12">
        <div className="mb-6 h-64 overflow-hidden rounded-lg bg-muted">
          <img
            src={mockFacility.image}
            alt={mockFacility.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="mb-2 text-4xl font-bold">{mockFacility.name}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{mockFacility.location}</p>
        <p className="max-w-3xl text-lg">{mockFacility.description}</p>
      </div>

      {/* Certifications */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
          <CardDescription>Our quality assurance and accreditations</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-2">
            {mockFacility.certifications.map((cert: string) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Doctor Profiles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Doctors</CardTitle>
          <CardDescription>Meet our experienced medical professionals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {mockFacility.doctors.map((doctor: Doctor) => (
              <Card key={doctor.id}>
                <CardHeader>
                  <CardTitle>{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialization}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">Experience: {doctor.experience}</p>
                  <div>
                    <h4 className="mb-1 font-semibold">Qualifications:</h4>
                    <ul className="list-inside list-disc">
                      {doctor.qualifications.map((qual: string) => (
                        <li key={qual}>{qual}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Patient Reviews */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Patient Reviews</CardTitle>
          <CardDescription>What our patients say about us</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {mockFacility.reviews.map((review: Review) => (
              <AccordionItem key={review.id} value={review.id}>
                <AccordionTrigger>
                  <div className="flex items-center">
                    <span className="mr-2">{review.patientName}</span>
                    <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">{review.comment}</p>
                  <p className="text-sm text-muted-foreground">
                    Posted on: {new Date(review.date).toLocaleDateString()}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Send us your inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
              />
            </div>
            <Button type="submit">Send Inquiry</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FacilityViewer 