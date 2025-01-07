'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ComparisonCard {
  title: string;
  description: string;
  image: string;
  savings: string;
}

const featuredComparisons: ComparisonCard[] = [
  {
    title: "Hip Replacement",
    description: "Save up to 70% on hip replacement procedures abroad",
    image: "https://mediglobal-connect.greensphere.one/images/procedures/hip-replacement.jpg",
    savings: "Average savings: $25,000"
  },
  {
    title: "Knee Replacement",
    description: "Quality knee surgery with significant cost savings",
    image: "https://mediglobal-connect.greensphere.one/images/procedures/knee-replacement.jpg",
    savings: "Average savings: $20,000"
  },
  {
    title: "Dental Implants",
    description: "Premium dental care at fraction of US costs",
    image: "https://mediglobal-connect.greensphere.one/images/procedures/dental-implants.jpg",
    savings: "Average savings: $3,500"
  }
];

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="https://mediglobal-connect.greensphere.one/images/logo.jpg" 
              alt="MediGlobal Connect Logo" 
              className="h-10 w-10"
            />
            <h1 className="text-2xl font-bold">MediGlobal Connect</h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li><Button variant="ghost">Home</Button></li>
              <li><Button variant="ghost">Search Procedures</Button></li>
              <li><Button variant="ghost">Dashboard</Button></li>
              <li><Button variant="ghost">Contact Us</Button></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Find Affordable Medical Procedures Worldwide</h2>
          <p className="text-lg text-muted-foreground mb-8">Compare prices, credentials, and travel costs for medical procedures globally</p>
          <div className="flex max-w-xl mx-auto gap-4">
            <Input 
              type="text" 
              placeholder="Search procedures (e.g., knee replacement)" 
              className="flex-1"
            />
            <Button size="lg">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Procedure Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredComparisons.map((comparison, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img 
                    src={comparison.image} 
                    alt={comparison.title} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardTitle className="mt-4">{comparison.title}</CardTitle>
                  <CardDescription>{comparison.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-primary font-semibold">{comparison.savings}</p>
                  <Button variant="outline" className="w-full mt-4">
                    View Comparison
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Contact Information</h3>
              <address className="not-italic text-muted-foreground">
                <p>123 Medical Plaza</p>
                <p>San Francisco, CA 94105</p>
                <p>Email: contact@mediglobalconnect.com</p>
                <p>Phone: (555) 123-4567</p>
              </address>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Services</a></li>
                <li><a href="#" className="hover:text-primary">FAQs</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 