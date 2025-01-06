'use client'

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
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
import { ChevronRight } from 'lucide-react'
import { MapView } from '@/components/ui/map-view'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

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

const facilities = {
  apollo: {
    name: 'Apollo Hospitals',
    location: 'Chennai, India',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    images: [
      'https://example.com/apollo-1.jpg',
      'https://example.com/apollo-2.jpg',
      'https://example.com/apollo-3.jpg',
    ],
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
  },
  bumrungrad: {
    name: 'Bumrungrad International',
    location: 'Bangkok, Thailand',
    coordinates: { lat: 13.7437, lng: 100.5548 },
    images: [
      'https://example.com/bumrungrad-1.jpg',
      'https://example.com/bumrungrad-2.jpg',
      'https://example.com/bumrungrad-3.jpg',
    ],
    description:
      'Bumrungrad International Hospital is one of the largest private hospitals in Southeast Asia, with state-of-the-art facilities and world-class healthcare services.',
    certifications: [
      'Joint Commission International (JCI) Accreditation',
      'Hospital Accreditation (HA)',
      'ISO 9001:2015 Certification',
    ],
    doctors: [
      {
        id: '1',
        name: 'Dr. David Wong',
        specialization: 'Plastic Surgery',
        qualifications: ['MBBS', 'MS (Plastic Surgery)', 'Fellowship in Aesthetic Surgery'],
        experience: '18+ years',
      },
      {
        id: '2',
        name: 'Dr. Lisa Park',
        specialization: 'Cardiology',
        qualifications: ['MD', 'PhD', 'Fellowship in Interventional Cardiology'],
        experience: '15+ years',
      },
    ],
    reviews: [
      {
        id: '1',
        patientName: 'Robert M.',
        rating: 5,
        comment:
          'World-class facilities and exceptional care. The international patient services were outstanding.',
        date: '2023-11-20',
      },
      {
        id: '2',
        patientName: 'Sarah K.',
        rating: 5,
        comment:
          'Highly professional staff and modern facilities. The entire experience was smooth and comfortable.',
        date: '2023-10-15',
      },
    ],
  },
  memorial: {
    name: 'Memorial Hospital',
    location: 'Istanbul, Turkey',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    images: [
      'https://example.com/memorial-1.jpg',
      'https://example.com/memorial-2.jpg',
      'https://example.com/memorial-3.jpg',
    ],
    description:
      'Memorial Hospital Group is Turkey\'s leading healthcare provider, offering comprehensive medical services with cutting-edge technology.',
    certifications: [
      'Joint Commission International (JCI) Accreditation',
      'ISO 9001:2015 Certification',
      'Turkish Medical Association Accreditation',
    ],
    doctors: [
      {
        id: '1',
        name: 'Dr. Ahmet Yilmaz',
        specialization: 'Dental Surgery',
        qualifications: ['DDS', 'PhD', 'Fellowship in Implantology'],
        experience: '20+ years',
      },
      {
        id: '2',
        name: 'Dr. Ayse Kaya',
        specialization: 'Ophthalmology',
        qualifications: ['MD', 'Fellowship in LASIK Surgery'],
        experience: '16+ years',
      },
    ],
    reviews: [
      {
        id: '1',
        patientName: 'James B.',
        rating: 5,
        comment:
          'Excellent dental work at a fraction of the cost. The staff was very professional and caring.',
        date: '2023-12-01',
      },
      {
        id: '2',
        patientName: 'Emma L.',
        rating: 4,
        comment:
          'Great experience with LASIK surgery. The facility is modern and the doctors are highly skilled.',
        date: '2023-11-10',
      },
    ],
  },
}

const FacilityViewer = () => {
  const { id } = useParams()
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const facility = facilities[id as keyof typeof facilities]

  if (!facility) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Facility Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            The facility you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/facilities">Back to Facilities</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', contactForm)
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/facilities" className="hover:text-foreground">
          Facilities
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{facility.name}</span>
      </nav>

      {/* Facility Overview */}
      <div className="mb-12">
        <Carousel className="mb-6">
          <CarouselContent>
            {facility.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`${facility.name} - View ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <h1 className="mb-2 text-4xl font-bold">{facility.name}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{facility.location}</p>
        <p className="max-w-3xl text-lg">{facility.description}</p>
      </div>

      {/* Location Map */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <CardDescription>Find us here</CardDescription>
        </CardHeader>
        <CardContent>
          <MapView
            latitude={facility.coordinates.lat}
            longitude={facility.coordinates.lng}
            name={facility.name}
            address={facility.location}
          />
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
          <CardDescription>Our quality assurance and accreditations</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-2">
            {facility.certifications.map((cert: string) => (
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
            {facility.doctors.map((doctor: Doctor) => (
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
            {facility.reviews.map((review: Review) => (
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