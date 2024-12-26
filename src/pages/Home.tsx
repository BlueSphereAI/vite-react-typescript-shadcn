'use client'

import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const benefits = [
  {
    icon: '💰',
    title: 'Cost Savings',
    description: 'Save up to 80% on medical procedures compared to US prices',
  },
  {
    icon: '🏥',
    title: 'Quality Care',
    description: 'Access to internationally accredited healthcare facilities',
  },
  {
    icon: '✈️',
    title: 'Travel Support',
    description: 'Comprehensive travel planning and logistics assistance',
  },
  {
    icon: '🤝',
    title: 'Personal Assistance',
    description: '24/7 support throughout your medical journey',
  },
]

const featuredFacilities = [
  {
    name: 'Apollo Hospitals',
    location: 'Chennai, India',
    image: 'https://example.com/apollo.jpg',
    description:
      'Leading healthcare provider with state-of-the-art facilities and experienced doctors.',
  },
  {
    name: 'Bumrungrad International',
    location: 'Bangkok, Thailand',
    image: 'https://example.com/bumrungrad.jpg',
    description:
      'World-renowned hospital known for exceptional medical services and patient care.',
  },
  {
    name: 'Anadolu Medical Center',
    location: 'Istanbul, Turkey',
    image: 'https://example.com/anadolu.jpg',
    description:
      'Advanced medical center offering cutting-edge treatments and personalized care.',
  },
]

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 py-32">
        <div className="container text-center">
          <h1 className="mb-6 text-5xl font-bold">
            Affordable Medical Procedures Worldwide
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Compare prices & plan your medical journey
          </p>
          <Link to="/compare">
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">
              Your Gateway to Global Healthcare
            </h2>
            <p className="text-lg text-muted-foreground">
              MediGlobal Connect helps you find high-quality, affordable medical
              care around the world. Compare prices, explore facilities, and plan
              your medical journey with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Why Choose MediGlobal Connect?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <span className="mb-4 text-4xl">{benefit.icon}</span>
                  <h3 className="mb-2 text-xl font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Spotlight */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Featured Medical Facilities
          </h2>
          <Carousel className="mx-auto max-w-5xl">
            <CarouselContent>
              {featuredFacilities.map((facility) => (
                <CarouselItem key={facility.name}>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <div className="mb-4 h-48 w-full overflow-hidden rounded-lg bg-muted">
                        <img
                          src={facility.image}
                          alt={facility.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        {facility.name}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {facility.location}
                      </p>
                      <p className="text-center text-muted-foreground">
                        {facility.description}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  )
}

export default Home 