'use client'

import { Link, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img 
                src="https://mediglobal-connect.greensphere.one/images/logo.jpg" 
                alt="MediGlobal Connect Logo" 
                className="h-10 w-10"
              />
            </Link>
            <Link to="/">
              <h1 className="text-2xl font-bold">MediGlobal Connect</h1>
            </Link>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Button 
                  variant={location.pathname === '/' ? 'default' : 'ghost'}
                  asChild
                >
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button 
                  variant={location.pathname.includes('/procedures') ? 'default' : 'ghost'}
                  asChild
                >
                  <Link to="/procedures/search">Search Procedures</Link>
                </Button>
              </li>
              <li>
                <Button 
                  variant={location.pathname === '/dashboard' ? 'default' : 'ghost'}
                  asChild
                >
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </li>
              <li>
                <Button 
                  variant={location.pathname === '/contact' ? 'default' : 'ghost'}
                  asChild
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

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
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/services" className="hover:text-primary">Services</Link></li>
                <li><Link to="/faq" className="hover:text-primary">FAQs</Link></li>
                <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
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