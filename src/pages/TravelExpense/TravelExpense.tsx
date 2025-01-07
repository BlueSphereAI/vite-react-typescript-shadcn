'use client'

import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  flight: z.string().min(1, "Flight cost is required"),
  accommodation: z.string().min(1, "Accommodation cost is required"),
  localTransport: z.string().min(1, "Local transport cost is required"),
  meals: z.string().min(1, "Meals cost is required"),
  insurance: z.string().min(1, "Insurance cost is required"),
  miscellaneous: z.string().min(1, "Miscellaneous cost is required"),
})

interface ExpenseBreakdown {
  category: string
  amount: number
  description: string
}

export const TravelExpense = () => {
  const location = useLocation()
  const [totalEstimate, setTotalEstimate] = useState<number | null>(null)
  const [breakdown, setBreakdown] = useState<ExpenseBreakdown[]>([])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flight: "",
      accommodation: "",
      localTransport: "",
      meals: "",
      insurance: "",
      miscellaneous: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const expenses: ExpenseBreakdown[] = [
      {
        category: "Flight",
        amount: parseFloat(values.flight),
        description: "Round-trip airfare"
      },
      {
        category: "Accommodation",
        amount: parseFloat(values.accommodation),
        description: "Hotel stay during treatment and recovery"
      },
      {
        category: "Local Transport",
        amount: parseFloat(values.localTransport),
        description: "Local transportation and transfers"
      },
      {
        category: "Meals",
        amount: parseFloat(values.meals),
        description: "Daily meals and food expenses"
      },
      {
        category: "Insurance",
        amount: parseFloat(values.insurance),
        description: "Travel and medical insurance"
      },
      {
        category: "Miscellaneous",
        amount: parseFloat(values.miscellaneous),
        description: "Additional expenses and emergency funds"
      }
    ]

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    setTotalEstimate(total)
    setBreakdown(expenses)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/procedures" className="hover:text-primary">Procedures</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Travel Expense Estimation</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Estimation Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Travel Expense Estimation</CardTitle>
              <CardDescription>
                Calculate your total travel expenses for medical treatment abroad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="flight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flight Cost ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>
                          Estimated round-trip airfare
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accommodation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accommodation ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>
                          Hotel or recovery center costs
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="localTransport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local Transport ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>
                          Local transportation and transfers
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meals ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>
                          Daily food and beverage expenses
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="insurance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>
                          Travel and medical insurance costs
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="miscellaneous"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Miscellaneous ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>
                          Additional expenses and emergency funds
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">Calculate Total</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Results Display */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>
                Detailed breakdown of your estimated travel expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {totalEstimate === null ? (
                <div className="text-center text-muted-foreground py-8">
                  Fill out the form to see your expense breakdown
                </div>
              ) : (
                <div className="space-y-6">
                  {breakdown.map((expense, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="font-medium">{expense.category}</h4>
                          <p className="text-sm text-muted-foreground">{expense.description}</p>
                        </div>
                        <span className="font-semibold">${expense.amount.toLocaleString()}</span>
                      </div>
                      {index < breakdown.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                  
                  <div className="pt-6 mt-6 border-t">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Total Estimated Cost</h3>
                      <span className="text-2xl font-bold text-primary">
                        ${totalEstimate.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button className="w-full" variant="outline" asChild>
                      <Link to="/dashboard">Save to Dashboard</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 