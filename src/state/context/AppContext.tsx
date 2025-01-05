'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type User = {
  id: string
  name: string
  role: string
  department: string
}

type AppContextType = {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  notifications: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info'
  }>
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void
  removeNotification: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [notifications, setNotifications] = useState<AppContextType['notifications']>([])

  const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substring(7)
    setNotifications(prev => [...prev, { id, message, type }])
    // Auto-remove notification after 5 seconds
    setTimeout(() => removeNotification(id), 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
} 