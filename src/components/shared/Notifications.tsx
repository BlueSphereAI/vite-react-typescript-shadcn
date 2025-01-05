'use client'

import { useApp } from '../../state/context/AppContext'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { XCircle, CheckCircle, Info } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Notifications() {
  const { notifications, removeNotification } = useApp()

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 min-w-[320px] max-w-[420px]">
      {notifications.map(notification => (
        <Alert
          key={notification.id}
          className={cn(
            'transition-all duration-300 animate-in slide-in-from-right-full',
            notification.type === 'success' && 'bg-green-50 border-green-200',
            notification.type === 'error' && 'bg-red-50 border-red-200',
            notification.type === 'info' && 'bg-blue-50 border-blue-200'
          )}
        >
          <div className="flex items-start gap-4">
            {notification.type === 'success' && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
            {notification.type === 'error' && (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            {notification.type === 'info' && (
              <Info className="h-5 w-5 text-blue-600" />
            )}
            <div className="flex-1">
              <AlertTitle
                className={cn(
                  notification.type === 'success' && 'text-green-800',
                  notification.type === 'error' && 'text-red-800',
                  notification.type === 'info' && 'text-blue-800'
                )}
              >
                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
              </AlertTitle>
              <AlertDescription
                className={cn(
                  notification.type === 'success' && 'text-green-700',
                  notification.type === 'error' && 'text-red-700',
                  notification.type === 'info' && 'text-blue-700'
                )}
              >
                {notification.message}
              </AlertDescription>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </Alert>
      ))}
    </div>
  )
} 