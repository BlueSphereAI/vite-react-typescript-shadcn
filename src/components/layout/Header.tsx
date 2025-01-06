'use client'

import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-4">
          <img
            src="https://mediglobal-connect.greensphere.one/images/logo.jpg"
            alt="MediGlobal Connect Logo"
            className="h-10 w-10 rounded-full object-contain"
          />
          <span className="text-xl font-bold">MediGlobal Connect</span>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex items-center space-x-8">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/compare"
                className="text-muted-foreground hover:text-foreground"
              >
                Compare Prices
              </Link>
            </li>
            <li>
              <Link
                to="/facilities"
                className="text-muted-foreground hover:text-foreground"
              >
                Facilities
              </Link>
            </li>
            <li>
              <Link
                to="/travel"
                className="text-muted-foreground hover:text-foreground"
              >
                Travel & Cost
              </Link>
            </li>
            <li>
              <Link
                to="/bookings"
                className="text-muted-foreground hover:text-foreground"
              >
                Bookings
              </Link>
            </li>
            <li>
              <Button asChild>
                <Link to="/compare">Get Started</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header 