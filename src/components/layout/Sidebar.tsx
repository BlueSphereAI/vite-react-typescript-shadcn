'use client'

import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'

interface SidebarProps {
  onNavigate?: () => void
}

const navigationItems = [
  { name: 'Contract Submission', path: '/dashboard/submit' },
  { name: 'Immutable Record Log', path: '/dashboard/records' },
  { name: 'Negotiation Log', path: '/dashboard/negotiations' },
  { name: 'Approval Workflow', path: '/dashboard/approvals' },
  { name: 'Audit Trail', path: '/dashboard/audit' },
]

export function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation()

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 flex-shrink-0">
        <Link to="/" className="flex items-center" onClick={handleNavigate}>
          <img
            src="https://clearcontract.greensphere.one/images/logo.jpg"
            alt="ClearContract Logo"
            className="h-8 w-auto"
          />
          <span className="ml-2 text-xl font-bold text-gray-900">ClearContract</span>
        </Link>
      </div>

      <Separator className="flex-shrink-0" />

      {/* Navigation Links */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to={item.path} onClick={handleNavigate}>{item.name}</Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
        <p className="text-xs text-gray-500 text-center">
          ClearContract Integrity Assurance Platform
        </p>
      </div>
    </div>
  )
} 