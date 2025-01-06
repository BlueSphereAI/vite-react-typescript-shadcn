'use client'

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface BarChartProps {
  data: Array<{
    name: string
    'US Cost': number
    'International Cost': number
    Savings: number
  }>
}

export function BarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => `$${value.toLocaleString()}`}
        />
        <Legend />
        <Bar dataKey="US Cost" fill="#ef4444" />
        <Bar dataKey="International Cost" fill="#3b82f6" />
        <Bar dataKey="Savings" fill="#22c55e" />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
} 