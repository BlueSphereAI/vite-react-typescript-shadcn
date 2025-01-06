'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ExpenseItem {
  category: string
  description: string
  amount: number
}

const TravelEstimation = () => {
  const [selectedDestination, setSelectedDestination] = useState('')
  const [duration, setDuration] = useState('7')
  const [travelClass, setTravelClass] = useState('economy')
  const [companions, setCompanions] = useState('0')

  const baseExpenses: ExpenseItem[] = [
    {
      category: 'Flight',
      description: 'Round-trip international flight',
      amount: 1200,
    },
    {
      category: 'Accommodation',
      description: '3-star hotel (per night)',
      amount: 100,
    },
    {
      category: 'Local Transport',
      description: 'Daily transportation',
      amount: 20,
    },
    {
      category: 'Meals',
      description: 'Daily food expenses',
      amount: 30,
    },
    {
      category: 'Insurance',
      description: 'Travel medical insurance',
      amount: 150,
    },
  ]

  const calculateTotalExpense = () => {
    const days = parseInt(duration)
    const people = parseInt(companions) + 1
    const flightMultiplier = travelClass === 'business' ? 2.5 : 1

    return baseExpenses.reduce((total, expense) => {
      let amount = expense.amount
      switch (expense.category) {
        case 'Flight':
          amount *= flightMultiplier * people
          break
        case 'Accommodation':
          amount *= days * Math.ceil(people / 2) // Assuming 2 people per room
          break
        case 'Local Transport':
        case 'Meals':
          amount *= days * people
          break
        case 'Insurance':
          amount *= people
          break
      }
      return total + amount
    }, 0)
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Travel & Expense Estimation</h1>

      {/* Overview Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Cost Estimation Overview</CardTitle>
          <CardDescription>
            Plan your medical travel budget with our interactive calculator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Our cost estimator takes into account various factors including flight costs,
            accommodation, local transportation, and daily expenses. Adjust the parameters
            below to get a personalized estimate.
          </p>
        </CardContent>
      </Card>

      {/* Parameters Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Travel Parameters</CardTitle>
          <CardDescription>Customize your travel preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="thailand">Thailand</SelectItem>
                  <SelectItem value="turkey">Turkey</SelectItem>
                  <SelectItem value="malaysia">Malaysia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (days)</label>
              <Input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Travel Class</label>
              <Select value={travelClass} onValueChange={setTravelClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Accompanying Persons</label>
              <Input
                type="number"
                min="0"
                value={companions}
                onChange={(e) => setCompanions(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>Detailed cost analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {baseExpenses.map((expense) => {
                let amount = expense.amount
                const days = parseInt(duration)
                const people = parseInt(companions) + 1
                const flightMultiplier = travelClass === 'business' ? 2.5 : 1

                switch (expense.category) {
                  case 'Flight':
                    amount *= flightMultiplier * people
                    break
                  case 'Accommodation':
                    amount *= days * Math.ceil(people / 2)
                    break
                  case 'Local Transport':
                  case 'Meals':
                    amount *= days * people
                    break
                  case 'Insurance':
                    amount *= people
                    break
                }

                return (
                  <TableRow key={expense.category}>
                    <TableCell className="font-medium">{expense.category}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell className="text-right">
                      ${amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCell colSpan={2} className="font-bold">
                  Total Estimated Cost
                </TableCell>
                <TableCell className="text-right font-bold">
                  ${calculateTotalExpense().toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Download Section */}
      <Card>
        <CardHeader>
          <CardTitle>Save Your Estimate</CardTitle>
          <CardDescription>Download or share your cost estimation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button>Download PDF Report</Button>
            <Button variant="outline">Share Estimate</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TravelEstimation 