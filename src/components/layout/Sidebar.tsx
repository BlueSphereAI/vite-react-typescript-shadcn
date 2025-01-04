'use client'

import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const navigationItems = [
  { name: 'Contract Submission', path: '/dashboard/submit' },
  { name: 'Immutable Record Log', path: '/dashboard/records' },
  { name: 'Negotiation Log', path: '/dashboard/negotiations' },
  { name: 'Approval Workflow', path: '/dashboard/approvals' },
  { name: 'Audit Trail', path: '/dashboard/audit' },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-6">
        <Link to="/" className="flex items-center">
          <img
            src="https://clearcontract.greensphere.one/images/logo.jpg"
            alt="ClearContract Logo"
            className="h-8 w-auto"
          />
          <span className="ml-2 text-xl font-bold text-gray-900">ClearContract</span>
        </Link>
      </div>

      <Separator />

      {/* Navigation Links */}
      <nav className="px-4 py-6">
        {navigationItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? "default" : "ghost"}
            className="w-full justify-start mb-2"
            asChild
          >
            <Link to={item.path}>{item.name}</Link>
          </Button>
        ))}
      </nav>
    </div>
  )
} 