'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import type { TravelExpense as TravelExpenseType } from '@/types'

const TravelExpense = () => {
  const [expenses, setExpenses] = useState<TravelExpenseType>({
    flights: 1000,
    accommodation: 800,
    localTransportation: 200,
    meals: 400,
    additionalCosts: 100,
  })

  const calculateTotal = () => {
    return Object.values(expenses).reduce((acc, curr) => acc + curr, 0)
  }

  const handleExpenseChange = (
    key: keyof TravelExpenseType,
    value: number | number[]
  ) => {
    setExpenses((prev) => ({
      ...prev,
      [key]: Array.isArray(value) ? value[0] : value,
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const expenseItems = [
    {
      key: 'flights' as keyof TravelExpenseType,
      label: 'Flights',
      min: 0,
      max: 3000,
      step: 100,
      icon: '✈️',
    },
    {
      key: 'accommodation' as keyof TravelExpenseType,
      label: 'Accommodation',
      min: 0,
      max: 2000,
      step: 50,
      icon: '🏨',
    },
    {
      key: 'localTransportation' as keyof TravelExpenseType,
      label: 'Local Transportation',
      min: 0,
      max: 1000,
      step: 50,
      icon: '🚗',
    },
    {
      key: 'meals' as keyof TravelExpenseType,
      label: 'Meals',
      min: 0,
      max: 1000,
      step: 50,
      icon: '🍽️',
    },
    {
      key: 'additionalCosts' as keyof TravelExpenseType,
      label: 'Additional Costs',
      min: 0,
      max: 1000,
      step: 50,
      icon: '💰',
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Travel & Expense Estimation</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Cost Calculator */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">Cost Calculator</h2>
              <div className="space-y-8">
                {expenseItems.map((item) => (
                  <div key={item.key}>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </label>
                      <span className="font-semibold">
                        {formatCurrency(expenses[item.key])}
                      </span>
                    </div>
                    <Slider
                      value={[expenses[item.key]]}
                      min={item.min}
                      max={item.max}
                      step={item.step}
                      onValueChange={(value) =>
                        handleExpenseChange(item.key, value)
                      }
                    />
                  </div>
                ))}

                <div className="mt-6 border-t pt-6">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total Estimated Cost</span>
                    <span>{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expense Breakdown */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">Expense Breakdown</h2>
              <div className="space-y-4">
                {expenseItems.map((item) => {
                  const percentage =
                    (expenses[item.key] / calculateTotal()) * 100
                  return (
                    <div key={item.key}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <span>{item.icon}</span>
                          <span>{item.label}</span>
                        </span>
                        <span>{formatCurrency(expenses[item.key])}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="mt-1 text-right text-sm text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8">
                <Button className="w-full">Download Expense Report</Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold">
                Cost Saving Tips
              </h3>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Book flights in advance for better rates</li>
                <li>Consider extended stay accommodations for longer trips</li>
                <li>Use public transportation when possible</li>
                <li>Look for package deals that include multiple services</li>
                <li>Research local food options and markets</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TravelExpense 