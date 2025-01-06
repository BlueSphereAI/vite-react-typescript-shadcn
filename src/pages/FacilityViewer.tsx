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
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

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
  availability: {
    days: string[]
    hours: string
  }
  image: string
}

interface Procedure {
  id: string
  name: string
  price: number
  category: string
  description: string
  recoveryTime: string
  successRate: number
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
        availability: {
          days: ['Monday', 'Wednesday', 'Friday'],
          hours: '9:00 AM - 5:00 PM',
        },
        image: 'https://example.com/dr-johnson.jpg',
      },
      {
        id: '2',
        name: 'Dr. Michael Chen',
        specialization: 'Cardiology',
        qualifications: ['MBBS', 'MD (Cardiology)', 'Fellowship in Interventional Cardiology'],
        experience: '12+ years',
        availability: {
          days: ['Tuesday', 'Thursday', 'Saturday'],
          hours: '10:00 AM - 6:00 PM',
        },
        image: 'https://example.com/dr-chen.jpg',
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
    procedures: [
      {
        id: 'hip-replacement',
        name: 'Hip Replacement',
        price: 12000,
        category: 'Orthopedics',
        description: 'Total hip replacement surgery with state-of-the-art implants.',
        recoveryTime: '3-6 months',
        successRate: 95,
      },
      {
        id: 'knee-replacement',
        name: 'Knee Replacement',
        price: 10000,
        category: 'Orthopedics',
        description: 'Total knee replacement surgery with advanced prosthetics.',
        recoveryTime: '3-6 months',
        successRate: 92,
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
        availability: {
          days: ['Monday', 'Wednesday', 'Friday'],
          hours: '9:00 AM - 5:00 PM',
        },
        image: 'https://example.com/dr-wong.jpg',
      },
      {
        id: '2',
        name: 'Dr. Lisa Park',
        specialization: 'Cardiology',
        qualifications: ['MD', 'PhD', 'Fellowship in Interventional Cardiology'],
        experience: '15+ years',
        availability: {
          days: ['Tuesday', 'Thursday', 'Saturday'],
          hours: '10:00 AM - 6:00 PM',
        },
        image: 'https://example.com/dr-park.jpg',
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
    procedures: [
      {
        id: 'face-lift',
        name: 'Face Lift',
        price: 5000,
        category: 'Plastic Surgery',
        description: 'Facelift surgery to improve facial contours and reduce signs of aging.',
        recoveryTime: '4-6 weeks',
        successRate: 90,
      },
      {
        id: 'breast-augmentation',
        name: 'Breast Augmentation',
        price: 8000,
        category: 'Plastic Surgery',
        description: 'Breast augmentation surgery with saline or silicone implants.',
        recoveryTime: '3-4 weeks',
        successRate: 85,
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
        availability: {
          days: ['Monday', 'Wednesday', 'Friday'],
          hours: '9:00 AM - 5:00 PM',
        },
        image: 'https://example.com/dr-yilmaz.jpg',
      },
      {
        id: '2',
        name: 'Dr. Ayse Kaya',
        specialization: 'Ophthalmology',
        qualifications: ['MD', 'Fellowship in LASIK Surgery'],
        experience: '16+ years',
        availability: {
          days: ['Tuesday', 'Thursday', 'Saturday'],
          hours: '10:00 AM - 6:00 PM',
        },
        image: 'https://example.com/dr-kaya.jpg',
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
    procedures: [
      {
        id: 'root-canal-therapy',
        name: 'Root Canal Therapy',
        price: 1000,
        category: 'Dental Surgery',
        description: 'Root canal therapy to save a tooth that is infected or abscessed.',
        recoveryTime: '1-2 weeks',
        successRate: 90,
      },
      {
        id: 'teeth-whitening',
        name: 'Teeth Whitening',
        price: 500,
        category: 'Dental Surgery',
        description: 'Teeth whitening treatment to improve the appearance of your teeth.',
        recoveryTime: '1-2 weeks',
        successRate: 80,
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null)

  const facility = facilities[id as keyof typeof facilities]

  // Add toast hook
  const { toast } = useToast()

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData)
      setIsDialogOpen(false)
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: '',
      })
      setSelectedDoctor(null)
      setSelectedProcedure(null)
      
      // Show success toast
      toast({
        title: 'Consultation Scheduled',
        description: 'We will contact you shortly to confirm your appointment.',
      })
    }
  }

  // Add form state
  interface FormData {
    name: string
    email: string
    phone: string
    date: string
    message: string
  }

  // Add form state and validation
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  })

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})

  const validateForm = () => {
    const errors: Partial<FormData> = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format'
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required'
    }
    
    if (!formData.date) {
      errors.date = 'Date is required'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    // Clear error when user starts typing
    if (formErrors[id as keyof FormData]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: undefined
      }))
    }
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

      {/* Available Procedures */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Available Procedures</CardTitle>
          <CardDescription>Our specialized medical procedures and treatments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {facility.procedures.map((procedure) => (
              <Card key={procedure.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{procedure.name}</CardTitle>
                      <CardDescription>{procedure.category}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${procedure.price.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Starting from</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>{procedure.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium">Recovery Time</div>
                        <div>{procedure.recoveryTime}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Success Rate</div>
                        <div className="flex items-center space-x-2">
                          <span>{procedure.successRate}%</span>
                          <Progress value={procedure.successRate} className="h-2 flex-1" />
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => {
                      setSelectedProcedure(procedure)
                      setIsDialogOpen(true)
                    }}>
                      Schedule Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Doctor Profiles with Availability */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Doctors</CardTitle>
          <CardDescription>Meet our experienced medical professionals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {facility.doctors.map((doctor) => (
              <Card key={doctor.id}>
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="h-20 w-20 overflow-hidden rounded-full">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle>{doctor.name}</CardTitle>
                      <CardDescription>{doctor.specialization}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium">Experience</div>
                      <div>{doctor.experience}</div>
                    </div>
                    <div>
                      <div className="font-medium">Qualifications</div>
                      <ul className="list-inside list-disc">
                        {doctor.qualifications.map((qual) => (
                          <li key={qual}>{qual}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium">Availability</div>
                      <div className="text-sm">
                        {doctor.availability.days.join(', ')}
                        <br />
                        {doctor.availability.hours}
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => {
                      setSelectedDoctor(doctor)
                      setIsDialogOpen(true)
                    }}>
                      Book Appointment
                    </Button>
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

      {/* Consultation Scheduling Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Consultation</DialogTitle>
            <DialogDescription>
              {selectedProcedure ? 
                `Book a consultation for ${selectedProcedure.name}` : 
                selectedDoctor ? 
                  `Book an appointment with ${selectedDoctor.name}` : 
                  'Schedule your consultation'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={formErrors.name ? 'border-red-500' : ''}
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'border-red-500' : ''}
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <div className="col-span-3">
                <Input 
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={formErrors.phone ? 'border-red-500' : ''}
                />
                {formErrors.phone && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Input 
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={formErrors.date ? 'border-red-500' : ''}
                />
                {formErrors.date && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.date}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea 
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Any specific concerns or questions?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Book Consultation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}

export default FacilityViewer 