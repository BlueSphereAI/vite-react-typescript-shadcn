'use client'

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/layout/Sidebar'
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet'
import { Button } from '../../components/ui/button'
import { Menu } from 'lucide-react'

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 p-4 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://clearcontract.greensphere.one/images/logo.jpg"
              alt="ClearContract Logo"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">ClearContract</span>
          </div>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="p-0 w-64"
              onInteractOutside={() => setIsSidebarOpen(false)}
              onEscapeKeyDown={() => setIsSidebarOpen(false)}
            >
              <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
} 