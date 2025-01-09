'use client'

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage procedures, facilities, and price comparisons
          </p>
        </div>

        {/* Navigation */}
        <Card className="p-4">
          <nav className="flex gap-4">
            <Button
              variant={isActive('/admin/procedures') ? 'default' : 'outline'}
              asChild
            >
              <Link to="/admin/procedures">Procedures</Link>
            </Button>
            <Button
              variant={isActive('/admin/facilities') ? 'default' : 'outline'}
              asChild
            >
              <Link to="/admin/facilities">Facilities</Link>
            </Button>
            <Button
              variant={isActive('/admin/price-comparisons') ? 'default' : 'outline'}
              asChild
            >
              <Link to="/admin/price-comparisons">Price Comparisons</Link>
            </Button>
          </nav>
        </Card>

        {/* Content */}
        <div>
          {children}
        </div>
      </div>
    </div>
  )
} 