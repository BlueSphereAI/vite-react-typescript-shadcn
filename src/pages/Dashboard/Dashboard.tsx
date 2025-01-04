'use client'

import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/layout/Sidebar'
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet'
import { Button } from '../../components/ui/button'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 p-4 bg-white border-b border-gray-200 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

// Menu Icon Component
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
} 