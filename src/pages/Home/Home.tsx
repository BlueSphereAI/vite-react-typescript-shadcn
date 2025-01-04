'use client'

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "../../components/ui/button"

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://clearcontract.greensphere.one/images/logo.jpg"
              alt="ClearContract Logo"
              className="h-12 w-auto"
            />
            <h1 className="ml-4 text-2xl font-bold text-gray-900">ClearContract</h1>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
        </div>
      </header>

      {/* Introduction Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Enhancing Government Procurement Transparency
          </h2>
          <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-500">
            Leveraging blockchain technology to ensure transparent and immutable records of contract processes. 
            We provide a secure platform for contract negotiations, amendments, and approvals with a complete audit trail.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button 
              variant="default" 
              size="lg"
              className="px-8"
              onClick={() => navigate('/dashboard')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Immutable Records</h3>
            <p className="mt-2 text-gray-600">Secure, tamper-proof storage of all contract-related activities on the blockchain.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Transparent Process</h3>
            <p className="mt-2 text-gray-600">Complete visibility into contract negotiations, amendments, and approval workflows.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Audit Trail</h3>
            <p className="mt-2 text-gray-600">Comprehensive tracking of all actions and changes throughout the contract lifecycle.</p>
          </div>
        </div>
      </main>
    </div>
  )
} 