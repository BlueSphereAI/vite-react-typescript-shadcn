'use client'

import { useApp } from '../../state/context/AppContext'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'

export function Notifications() {
  const { notifications, removeNotification } = useApp()

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md w-full">
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          className={cn(
            'transition-all duration-300 relative',
            notification.type === 'success' && 'bg-green-50 border-green-200 text-green-800',
            notification.type === 'error' && 'bg-red-50 border-red-200 text-red-800',
            notification.type === 'info' && 'bg-blue-50 border-blue-200 text-blue-800'
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6 hover:bg-transparent"
            onClick={() => removeNotification(notification.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <AlertTitle className="capitalize">{notification.type}</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
} 