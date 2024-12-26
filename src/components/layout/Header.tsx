'use client'

import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Header = () => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Compare Prices', path: '/compare' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Travel & Expenses', path: '/travel' },
    { label: 'Support', path: '/support' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-4">
          <img
            src="https://mediglobal-connect.greensphere.one/images/logo.jpg"
            alt="MediGlobal Connect"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold">MediGlobal Connect</span>
        </div>

        <nav className="flex flex-1 items-center justify-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link to="/compare">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header 