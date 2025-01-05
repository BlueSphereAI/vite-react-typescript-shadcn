'use client'

import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import { 
  FileUp, 
  BookOpen, 
  MessageSquare, 
  CheckSquare, 
  History 
} from 'lucide-react'

interface SidebarProps {
  onNavigate?: () => void
}

const navigationItems = [
  { 
    name: 'Contract Submission', 
    path: '/dashboard/submit',
    icon: FileUp,
    description: 'Submit new contracts for review'
  },
  { 
    name: 'Immutable Record Log', 
    path: '/dashboard/records',
    icon: BookOpen,
    description: 'View blockchain-verified records'
  },
  { 
    name: 'Negotiation Log', 
    path: '/dashboard/negotiations',
    icon: MessageSquare,
    description: 'Discuss contract terms'
  },
  { 
    name: 'Approval Workflow', 
    path: '/dashboard/approvals',
    icon: CheckSquare,
    description: 'Review and approve contracts'
  },
  { 
    name: 'Audit Trail', 
    path: '/dashboard/audit',
    icon: History,
    description: 'Track all contract activities'
  },
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
        <Link to="/" className="flex items-center group" onClick={handleNavigate}>
          <img
            src="https://clearcontract.greensphere.one/images/logo.jpg"
            alt="ClearContract Logo"
            className="h-8 w-auto transition-transform group-hover:scale-105"
          />
          <span className="ml-2 text-xl font-bold text-gray-900">ClearContract</span>
        </Link>
      </div>

      <Separator className="flex-shrink-0" />

      {/* Navigation Links */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start relative group"
                asChild
              >
                <Link 
                  to={item.path} 
                  onClick={handleNavigate}
                  className="flex items-center"
                >
                  <Icon className={`h-4 w-4 mr-3 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'
                  }`} />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-xs ${
                      isActive ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-200 rounded-r-full" />
                  )}
                </Link>
              </Button>
            )
          })}
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