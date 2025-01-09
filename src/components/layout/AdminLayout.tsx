'use client'

import { Link, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AdminLayoutProps {
  children: React.ReactNode
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Navigation Bar */}
      <nav className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl font-bold text-primary">
                MediGlobal Connect
              </Link>
              <div className="hidden md:flex items-center gap-1">
                <Button
                  variant={isActive('/admin/procedures') ? 'secondary' : 'ghost'}
                  asChild
                  className="text-sm"
                >
                  <Link to="/admin/procedures">Procedures</Link>
                </Button>
                <Button
                  variant={isActive('/admin/facilities') ? 'secondary' : 'ghost'}
                  asChild
                  className="text-sm"
                >
                  <Link to="/admin/facilities">Facilities</Link>
                </Button>
                <Button
                  variant={isActive('/admin/price-comparisons') ? 'secondary' : 'ghost'}
                  asChild
                  className="text-sm"
                >
                  <Link to="/admin/price-comparisons">Price Comparisons</Link>
                </Button>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link to="/">Exit Admin View</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden container mx-auto px-4 py-4">
        <Card className="p-2 flex items-center gap-2 overflow-x-auto">
          <Button
            variant={isActive('/admin/procedures') ? 'secondary' : 'ghost'}
            asChild
            className="text-sm whitespace-nowrap"
          >
            <Link to="/admin/procedures">Procedures</Link>
          </Button>
          <Button
            variant={isActive('/admin/facilities') ? 'secondary' : 'ghost'}
            asChild
            className="text-sm whitespace-nowrap"
          >
            <Link to="/admin/facilities">Facilities</Link>
          </Button>
          <Button
            variant={isActive('/admin/price-comparisons') ? 'secondary' : 'ghost'}
            asChild
            className="text-sm whitespace-nowrap"
          >
            <Link to="/admin/price-comparisons">Price Comparisons</Link>
          </Button>
        </Card>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
} 