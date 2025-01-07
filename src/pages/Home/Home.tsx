'use client'

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ComparisonCard {
  id: string
  title: string
  description: string
  image: string
  savings: string
}

const featuredComparisons: ComparisonCard[] = [
  {
    id: "hip-replacement",
    title: "Hip Replacement",
    description: "Save up to 70% on hip replacement procedures abroad",
    image: "https://mediglobal-connect.greensphere.one/images/procedures/hip-replacement.jpg",
    savings: "Average savings: $25,000"
  },
  {
    id: "knee-replacement",
    title: "Knee Replacement",
    description: "Quality knee surgery with significant cost savings",
    image: "https://mediglobal-connect.greensphere.one/images/procedures/knee-replacement.jpg",
    savings: "Average savings: $20,000"
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    description: "Premium dental care at fraction of US costs",
    image: "https://mediglobal-connect.greensphere.one/images/procedures/dental-implants.jpg",
    savings: "Average savings: $3,500"
  }
];

export const Home = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

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

  return (
    <div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredComparisons.map((comparison) => (
              <Card key={comparison.id} className="hover:shadow-lg transition-shadow">
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
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    asChild
                  >
                    <Link to={`/procedures/${comparison.id}`}>
                      View Comparison
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 